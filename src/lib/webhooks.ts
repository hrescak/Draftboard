/**
 * Webhook integrations for Discord and Slack
 * Sends notifications when new posts are created
 */

interface PostData {
  id: string;
  title: string | null;
  author: {
    displayName: string;
    avatarUrl: string | null;
  };
  attachments: {
    type: string;
    url: string;
    thumbnailUrl: string | null;
  }[];
  projects: {
    project: {
      name: string;
    };
  }[];
}

/**
 * Extract plain text from Lexical JSON content
 */
function extractTextFromContent(content: unknown): string {
  if (!content || typeof content !== "object") return "";
  
  const root = content as { root?: { children?: unknown[] } };
  if (!root.root?.children) return "";

  const extractText = (nodes: unknown[]): string => {
    return nodes
      .map((node) => {
        const n = node as { type?: string; text?: string; children?: unknown[] };
        if (n.type === "text" && n.text) {
          return n.text;
        }
        if (n.children && Array.isArray(n.children)) {
          return extractText(n.children);
        }
        return "";
      })
      .join(" ");
  };

  return extractText(root.root.children).trim();
}

/**
 * Send a notification to Discord via webhook
 */
export async function sendDiscordWebhook(
  webhookUrl: string,
  post: PostData,
  baseUrl: string
): Promise<boolean> {
  try {
    const postUrl = `${baseUrl}/post/${post.id}`;
    const description = extractTextFromContent(post);
    const projectNames = post.projects.map((p) => p.project.name).join(", ");
    
    // Find the first image attachment for the embed
    const imageAttachment = post.attachments.find((a) => a.type === "IMAGE");
    const thumbnailUrl = imageAttachment?.thumbnailUrl || imageAttachment?.url;

    const embed: Record<string, unknown> = {
      title: post.title || "New Design Post",
      description: description.slice(0, 300) + (description.length > 300 ? "..." : ""),
      url: postUrl,
      color: 0x7c3aed, // Purple color
      author: {
        name: post.author.displayName,
        icon_url: post.author.avatarUrl || undefined,
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: "Draftboard",
      },
    };

    if (projectNames) {
      embed.fields = [
        {
          name: "Projects",
          value: projectNames,
          inline: true,
        },
      ];
    }

    if (thumbnailUrl) {
      embed.image = { url: thumbnailUrl };
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      console.error(`Discord webhook failed: ${response.status} ${response.statusText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Discord webhook error:", error);
    return false;
  }
}

/**
 * Send a notification to Slack via webhook
 */
export async function sendSlackWebhook(
  webhookUrl: string,
  post: PostData,
  baseUrl: string
): Promise<boolean> {
  try {
    const postUrl = `${baseUrl}/post/${post.id}`;
    const description = extractTextFromContent(post);
    const projectNames = post.projects.map((p) => p.project.name).join(", ");
    
    // Find the first image attachment for the preview
    const imageAttachment = post.attachments.find((a) => a.type === "IMAGE");
    const imageUrl = imageAttachment?.thumbnailUrl || imageAttachment?.url;

    const blocks: Record<string, unknown>[] = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*<${postUrl}|${post.title || "New Design Post"}>*`,
        },
      },
      {
        type: "context",
        elements: [
          ...(post.author.avatarUrl
            ? [
                {
                  type: "image",
                  image_url: post.author.avatarUrl,
                  alt_text: post.author.displayName,
                },
              ]
            : []),
          {
            type: "mrkdwn",
            text: `Posted by *${post.author.displayName}*${projectNames ? ` in ${projectNames}` : ""}`,
          },
        ],
      },
    ];

    if (description) {
      blocks.push({
        type: "section",
        text: {
          type: "plain_text",
          text: description.slice(0, 300) + (description.length > 300 ? "..." : ""),
          emoji: true,
        },
      });
    }

    if (imageUrl) {
      blocks.push({
        type: "image",
        image_url: imageUrl,
        alt_text: post.title || "Design preview",
      });
    }

    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "View Post",
            emoji: true,
          },
          url: postUrl,
          style: "primary",
        },
      ],
    });

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blocks }),
    });

    if (!response.ok) {
      console.error(`Slack webhook failed: ${response.status} ${response.statusText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Slack webhook error:", error);
    return false;
  }
}

/**
 * Send notifications to all configured webhooks
 */
export async function sendPostNotifications(
  post: PostData,
  settings: { discordWebhookUrl: string | null; slackWebhookUrl: string | null },
  baseUrl: string
): Promise<void> {
  const promises: Promise<boolean>[] = [];

  if (settings.discordWebhookUrl) {
    promises.push(sendDiscordWebhook(settings.discordWebhookUrl, post, baseUrl));
  }

  if (settings.slackWebhookUrl) {
    promises.push(sendSlackWebhook(settings.slackWebhookUrl, post, baseUrl));
  }

  if (promises.length > 0) {
    // Fire and forget - don't block the response
    Promise.allSettled(promises).then((results) => {
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Webhook ${index} failed:`, result.reason);
        }
      });
    });
  }
}
