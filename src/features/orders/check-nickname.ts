import { useOrder } from "@/hooks/useFormOrder";
import { useOrderStore } from "@/hooks/useOrder";
import { useQuery } from "@tanstack/react-query";

interface CreateCheckNicknameRequest {
  gameId: string;
  game: string;
  hasServerId: boolean;
  zone?: string;
}

interface ApiResult {
  success: boolean;
  username?: string;
  region?: string;
  userId?: string;
  zoneId?: string;
  message?: string;
}

interface CheckNicknameResult {
  success: boolean;
  nickname?: string;
  region?: string;
  message?: string;
}

interface CachedNicknameData {
  nickname: string;
  region: string;
  gameId: string;
  zone?: string;
  game: string;
  timestamp: number;
}

export function useGetCheckNickname({ 
  game, 
  gameId, 
  zone,
  hasServerId 
}: CreateCheckNicknameRequest) {
  const { setFormData, } = useOrder();

  const { data, isLoading, error, isSuccess, isError } = useQuery({
    queryKey: ["check-nickname", gameId, zone, game],
    queryFn: async () => {
      if (!game) {
        return {
          success: false,
          message: 'Game code not available',
        };
      }

      const params = new URLSearchParams({
        id: gameId,
        game: game,
      });

     
      // Jika tidak pakai serverId, gunakan zone biasa
      if (hasServerId && zone) {
        params.append('zone', zone);
      }

      const res = await fetch(`/api/check-nickname?${params.toString()}`);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to check nickname');
      }

      const response = await res.json() as ApiResult;

      if (response.success && response.username) {
        const nicknameData: CachedNicknameData = {
          nickname: response.username,
          region: response.region || '',
          gameId: gameId,
          zone: zone,
          game: game,
          timestamp: Date.now(),
        };

        setFormData({
          nickname : nicknameData.nickname,
          gameId : nicknameData.gameId,
          serverId : zone
        });

        return {
          success: true,
          nickname: response.username,
          region: response.region || '',
        };
      }

      return {
        success: false,
        message: response.message || 'Nickname tidak ditemukan',
      };
    },
    enabled: !!gameId && !!game && gameId.length > 5 && 
             (hasServerId ? !!zone : true),
  });

  return {
    data,
    isLoading,
    error,
    isSuccess,
    isError,
  };
}