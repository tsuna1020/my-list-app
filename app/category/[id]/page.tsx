// app/category/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { ArrowLeft, Trash2, Settings, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  
  // 【重要】decodeURIComponent を使って、URLの変な文字列を日本語に戻す
  const rawId = params.id as string;
  const decodedId = decodeURIComponent(rawId);

  // ダミーデータ（後で本物のデータに置き換えます）
  const items = [
    { name: "卵", date: "2024/05/20" },
    { name: "鶏肉", date: "2024/05/18" },
    { name: "", date: "" },
    { name: "", date: "" },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 font-sans" 
         style={{
           backgroundColor: '#e6f4ea',
           backgroundImage: 'url("https://www.transparenttextures.com/patterns/absurdity.png")',
         }}>
      
      {/* タイトル：ここが日本語で表示されるようになります */}
      <header className="mb-12 border-b-4 border-gray-300 pb-2 flex justify-between items-end">
        <h1 className="text-6xl font-extrabold text-black">
          {decodedId}
        </h1>
      </header>

      {/* 2画面目のタイル一覧 */}
      <main className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="aspect-square bg-neutral-200 rounded-lg p-4 flex flex-col justify-between shadow-sm active:scale-95 transition-transform">
            <span className="text-2xl font-bold">{item.name}</span>
            <span className="text-sm text-gray-600">{item.date}</span>
          </div>
        ))}
      </main>

      {/* 右下の操作バー */}
      <footer className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
        <div className="border-b-4 border-gray-300 w-64 mb-1"></div>
        <div className="flex gap-4 p-2 bg-white/50 backdrop-blur-sm rounded-full shadow-lg">
          <Link href="/">
            <button className="p-3 text-black hover:bg-neutral-200 rounded-full transition-colors active:scale-95">
              <ArrowLeft size={32} />
            </button>
          </Link>
          <button className="p-3 text-black hover:bg-neutral-200 rounded-full transition-colors active:scale-95">
            <Trash2 size={32} />
          </button>
          <button className="p-3 text-black hover:bg-neutral-200 rounded-full transition-colors active:scale-95">
            <Settings size={32} />
          </button>
          <button className="p-3 text-black hover:bg-neutral-200 rounded-full transition-colors active:scale-95">
            <Plus size={32} />
          </button>
        </div>
      </footer>
    </div>
  );
}