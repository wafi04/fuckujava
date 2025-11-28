
interface HeaderOrderProps {
  name: string;
  subName: string;
  brand: string;
  thumbnail: string;
}

export function HeaderOrder({
  name,
  subName,
  brand,
  thumbnail,
}: HeaderOrderProps) {
  return (
    <div className="flex items-center gap-4 ">
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
        <img
          width={64}
          height={64}
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <h1 className="font-bold text-primary truncate text-lg md:text-xl">
          {name}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-600 truncate">{subName}</span>
        </div>
      </div>
    </div>
  );
}

export function OrderInformation({ inf }: { inf: string }) {
  if (!inf) return null;

  // Parse HTML-like content and convert to structured data
  const parseInformation = (text: string) => {
    return text.split("<br>").filter((item) => item.trim() !== "");
  };

  const steps = parseInformation(inf);

  return (
    <div className="bg-card border rounded-lg p-4 mb-4">
      <h3 className="font-semibold  mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-primary rounded-full"></span>
        Cara Pembelian
      </h3>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-3 items-start">
            <div className="shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">
              {index + 1}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.trim()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-muted/30 rounded-md">
        <p className="text-xs text-muted-foreground">
          💡 <strong>Tips:</strong> Pastikan User ID & Server ID sudah benar
          sebelum melakukan pembelian
        </p>
      </div>
    </div>
  );
}
