// app/category/[id]/page.tsx
"use client";
import React, { useState, use, useEffect } from 'react'; // useEffectを追加
import { ArrowLeft, Trash2, Settings, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const decodedId = decodeURIComponent(resolvedParams.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 【追加】ボタンが押されたことを強制的に画面に伝えるデバッグ用の呪文
  useEffect(() => {
    console.log("現在のモーダルの状態:", isModalOpen);
  }, [isModalOpen]);
  
  // ダミーデータ（これを後でデータベース化します）
  const items = [
    { name: "卵", date: "2026/03/30" },
    { name: "鶏肉", date: "2026/03/28" },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 font-sans relative overflow-x-hidden" 
         style={{
           backgroundColor: '#e6f4ea',
           backgroundImage: 'url("https://www.transparenttextures.com/patterns/absurdity.png")',
         }}>
      
      <header className="mb-12 border-b-4 border-gray-300 pb-2">
        <h1 className="text-6xl font-extrabold text-black uppercase">{decodedId}</h1>
      </header>

      <main className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="aspect-square bg-neutral-200 rounded-lg p-4 flex flex-col justify-between shadow-sm border border-black/5">
            <span className="text-2xl font-bold text-black">{item.name}</span>
            <span className="text-sm text-gray-600 font-mono">{item.date}</span>
          </div>
        ))}
      </main>

      {/* --- 入力モーダル --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400"><X size={32} /></button>
            <h2 className="text-3xl font-black mb-8 text-black">新しく追加</h2>
            <div className="space-y-6 text-black">
              <input type="text" className="w-full p-5 bg-gray-100 rounded-2xl text-xl outline-none" placeholder="なまえ" />
              <input type="date" className="w-full p-5 bg-gray-100 rounded-2xl text-xl outline-none" />
              <button className="w-full py-5 bg-black text-white font-bold rounded-2xl text-xl active:scale-95" onClick={() => setIsModalOpen(false)}>保存する</button>
            </div>
          </div>
        </div>
      )}

      {/* --- 操作バー --- */}
      <footer className="fixed bottom-10 right-10 z-[5000] flex flex-col items-end gap-4">
        <div className="border-b-4 border-gray-400 w-48 mb-1"></div>
        <div className="flex gap-4 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-2xl border border-white/20">
          <Link href="/" className="p-4 text-black active:scale-75 transition-transform"><ArrowLeft size={36} /></Link>
          <div className="p-4 text-black active:scale-75 transition-transform cursor-pointer"><Trash2 size={36} /></div>
          <div className="p-4 text-black active:scale-75 transition-transform cursor-pointer"><Settings size={36} /></div>
          
          {/* プラスボタン：iPad Chromeで確実に反応するボタン */}
            <button onClick={() => {
              console.log("ボタンが押されました");
    
    // 記事の知見：一瞬だけタイミングをずらして、ブラウザに描画を強制する
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 0);
    });
  }}
  className="p-4 bg-green-400 text-black rounded-full shadow-lg active:scale-75 transition-transform outline-none border-none"
  style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
>
  <Plus size={36} strokeWidth={3} />
</button>
        </div>
      </footer>
    </div>
  );
}