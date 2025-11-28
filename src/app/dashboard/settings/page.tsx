"use client";

import { useGetWebSettings } from "@/features/settings/api";
import { FormWebSettings } from "@/features/settings/components/FormWebSettings";

export default function Page() {
  const { data } = useGetWebSettings();
  return (
    <main className="p-6">
      <FormWebSettings
        initialData={data?.data}
        branchId={data?.data.branchId}
      />
    </main>
  );
}