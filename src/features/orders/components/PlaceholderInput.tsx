import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { HeaderFieldOrder } from "./HeaderFieldOrder";
import { useGetFormFields } from "@/hooks/useGetFormFields";
import { useOrderStore } from "@/hooks/useOrder";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetCheckNickname } from "../check-nickname";

interface PlaceHolderInputProps {
  brand: string;
  codeCheckNickname: string
  isCheckNickName: boolean;
  setSelects?: (value: string) => void;
}

interface NicknameStatusProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  result?: {
    region?: string;
    nickname?: string;
  };
}

export function PlaceHolderInput({ brand, codeCheckNickname }: PlaceHolderInputProps) {
  const { data, isLoading } = useGetFormFields(brand);
  const { setFormData, errors, formData } = useOrderStore();

  const debouncedGameId = useDebounce(formData.gameId, 800);
  const debouncedServerId = useDebounce(formData.serverId, 800);
  const hasServerIdField = data?.data.some((field) => field.fieldName === "serverId") as boolean


  // Get status dengan debounced values
  const {
    data: statusData,
    isLoading: loadingCheckNickname,
    isSuccess: isCheckSuccess,
    isError: isCheckError,
  } = useGetCheckNickname({
    hasServerId: hasServerIdField,
    game: codeCheckNickname,
    gameId: debouncedGameId,
    zone: debouncedServerId,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ [field]: value });
  };

  if (isLoading) {
    return (
      <div className="py-4 bg-card px-4 rounded-lg border border-border">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-9 bg-gray-200 rounded"></div>
            <div className="h-9 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="py-4 bg-card px-4 rounded-lg border border-border">
        <div className="text-gray-500 text-sm">
          No form fields found for {brand}
        </div>
      </div>
    );
  }

  const gridCols = Math.min(data.data.length, 4);
  const gridClass = `grid gap-4 ${gridCols === 1
      ? "grid-cols-1"
      : gridCols === 2
        ? "grid-cols-1 md:grid-cols-2"
        : gridCols === 3
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    }`;

  // Cek apakah harus menampilkan status nickname
  // Hanya tampilkan jika ada codeCheckNicname dan gameId sudah diisi
  const shouldShowNicknameStatus =
    codeCheckNickname &&
    debouncedGameId &&
    debouncedGameId.length > 0;

  return (
    <div
      id="placholderinput-section"
      className="bg-card rounded-lg border rounded-xl border-border"
    >
      <HeaderFieldOrder id={1} subName="Masukkan Detail Akun" />

      <div className={`${gridClass} p-4`}>
        {data.data
          .sort((a, b) => a.fieldOrder - b.fieldOrder)
          .map((field) => {
            const fieldValue =
              (formData as unknown as Record<string, string>)[
              field.fieldName
              ] || "";
            const fieldError = errors[field.fieldName];

            return (
              <div key={field.id} className="space-y-2">
                <label
                  htmlFor={field.fieldName}
                  className="block text-xs font-medium text-foreground"
                >
                  {field.fieldLabel}
                </label>

                <div className="relative">
                  {field.fieldType === "select" ? (
                    <select
                      id={field.fieldName}
                      name={field.fieldName}
                      className={`relative block h-9 w-full rounded-lg border px-3 text-xs text-foreground focus:z-10 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-75 transition-colors ${fieldError
                          ? "border-destructive focus:border-destructive focus:ring-destructive bg-destructive/5"
                          : "border-border bg-input focus:border-primary focus:ring-primary"
                        }`}
                      value={fieldValue}
                      onChange={(e) =>
                        handleInputChange(field.fieldName, e.target.value)
                      }
                      disabled={isLoading || formData.isCheckNickname}
                    >
                      <option value="">Pilih {field.fieldLabel}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className={`relative block h-9 w-full appearance-none rounded-lg border px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-75 transition-colors ${fieldError
                          ? "border-destructive focus:border-destructive focus:ring-destructive bg-destructive/5"
                          : "border-border bg-input focus:border-primary focus:ring-primary"
                        }`}
                      type={field.fieldType || "text"}
                      id={field.fieldName}
                      name={field.fieldName}
                      placeholder={`Masukkan ${field.fieldLabel}`}
                      autoComplete="off"
                      value={fieldValue}
                      onChange={(e) =>
                        handleInputChange(field.fieldName, e.target.value)
                      }
                      disabled={isLoading || formData.isCheckNickname}
                    />
                  )}

                  {fieldError && (
                    <div className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <span>⚠</span>
                      <span>{fieldError}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {shouldShowNicknameStatus && (
        <div className="px-4 pb-4">
          <NicknameStatus
            isLoading={loadingCheckNickname}
            isSuccess={isCheckSuccess && statusData?.success === true}
            isError={isCheckError || statusData?.success === false}
            result={statusData}
          />
        </div>
      )}
    </div>
  );
}

export function NicknameStatus({
  isLoading,
  isSuccess,
  isError,
  result
}: NicknameStatusProps) {
  if (isLoading) {
    return (
      <Card className="p-2 border-blue-200 bg-blue-50/50">
        <CardContent className="p-0">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Memverifikasi akun...
              </p>
              <p className="text-xs text-blue-700">Mohon tunggu sebentar</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isSuccess && result?.nickname) {
    return (
      <Card className="p-2 border-emerald-200 bg-emerald-50/50">
        <CardContent className="p-0">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-emerald-900">
                Akun berhasil diverifikasi
              </p>
              <p className="text-xs text-emerald-700 mt-0.5">
                <span className="font-semibold">{result.nickname}</span>
                {result.region && <span> - {result.region}</span>}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-2 border-red-200 bg-red-50/50">
        <CardContent className="p-0">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-900">
                Nickname tidak ditemukan
              </p>
              <p className="text-xs text-red-700">
                Periksa kembali User ID dan Server ID Anda
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}