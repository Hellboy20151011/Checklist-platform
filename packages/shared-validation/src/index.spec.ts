import {
  isValidEmail,
  isValidPassword,
  isValidSortOrder,
  isValidTemplateTitle,
  isValidUuid,
} from './index';

describe('isValidEmail', () => {
  it('should return true for a valid email address', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@sub.domain.org')).toBe(true);
    expect(isValidEmail('admin@checklist-platform.de')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('notanemail')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
    expect(isValidEmail('spaces in@email.com')).toBe(false);
  });
});

describe('isValidPassword', () => {
  it('should return true for passwords with at least 8 characters', () => {
    expect(isValidPassword('12345678')).toBe(true);
    expect(isValidPassword('a very long password')).toBe(true);
  });

  it('should return false for passwords shorter than 8 characters', () => {
    expect(isValidPassword('1234567')).toBe(false);
    expect(isValidPassword('')).toBe(false);
  });

  it('should return false for non-string values', () => {
    expect(isValidPassword(null as unknown as string)).toBe(false);
    expect(isValidPassword(undefined as unknown as string)).toBe(false);
  });
});

describe('isValidUuid', () => {
  it('should return true for valid UUID v4 values', () => {
    expect(isValidUuid('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    expect(isValidUuid('123e4567-e89b-42d3-a456-426614174000')).toBe(true);
  });

  it('should return false for UUIDs with a version other than 4', () => {
    // version 1: third segment starts with 1
    expect(isValidUuid('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(false);
    // version 5: third segment starts with 5
    expect(isValidUuid('886313e1-3b8a-5372-9b90-0c9aee199e5d')).toBe(false);
  });

  it('should return false for invalid UUIDs', () => {
    expect(isValidUuid('')).toBe(false);
    expect(isValidUuid('not-a-uuid')).toBe(false);
    expect(isValidUuid('550e8400-e29b-41d4-a716')).toBe(false);
    expect(isValidUuid('zzzzzzzz-zzzz-4zzz-azzz-zzzzzzzzzzzz')).toBe(false);
  });
});

describe('isValidTemplateTitle', () => {
  it('should return true for non-empty titles within the max length', () => {
    expect(isValidTemplateTitle('Monthly Safety Check')).toBe(true);
    expect(isValidTemplateTitle('A')).toBe(true);
  });

  it('should return false for empty or whitespace-only titles', () => {
    expect(isValidTemplateTitle('')).toBe(false);
    expect(isValidTemplateTitle('   ')).toBe(false);
  });

  it('should return false when the title exceeds the max length', () => {
    const longTitle = 'a'.repeat(256);
    expect(isValidTemplateTitle(longTitle)).toBe(false);
    expect(isValidTemplateTitle(longTitle, 300)).toBe(true);
  });

  it('should return false for non-string values', () => {
    expect(isValidTemplateTitle(42 as unknown as string)).toBe(false);
  });
});

describe('isValidSortOrder', () => {
  it('should return true for non-negative integers', () => {
    expect(isValidSortOrder(0)).toBe(true);
    expect(isValidSortOrder(1)).toBe(true);
    expect(isValidSortOrder(100)).toBe(true);
  });

  it('should return false for negative numbers', () => {
    expect(isValidSortOrder(-1)).toBe(false);
  });

  it('should return false for non-integer numbers', () => {
    expect(isValidSortOrder(1.5)).toBe(false);
    expect(isValidSortOrder(NaN)).toBe(false);
  });
});
