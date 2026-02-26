/**
 * Webhook integrations for Discord and Slack
 * Sends notifications when new posts are created
 */

import { getWebhookImageUrl, extractStorageKey } from "./storage";

async function getSignedImageUrl(url: string | null): Promise<string | null> {
  if (!url) return null;
  
  const key = extractStorageKey(url);
  if (!key) return url;
  
  try {
    return await getWebhookImageUrl(key);
  } catch (error) {
    console.error("Failed to sign image URL for webhook:", error);
    return null;
  }
}

interface PostData {
  id: string;
  title: string | null;
  content: unknown;
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
    const description = extractTextFromContent(post.content);
    const projectNames = post.projects.map((p) => p.project.name).join(", ");
    
    // Find the first image attachment for the embed
    const imageAttachment = post.attachments.find((a) => a.type === "IMAGE");
    const rawImageUrl = imageAttachment?.thumbnailUrl || imageAttachment?.url || null;
    
    // Get signed URLs for the image and avatar (valid for 7 days)
    const [signedImageUrl, signedAvatarUrl] = await Promise.all([
      getSignedImageUrl(rawImageUrl),
      getSignedImageUrl(post.author.avatarUrl),
    ]);

    // Draftboard bot identity
    const botAvatarUrl = `${baseUrl}/avatar.png`;

    const embed: Record<string, unknown> = {
      title: post.title || "New Design Post",
      description: description.slice(0, 300) + (description.length > 300 ? "..." : ""),
      url: postUrl,
      color: 0x7c3aed, // Purple color
      author: {
        name: post.author.displayName,
        icon_url: signedAvatarUrl || undefined,
      },
      timestamp: new Date().toISOString(),
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

    if (signedImageUrl) {
      embed.image = { url: signedImageUrl };
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Draftboard",
        avatar_url: botAvatarUrl,
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
    const description = extractTextFromContent(post.content);
    const projectNames = post.projects.map((p) => p.project.name).join(", ");
    
    // Draftboard bot identity
    const botAvatarUrl = `${baseUrl}/avatar.png`;
    
    // Find the first image attachment for the preview
    const imageAttachment = post.attachments.find((a) => a.type === "IMAGE");
    const rawImageUrl = imageAttachment?.thumbnailUrl || imageAttachment?.url || null;
    
    // Get signed URLs for the image and avatar (valid for 7 days)
    const [imageUrl, signedAvatarUrl] = await Promise.all([
      getSignedImageUrl(rawImageUrl),
      getSignedImageUrl(post.author.avatarUrl),
    ]);

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
          ...(signedAvatarUrl
            ? [
                {
                  type: "image",
                  image_url: signedAvatarUrl,
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
      body: JSON.stringify({
        username: "Draftboard",
        icon_url: botAvatarUrl,
        blocks,
      }),
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
