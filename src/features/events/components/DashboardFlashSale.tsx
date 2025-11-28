import { Button } from "@/components/ui/button";
import { HeaderDashboard } from "@/components/ui/HeaderDashboard";
import { UpgradePacketCard } from "@/components/ui/UpgradePaket";
import { useState } from "react";
import { UseGetAllFlashSales, useGetFeaturesPaket } from "../api/api";
import type { PacketFeatures } from "../types";
import { DialogFlashSale } from "./DialogFlashSale";
import { TableFlashSales } from "./TableFlashSale";

export default function DashboardFlashSale() {
  const { data } = useGetFeaturesPaket();
  const { data: FlashSaleData } = UseGetAllFlashSales();
  const [openCreate, setOpenCreate] = useState(false);

  // Cari fitur flash_sale
  const flashSaleFeature = data?.data.find(
    (feature: PacketFeatures) => feature.code === "flash_sale"
  );

  // Jika fitur flash_sale tidak enabled, tampilkan upgrade card
  if (flashSaleFeature && !flashSaleFeature.is_enabled) {
    return (
      <main className="container min-h-screen flex justify-center py-4 w-full">
        <UpgradePacketCard />
      </main>
    );
  }

  return (
    <>
      {FlashSaleData && flashSaleFeature?.is_enabled && (
        <main className="container py-4 w-full">
          <HeaderDashboard
            title="Dashboard Flash Sale"
            description="Dashboard Manage Flash Sale"
          >
            <Button onClick={() => setOpenCreate(true)}>Create</Button>
          </HeaderDashboard>
          <TableFlashSales data={FlashSaleData} />
        </main>
      )}

      {openCreate && (
        <DialogFlashSale
          onOpen={() => setOpenCreate(!openCreate)}
          open={openCreate}
        />
      )}
    </>
  );
}
