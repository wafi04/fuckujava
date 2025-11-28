import { AuthenticationLayout } from '@/components/layouts/AuthenticationLayout';
import { formatDate } from '@/utils/format';
import { Bell, Eye, FileText, Globe, Lock, Mail, Shield, UserCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | Lindungi Data Anda',
  description: 'Kebijakan privasi  menjelaskan bagaimana kami melindungi dan mengelola data pribadi Anda saat melakukan top-up game favorit. Keamanan data Anda adalah prioritas kami.',
  keywords: 'kebijakan privasi top-up game, keamanan data gaming, privasi pemain game, perlindungan data top-up, kebijakan privasi mobile legends, free fire top-up aman',
  openGraph: {
    title: 'Kebijakan Privasi',
    description: 'Pelajari bagaimana melindungi privasi dan keamanan data Anda',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy`,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy`,
  },
};

export default function PrivacyPolicies() {
  return (
    <AuthenticationLayout>
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-muted-foreground text-lg">
            Terakhir diperbarui: {formatDate(new Date().toISOString(),"date-only")}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 shadow-sm">
          <p className="text-card-foreground leading-relaxed">
            Di <strong>TopUpGame</strong>, kami berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. 
            Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi 
            Anda saat menggunakan layanan top-up game kami.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Informasi yang Kami Kumpulkan</h2>
                <div className="text-muted-foreground space-y-3">
                  <p><strong className="text-foreground">Informasi Akun Game:</strong> User ID, server, nickname game untuk proses top-up</p>
                  <p><strong className="text-foreground">Informasi Transaksi:</strong> Riwayat pembelian, metode pembayaran (tanpa menyimpan detail kartu kredit)</p>
                  <p><strong className="text-foreground">Informasi Kontak:</strong> Email dan nomor telepon untuk konfirmasi pesanan</p>
                  <p><strong className="text-foreground">Data Teknis:</strong> Alamat IP, jenis perangkat, browser untuk keamanan dan analitik</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Bagaimana Kami Menggunakan Informasi</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>• Memproses dan menyelesaikan transaksi top-up game Anda</p>
                  <p>• Mengirim konfirmasi pesanan dan notifikasi status transaksi</p>
                  <p>• Memberikan layanan customer support yang responsif</p>
                  <p>• Mencegah fraud dan menjaga keamanan platform</p>
                  <p>• Meningkatkan pengalaman pengguna melalui analisis data</p>
                  <p>• Mengirimkan promosi dan penawaran khusus (dengan persetujuan Anda)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Keamanan Data</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>Kami menggunakan teknologi enkripsi SSL/TLS untuk melindungi data transaksi Anda. Informasi sensitif disimpan dengan standar keamanan tinggi dan hanya dapat diakses oleh personel berwenang.</p>
                  <p className="mt-4"><strong className="text-foreground">Langkah Keamanan Kami:</strong></p>
                  <p>• Enkripsi end-to-end untuk semua transaksi</p>
                  <p>• Sistem deteksi fraud otomatis</p>
                  <p>• Audit keamanan berkala</p>
                  <p>• Tidak menyimpan informasi kartu kredit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Berbagi Informasi dengan Pihak Ketiga</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>Kami hanya membagikan informasi Anda dengan pihak ketiga dalam kondisi berikut:</p>
                  <p>• <strong className="text-foreground">Payment Gateway:</strong> Untuk memproses pembayaran Anda dengan aman</p>
                  <p>• <strong className="text-foreground">Game Publishers:</strong> Untuk mengirimkan item/currency ke akun game Anda</p>
                  <p>• <strong className="text-foreground">Pihak Berwenang:</strong> Jika diwajibkan oleh hukum atau untuk mencegah aktivitas ilegal</p>
                  <p className="mt-4">Kami TIDAK PERNAH menjual data pribadi Anda kepada pihak ketiga untuk tujuan marketing.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Hak Pengguna</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>Anda memiliki hak untuk:</p>
                  <p>• <strong className="text-foreground">Mengakses</strong> data pribadi yang kami simpan tentang Anda</p>
                  <p>• <strong className="text-foreground">Memperbaiki</strong> informasi yang tidak akurat</p>
                  <p>• <strong className="text-foreground">Menghapus</strong> akun dan data pribadi Anda</p>
                  <p>• <strong className="text-foreground">Menarik persetujuan</strong> untuk komunikasi marketing</p>
                  <p>• <strong className="text-foreground">Meminta salinan</strong> data Anda dalam format yang dapat dibaca</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies dan Teknologi Pelacakan</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>Kami menggunakan cookies dan teknologi serupa untuk:</p>
                  <p>• Menjaga sesi login Anda tetap aktif</p>
                  <p>• Mengingat preferensi dan pengaturan Anda</p>
                  <p>• Menganalisis traffic dan pola penggunaan website</p>
                  <p>• Menampilkan iklan yang relevan</p>
                  <p className="mt-4">Anda dapat mengatur browser untuk menolak cookies, namun beberapa fitur website mungkin tidak berfungsi optimal.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-12 bg-muted border border-border rounded-lg p-6">
          <p className="text-sm text-muted-foreground text-center">
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diinformasikan melalui 
            website kami. Dengan terus menggunakan layanan TopUpGame, Anda menyetujui kebijakan privasi yang berlaku.
          </p>
        </div>
      </div>
    </div>
    </AuthenticationLayout>

  );
}