// Helper: Convert UTC ISO string to local datetime-local format
export const utcToLocalDatetime = (utcDate: string) => {
  if (!utcDate) return "";
  const date = new Date(utcDate);
  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().slice(0, 16);
};

// Helper: Convert local datetime-local to UTC ISO string
export const localToUtcDatetime = (localDate: string) => {
  if (!localDate) return "";
  const date = new Date(localDate);
  return date.toISOString();
};
