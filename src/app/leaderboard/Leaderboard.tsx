"use client";
import { api } from "@/lib/api";
import { API_RESPONSE } from "@/lib/types";
import { FormatCurrency } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
export interface LeaderboardItem {
  username: string;
  total: number;
}

export interface LeaderboardTransaksiResponse {
  bulan: LeaderboardItem[];
  minggu: LeaderboardItem[];
  hari: LeaderboardItem[];
}

function LeaderboardList({
  title,
  items,
}: {
  title: string;
  items: LeaderboardItem[];
}) {
  return (
    <div>
      <h2 className="ml-3 inline-flex rounded-t-md border border-b-0 bg-muted px-4 py-1 text-xs leading-6">
        {title}
      </h2>
      <div className="relative rounded-lg bg-muted/50 p-6 ring-1 ring-muted">
        <ul className="space-y-3 text-sm leading-6 text-foreground">
          {items?.length > 0 ? (
            items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-x-3"
              >
                <div>
                  {index + 1}. {item.username}{" "}
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : ""}
                </div>
                <div>{FormatCurrency(item.total)}</div>
              </li>
            ))
          ) : (
            <li className="text-muted-foreground text-center">
              Belum ada data
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export function LeaderboardTransaksi() {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await api.get<API_RESPONSE<LeaderboardTransaksiResponse>>(
        "/trxreseller/leaderboard"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <main className="relative bg-background">
        <section className="relative pb-12 pt-24 text-center">
          Loading...
        </section>
      </main>
    );
  }

  const leaderboard = data?.data;
  return (
    <main className="relative container w-full">
      <section className="relative py-12">
        <div className="">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Leaderboard
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Top 10 Pembelian Terbanyak 
            </p>
          </div>
          <p className="text-murky-400 mx-auto mt-6 max-w-3xl text-center text-lg leading-8">
            Berikut ini adalah daftar 10 pembelian terbanyak yang dilakukan oleh
            pelanggan kami. Data ini diambil dari sistem kami dan selalu
            diperbaharui.
          </p>

          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:grid-cols-2 lg:mx-0 lg:max-w-none xl:grid-cols-3">
            <LeaderboardList
              title="Top 10 - Hari Ini"
              items={leaderboard?.hari ?? []}
            />
            <LeaderboardList
              title="Top 10 - Minggu Ini"
              items={leaderboard?.minggu ?? []}
            />
            <LeaderboardList
              title="Top 10 - Bulan Ini"
              items={leaderboard?.bulan ?? []}
            />
          </div>
        </div>
      </section>
    </main>
  );
}