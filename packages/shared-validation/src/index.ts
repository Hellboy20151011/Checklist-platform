/**
 * Validates an email address format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validates that a password meets minimum requirements:
 * - At least 8 characters
 *
 * Note: This is intentionally minimal for the MVP phase.
 * Future phases may enforce uppercase, lowercase, numbers, and special characters.
 */
export function isValidPassword(password: string): boolean {
  return typeof password === 'string' && password.length >= 8;
}

/**
 * Validates that a string is a non-empty UUID v4.
 */
export function isValidUuid(value: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Validates that a template title is non-empty and within max length.
 */
export function isValidTemplateTitle(title: string, maxLength = 255): boolean {
  if (typeof title !== 'string') {
    return false;
  }

  const trimmedTitle = title.trim();

  return trimmedTitle.length > 0 && trimmedTitle.length <= maxLength;
}

/**
 * Validates that sort order is a non-negative integer.
 */
export function isValidSortOrder(sortOrder: number): boolean {
  return Number.isInteger(sortOrder) && sortOrder >= 0;
}
