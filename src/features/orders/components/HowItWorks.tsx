export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Pilih Game",
      description: "Pilih game favoritmu dari katalog kami",
      icon: "🎮",
    },
    {
      number: "2",
      title: "Masukkan Detail",
      description: "Isi ID game kamu dan pilih paket top up",
      icon: "📝",
    },
    {
      number: "3",
      title: "Lakukan Pembayaran",
      description: "Pilih metode pembayaran yang kamu inginkan",
      icon: "💳",
    },
    {
      number: "4",
      title: "Diamonds Masuk",
      description: "Diamonds langsung masuk ke akunmu secara instan!",
      icon: "💎",
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cara Kerja</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proses top up cepat dan mudah hanya dalam 4 langkah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              {/* Step Number Circle */}
              <div className="relative mx-auto w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
                {step.icon}
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
