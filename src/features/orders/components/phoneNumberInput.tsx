"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info } from "lucide-react";
import { useState } from "react";
import { HeaderFieldOrder } from "./HeaderFieldOrder";

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}
const countries: Country[] = [
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
];

interface PhoneNumberInputProps {
  setPhoneNumber: (value: string) => void;
  setEmail: (value: string) => void;
  phoneNumber: string;
  email: string;
}

export function PhoneNumberInput({
  email,
  phoneNumber,
  setEmail,
  setPhoneNumber,
}: PhoneNumberInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <section
      id="phonenumber-section"
      className="relative scroll-mt-20 rounded-xl shadow-2xl md:scroll-mt-30"
    >
      <HeaderFieldOrder id={4} subName="Masukkan Detail Kontak" />

      <div className="p-4">
        <div className="flex flex-col gap-3">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="block text-xs font-medium text-foreground">
              Email
            </label>
            <div className="flex w-full flex-col items-start">
              <input
                className="relative block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                type="email"
                placeholder="example@gmail.com"
                name="contact.email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col gap-2">
            <label className="block text-xs font-medium text-foreground">
              No. WhatsApp
            </label>

            <div className="flex w-full gap-2">
              {/* Country Selector */}
              <div className="relative">
                <button
                  className="flex h-9 items-center justify-center gap-1 rounded-l-lg border border-r-0 border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:z-10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="text-lg">{selectedCountry.flag}</span>
                  <span className="text-xs">{selectedCountry.dialCode}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-md border border-border bg-popover shadow-lg">
                    <div className="max-h-64 overflow-y-auto p-1">
                      {countries.map((country) => (
                        <Button
                          key={country.code}
                          onClick={() => handleCountrySelect(country)}
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="flex-1 text-left">
                            {country.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {country.dialCode}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <input
                type="tel"
                className="relative block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75"
                placeholder="8XXXXXXXXXX"
                value={phoneNumber}
                pattern="[0-9]*"
                inputMode="numeric"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <span className="text-[10px] italic text-muted-foreground">
              **Nomor ini akan dihubungi jika terjadi masalah
            </span>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-2 rounded-md bg-card px-4 py-2.5 text-xs text-card-foreground border border-border">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              Bukti transaksi akan dikirim ke email di atas (opsional)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
