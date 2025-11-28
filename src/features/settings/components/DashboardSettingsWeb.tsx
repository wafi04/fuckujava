"use client";

import { useGetWebSettings } from "@/features/settings/api";
import { FormWebSettings } from "./FormWebSettings";

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