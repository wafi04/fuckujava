import { Button } from "@/components/ui/button";
import { UpgradePacketCard } from "@/components/ui/UpgradePaket";
import { useGetFeaturesPaket } from "@/features/events/api/api";
import type { PacketFeatures } from "@/features/events/types";
import { Eye, EyeOff, Plus, Trash2, Pencil, LayoutDashboard, Megaphone, Sparkles, Image as ImgIcon } from "lucide-react";
import { useState } from "react";
import { UseDeleteBanner, UseGetGalleryByBranchId } from "../api";
import { BannerDialog } from "./DialogGallery";

export default function Banner() {
  const { data: feature } = useGetFeaturesPaket();
  const { data, isLoading } = UseGetGalleryByBranchId({
    filters: {},
  });
  const [selectedBanner, setSelectedBanner] = useState<number | null>(null);
  const { mutate: deleteMutate } = UseDeleteBanner();

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);

  // Cari fitur custom_banner
  const customBannerFeature = feature?.data.find(
    (feature: PacketFeatures) => feature.code === "custom_banner"
  );

  // Jika fitur custom_banner tidak enabled, tampilkan upgrade card
if (customBannerFeature && !customBannerFeature.is_enabled) {
  return (
    <main className="container min-h-screen flex justify-center py-4 w-full">
      <UpgradePacketCard 
        title="Fitur Banner Terkunci" 
        features={[
          {
            title: "Custom Banner",
            description: "Tampilkan banner promosi menarik di halaman utama untuk meningkatkan konversi penjualan",
            color: "text-blue-500",
            icon: ImgIcon,
          },
          {
            title: "Banner Slider",
            description: "Buat multiple banner dengan auto-slide untuk menampilkan berbagai promo sekaligus",
            color: "text-purple-500",
            icon: LayoutDashboard,
          },
          {
            title: "Campaign Manager",
            description: "Kelola campaign marketing dengan banner yang dapat dijadwalkan sesuai periode promo",
            color: "text-orange-500",
            icon: Megaphone,
          },
         
          {
            title: "Engagement Boost",
            description: "Tingkatkan engagement pengunjung hingga 3x lipat dengan visual banner yang eye-catching",
            color: "text-pink-500",
            icon: Eye,
          },
          {
            title: "Premium Design",
            description: "Akses template banner premium dan tools design untuk membuat banner profesional",
            color: "text-yellow-500",
            icon: Sparkles,
          },
        ]} 
        description="Upgrade paket Anda untuk mengakses fitur Banner Premium dan tingkatkan penjualan hingga 300%! Banner yang menarik adalah kunci untuk meningkatkan konversi dan engagement pelanggan."
      />
    </main>
  );
}
  if (isLoading) {
    return (
      <main className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            <div className="h-4 w-64 bg-muted rounded animate-pulse mt-2" />
          </div>
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      </main>
    );
  }

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus banner ini?")) {
      deleteMutate(id);
    }
  };

  const handleCreate = () => {
    setEditingBanner(null);
    setDialogOpen(true);
  };

  const handleEdit = (banner: any) => {
    setEditingBanner(banner);
    setDialogOpen(true);
  };

  // Sorting: Aktif dulu, baru nonaktif
  const sortedBanners = data?.data
    ? [...data.data].sort((a, b) => {
        // Aktif (true) di atas nonaktif (false)
        if (a.isActive === b.isActive) {
          // Jika sama, urutkan by ID descending (terbaru dulu)
          return b.id - a.id;
        }
        return a.isActive ? -1 : 1;
      })
    : [];

  return (
    <main className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banner Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Kelola banner promosi dan tampilan visual website Anda
          </p>
        </div>
        <Button onClick={handleCreate} size="default" className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Banner
        </Button>
      </div>

      {/* Stats Summary */}
      {data?.data && data.data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Banner</p>
                <p className="text-2xl font-bold">{data.data.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Banner Aktif</p>
                <p className="text-2xl font-bold text-green-600">
                  {data.data.filter((b) => b.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Banner Nonaktif</p>
                <p className="text-2xl font-bold text-muted-foreground">
                  {data.data.filter((b) => !b.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid Gallery */}
      {!data?.data || data.data.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed rounded-xl bg-card">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Eye className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Belum ada banner</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Mulai tambahkan banner pertama untuk mempromosikan produk atau event
            Anda
          </p>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah Banner Pertama
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBanners.map((banner) => (
            <div
              key={banner.id}
              className={`group relative rounded-xl overflow-hidden border-2 bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                selectedBanner === banner.id
                  ? "ring-2 ring-primary border-primary"
                  : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedBanner(banner.id)}
            >
              {/* Banner Image Container */}
              <div className="relative w-full aspect-video overflow-hidden bg-muted">
                {banner.url ? (
                  <img
                    src={banner.url}
                    alt={`Banner ${banner.id}`}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">
                        No Image
                      </span>
                    </div>
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Status Badge & Type */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {banner.isActive ? (
                    <span className="px-3 py-1.5 text-xs rounded-full bg-green-500 text-white font-semibold shadow-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Aktif
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 text-xs rounded-full bg-gray-500 text-white font-semibold shadow-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full" />
                      Nonaktif
                    </span>
                  )}
                  {banner.types && (
                    <span className="px-3 py-1.5 text-xs rounded-full bg-accent text-accent-foreground font-semibold shadow-lg capitalize">
                      {banner.types}
                    </span>
                  )}
                </div>

                {/* Inactive Overlay */}
                {!banner.isActive && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="text-center">
                      <EyeOff className="w-12 h-12 text-muted-foreground mb-2 mx-auto" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Banner Nonaktif
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(banner);
                    }}
                    size="sm"
                    className="h-9 w-9 p-0 backdrop-blur-md bg-background/95 hover:bg-primary hover:text-primary-foreground shadow-lg"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(banner.id);
                    }}
                    size="sm"
                    className="h-9 w-9 p-0 backdrop-blur-md bg-background/95 hover:bg-destructive hover:text-destructive-foreground shadow-lg"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Banner ID */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="px-2.5 py-1 text-xs rounded-md bg-background/95 backdrop-blur-md text-muted-foreground font-mono shadow-lg border">
                    ID: {banner.id}
                  </span>
                </div>
              </div>

              {/* Banner Info Footer */}
              <div className="p-3 bg-card border-t">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Banner #{banner.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {banner.types || "General"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {banner.isActive ? (
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                    ) : (
                      <span className="w-2 h-2 bg-gray-400 rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <BannerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        banner={editingBanner}
      />
    </main>
  );
}
