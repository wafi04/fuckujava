export function FormatCurrency(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
export function formatDate(
  date: string,
  format: "full" | "date-only" | "time-only" = "full"
): string {
  if (!date) {
    return "Invalid Date";
  }

  const dateObject = new Date(date);
  if (isNaN(dateObject.getTime())) {
    return "Invalid Date";
  }

  switch (format) {
    case "date-only": {
      return new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(dateObject);
    }

    case "time-only": {
      return new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(dateObject);
    }

    case "full":
    default: {
      const datePart = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(dateObject);

      const timePart = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
        .format(dateObject)
        .replace(/\./g, ":")
        .replace(" ", "");

      return `${datePart},${timePart}`;
    }
  }
}
