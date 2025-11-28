import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout";
import { LeaderboardTransaksi } from "./Leaderboard";


export default function Page() {
    return (
        <AuthenticationLayout className="w-full">
            <LeaderboardTransaksi />
        </AuthenticationLayout>
    )
}