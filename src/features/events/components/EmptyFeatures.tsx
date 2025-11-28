import { Package } from 'lucide-react';

export function EmptyFeatures() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-12">
      <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gray-100">
        <Package className="w-10 h-10 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Tidak Ada Paket Fitur
      </h3>
      
      <p className="text-gray-500 text-center max-w-md mb-6">
        Belum ada paket fitur yang tersedia saat ini. Silakan hubungi admin atau coba lagi nanti.
      </p>
      
      <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Hubungi Admin
      </button>
    </div>
  );
}