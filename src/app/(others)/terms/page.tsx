import { AuthenticationLayout } from "@/components/layouts/AuthenticationLayout";
import { formatDate } from "@/utils/format";
import {
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  CreditCard,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan | TopUpGame - Aturan Layanan Top-Up",
  description:
    "Syarat dan ketentuan layanan TopUpGame. Baca aturan, kebijakan pengembalian dana, dan ketentuan penggunaan layanan top-up game kami sebelum bertransaksi.",
  keywords:
    "syarat ketentuan top-up game, terms and conditions gaming, aturan top-up mobile legends, kebijakan refund game, ketentuan layanan top-up",
  openGraph: {
    title: "Syarat dan Ketentuan - TopUpGame",
    description: "Ketahui syarat dan ketentuan layanan top-up game kami",
    type: "website",
    url:  `${process.env.NEXT_PUBLIC_SITE_URL}/terms`,
  },
  alternates: {
    canonical:  `${process.env.NEXT_PUBLIC_SITE_URL}/terms`,
  },
};

export default function Terms() {
  return (
    <AuthenticationLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-lg">
              <Scale className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Syarat dan Ketentuan
            </h1>
            <p className="text-muted-foreground text-lg">
              Terakhir diperbarui:{" "}
              {formatDate(new Date().toISOString(), "date-only")}
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8 shadow-sm">
            <p className="text-card-foreground leading-relaxed">
              Selamat datang di <strong>TopUpGame</strong>. Dengan menggunakan
              layanan kami, Anda menyetujui syarat dan ketentuan berikut. Harap
              membaca dengan seksama sebelum melakukan transaksi. Jika Anda
              tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan
              layanan kami.
            </p>
          </div>

          {/* Alert Box */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-foreground mb-2">
                Penting untuk Dibaca!
              </h3>
              <p className="text-muted-foreground text-sm">
                Pastikan Anda memasukkan User ID dan Server dengan benar.
                Kesalahan input adalah tanggung jawab pembeli dan tidak dapat
                dikembalikan.
              </p>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {/* Section 1 */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    1. Ketentuan Umum
                  </h2>
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      • Pengguna harus berusia minimal 17 tahun atau mendapat
                      izin orang tua/wali
                    </p>
                    <p>• Setiap akun hanya boleh digunakan oleh satu orang</p>
                    <p>
                      • Pengguna bertanggung jawab menjaga kerahasiaan informasi
                      akun
                    </p>
                    <p>
                      • TopUpGame berhak menolak atau membatalkan pesanan yang
                      mencurigakan
                    </p>
                    <p>
                      • Kami tidak bertanggung jawab atas banned/suspend akun
                      game yang dilakukan oleh publisher
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    2. Proses Pemesanan dan Pembayaran
                  </h2>
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      <strong className="text-foreground">
                        Langkah Pemesanan:
                      </strong>
                    </p>
                    <p>• Pilih game dan nominal yang diinginkan</p>
                    <p>• Masukkan User ID dan Server dengan benar</p>
                    <p>• Pilih metode pembayaran</p>
                    <p>• Selesaikan pembayaran sesuai instruksi</p>
                    <p className="mt-4">
                      <strong className="text-foreground">Pembayaran:</strong>
                    </p>
                    <p>
                      • Pembayaran harus diselesaikan dalam waktu yang
                      ditentukan
                    </p>
                    <p>
                      • Pesanan otomatis dibatalkan jika pembayaran tidak
                      diterima
                    </p>
                    <p>
                      • Kami menerima berbagai metode pembayaran: E-wallet,
                      Transfer Bank, QRIS, Pulsa
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    3. Waktu Proses
                  </h2>
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      <strong className="text-foreground">
                        Proses Normal:
                      </strong>
                    </p>
                    <p>
                      • Item akan masuk dalam 1-5 menit setelah pembayaran
                      berhasil
                    </p>
                    <p>
                      • Untuk beberapa game tertentu bisa memakan waktu hingga
                      30 menit
                    </p>
                    <p className="mt-4">
                      <strong className="text-foreground">
                        Keterlambatan:
                      </strong>
                    </p>
                    <p>
                      • Jika lebih dari 1 jam belum masuk, hubungi customer
                      service kami
                    </p>
                    <p>
                      • Keterlambatan dapat terjadi karena maintenance server
                      game
                    </p>
                    <p>
                      • Kami tidak bertanggung jawab atas keterlambatan dari
                      pihak publisher game
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 - Refund Policy */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    4. Kebijakan Pengembalian Dana (Refund)
                  </h2>
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      <strong className="text-foreground">
                        Refund TIDAK dapat dilakukan jika:
                      </strong>
                    </p>
                    <p>• Kesalahan input User ID atau Server dari pembeli</p>
                    <p>• Item sudah masuk ke akun game</p>
                    <p>• Pembeli berubah pikiran setelah pembayaran</p>
                    <p>• Akun game di-banned oleh publisher</p>

                    <p className="mt-4">
                      <strong className="text-foreground">
                        Refund DAPAT dilakukan jika:
                      </strong>
                    </p>
                    <p>• Terjadi kesalahan teknis dari sistem kami</p>
                    <p>
                      • Item tidak masuk dalam waktu 24 jam tanpa alasan jelas
                    </p>
                    <p>• Double payment yang terbukti</p>

                    <p className="mt-4">
                      <strong className="text-foreground">
                        Proses Refund:
                      </strong>
                    </p>
                    <p>• Hubungi customer service dengan bukti transaksi</p>
                    <p>• Verifikasi akan dilakukan maksimal 3x24 jam</p>
                    <p>
                      • Dana dikembalikan ke metode pembayaran yang sama dalam
                      7-14 hari kerja
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    5. Keamanan dan Privasi
                  </h2>
                  <div className="text-muted-foreground space-y-3">
                    <p>• Kami tidak akan meminta password akun game Anda</p>
                    <p>
                      • Data pribadi dilindungi sesuai Kebijakan Privasi kami
                    </p>
                    <p>
                      • Jangan berbagi informasi pembayaran Anda dengan pihak
                      lain
                    </p>
                    <p>
                      • Laporkan segera jika terjadi aktivitas mencurigakan di
                      akun Anda
                    </p>
                    <p>
                      • Kami menggunakan enkripsi SSL untuk melindungi transaksi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    6. Hak dan Kewajiban Pengguna
                  </h2>
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      <strong className="text-foreground">Hak Pengguna:</strong>
                    </p>
                    <p>• Mendapatkan item sesuai yang dipesan</p>
                    <p>• Mendapat bukti transaksi yang sah</p>
                    <p>• Mendapat layanan customer service</p>
                    <p>• Mengajukan komplain jika terjadi masalah</p>

                    <p className="mt-4">
                      <strong className="text-foreground">
                        Kewajiban Pengguna:
                      </strong>
                    </p>
                    <p>• Memberikan informasi yang akurat dan benar</p>
                    <p>• Menyelesaikan pembayaran tepat waktu</p>
                    <p>• Tidak menyalahgunakan layanan untuk fraud</p>
                    <p>• Mematuhi syarat dan ketentuan yang berlaku</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    7. Larangan Penggunaan
                  </h2>
                  <div className="text-muted-foreground space-y-3">
                    <p>Pengguna dilarang untuk:</p>
                    <p>• Melakukan fraud atau penipuan dalam bentuk apapun</p>
                    <p>• Menggunakan layanan untuk money laundering</p>
                    <p>
                      • Menyalahgunakan bug atau celah sistem untuk keuntungan
                      pribadi
                    </p>
                    <p>
                      • Melakukan spamming atau harassment ke customer service
                    </p>
                    <p>• Menggunakan bot atau automation tools</p>
                    <p>• Menjual kembali akun TopUpGame kepada pihak lain</p>

                    <p className="mt-4 font-semibold text-destructive">
                      Pelanggaran akan mengakibatkan pemblokiran akun permanen
                      tanpa pengembalian dana
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    8. Perubahan Syarat dan Ketentuan
                  </h2>
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      • TopUpGame berhak mengubah syarat dan ketentuan kapan
                      saja
                    </p>
                    <p>
                      • Perubahan akan diinformasikan melalui website atau email
                    </p>
                    <p>
                      • Penggunaan layanan setelah perubahan dianggap sebagai
                      persetujuan
                    </p>
                    <p>
                      • Kami menyarankan untuk memeriksa halaman ini secara
                      berkala
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    9. Hukum yang Berlaku
                  </h2>
                  <div className="text-muted-foreground space-y-3">
                    <p>
                      • Syarat dan ketentuan ini diatur oleh hukum Republik
                      Indonesia
                    </p>
                    <p>
                      • Setiap perselisihan akan diselesaikan melalui musyawarah
                      terlebih dahulu
                    </p>
                    <p>
                      • Jika musyawarah gagal, penyelesaian akan dilakukan
                      melalui Pengadilan Negeri Jakarta Selatan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 bg-muted border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground text-center">
              Dengan melakukan transaksi di TopUpGame, Anda dianggap telah
              membaca, memahami, dan menyetujui seluruh syarat dan ketentuan
              yang berlaku.
            </p>
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  );
}
