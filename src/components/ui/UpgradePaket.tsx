import { Lock, Star, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./card";
import { Button } from "./button";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface UpgradeFlashSaleCardProps {
  title?: string;
  description?: string;
  upgradeUrl?: string;
  onViewPackages?: () => void;
  features?: Feature[];
}

export function UpgradePacketCard({
  title = "Fitur Flash Sale Terkunci",
  description = "Upgrade paket Anda untuk mengakses fitur Flash Sale dan tingkatkan penjualan Anda",
  upgradeUrl = "https://udatopup.com/reseller",
  onViewPackages,
  features = [
    {
      icon: Zap,
      title: "Promo Kilat",
      description:
        "Buat promo dengan durasi terbatas untuk menciptakan urgensi pembelian",
      color: "text-accent",
    },
    {
      icon: TrendingUp,
      title: "Tingkatkan Konversi",
      description: "Flash sale terbukti meningkatkan konversi hingga 3x lipat",
      color: "text-primary",
    },
    {
      icon: Star,
      title: "Kontrol Penuh",
      description:
        "Atur waktu mulai, durasi, diskon, dan stok untuk setiap flash sale",
      color: "text-secondary-foreground",
    },
  ],
}: UpgradeFlashSaleCardProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-2xl w-full border-2 border-dashed border-muted-foreground/25">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent flex items-center justify-center">
            <Lock className="w-8 h-8 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl mb-2">{title}</CardTitle>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <IconComponent
                    className={`w-5 h-5 ${feature.color} mt-0.5 shrink-0`}
                  />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 pt-2">
            <Button asChild className="flex-1">
              <a href={upgradeUrl}>Upgrade Sekarang</a>
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onViewPackages}
            >
              Lihat Paket
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
