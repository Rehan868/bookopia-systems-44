
/**
 * Helper function to convert string values from form fields to proper boolean
 * Useful for handling form values that might come as strings like "true" or "false"
 */
export function toBooleanValue(value: string | boolean): boolean {
  if (typeof value === 'boolean') return value;
  return value === 'true';
}
