const PROFILE_SLUG_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

function sanitizeSlug(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .slice(0, 63)
    .replace(/-+$/, "");
}

export function normalizeProfileSlug(input: string): string {
  const slug = sanitizeSlug(input.trim());

  if (!PROFILE_SLUG_REGEX.test(slug)) {
    throw new Error(
      "Invalid profile slug. Use lowercase letters, numbers, and hyphens (max 63 chars).",
    );
  }

  return slug;
}

export function profileDisplayNameToSlug(displayName: string): string {
  const fromName = sanitizeSlug(displayName);
  if (fromName && PROFILE_SLUG_REGEX.test(fromName)) {
    return fromName;
  }

  return "user";
}

export async function ensureUniqueProfileSlug(params: {
  db: typeof import("~/server/db").db;
  preferredSlug: string;
  excludeUserId?: string;
}): Promise<string> {
  const baseSlug = normalizeProfileSlug(params.preferredSlug);

  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await params.db.user.findFirst({
      where: {
        profileSlug: candidate,
        id: params.excludeUserId ? { not: params.excludeUserId } : undefined,
      },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }

    const suffixText = `-${suffix}`;
    const nextBase = baseSlug.slice(0, Math.max(1, 63 - suffixText.length));
    candidate = `${nextBase}${suffixText}`;
    suffix += 1;
  }
}
