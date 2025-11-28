"use client";
import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckTransactionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/invoice/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <AuthenticationLayout className="w-full">
      <main className="min-h-screen w-full max-w-7xl">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Check Transaction
            </h1>
            <p className="text-gray-600">
              Search and view your transaction history
            </p>
          </div>

          {/* Search Form */}
          <div className="rounded-lg p-6 mb-6">
            <form onSubmit={handleSearch}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Search Transactions
                  </Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Enter Reference ID or Product Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="sm:self-end">
                  <Button type="submit">
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </AuthenticationLayout>
  );
}