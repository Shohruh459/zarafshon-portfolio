"use client";
import { useState } from "react";

export default function QarzKalkulyatori() {
  const [qarz, setQarz] = useState("");
  const [muddat, setMuddat] = useState(12);
  const [foiz, setFoiz] = useState(20);

  const r = foiz / 100 / 12;
  const n = muddat;
  const P = parseFloat(qarz);

  let oylik = 0, jami = 0, foizSumma = 0;
  if (P > 0) {
    oylik = r === 0 ? P / n : P * r * Math.pow(1+r,n) / (Math.pow(1+r,n) - 1);
    jami = oylik * n;
    foizSumma = jami - P;
  }

  const fmt = (n) => Math.round(n).toLocaleString("uz-UZ") + " so'm";

  const jadval = [];
  if (P > 0) {
    let qoldiq = P;
    for (let i = 1; i <= Math.min(n, 24); i++) {
      const foizQism = qoldiq * r;
      const asosiy = oylik - foizQism;
      qoldiq = Math.max(0, qoldiq - asosiy);
      jadval.push({ oy: i, oylik, asosiy, foizQism, qoldiq });
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Back */}
        <a href="/" className="text-xs font-mono text-gray-500 hover:text-white mb-10 inline-block tracking-widest">
          ← ORQAGA
        </a>

        {/* Title */}
        <p className="text-xs font-mono tracking-[4px] text-cyan-400 uppercase mb-3">KUN 01 · Tool</p>
        <h1 className="text-3xl font-bold mb-2">Qarz Kalkulyatori</h1>
        <p className="text-gray-400 text-sm mb-10">Oylik to'lov, foiz va jami summani hisoblang</p>

        {/* Input */}
        <div className="bg-[#1a1a26] border border-[#2a2a3e] rounded-2xl p-6 mb-6">
          <div className="mb-6">
            <label className="text-xs font-mono text-gray-400 mb-2 block">Qarz miqdori (so'm)</label>
            <input
  type="text"
  placeholder="Masalan: 5 000 000"
  value={qarz ? parseFloat(qarz.replace(/\s/g, "")).toLocaleString("uz-UZ") : ""}
  onChange={e => setQarz(e.target.value.replace(/\s/g, "").replace(/[^0-9]/g, ""))}
  className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
/>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="text-xs font-mono text-gray-400">Muddat</label>
              <span className="text-xs font-mono text-white">{muddat} oy</span>
            </div>
            <input type="range" min="1" max="60" value={muddat}
              onChange={e => setMuddat(+e.target.value)}
              className="w-full accent-cyan-400" />
            <div className="flex justify-between text-xs text-gray-600 font-mono mt-1">
              <span>1 oy</span><span>60 oy</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-mono text-gray-400">Yillik foiz</label>
              <span className="text-xs font-mono text-white">{foiz}%</span>
            </div>
            <input type="range" min="0" max="60" step="0.5" value={foiz}
              onChange={e => setFoiz(+e.target.value)}
              className="w-full accent-cyan-400" />
            <div className="flex justify-between text-xs text-gray-600 font-mono mt-1">
              <span>0%</span><span>60%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        {P > 0 && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Oylik to'lov", value: fmt(oylik), color: "text-white" },
                { label: "Jami to'lov", value: fmt(jami), color: "text-white" },
                { label: "Foiz summasi", value: "+" + fmt(foizSumma), color: "text-red-400" },
              ].map((item) => (
                <div key={item.label} className="bg-[#1a1a26] border border-[#2a2a3e] rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 font-mono mb-2">{item.label}</p>
                  <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Jadval */}
            <div className="bg-[#1a1a26] border border-[#2a2a3e] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#2a2a3e]">
                <p className="text-xs font-mono text-gray-400">To'lov jadvali {n > 24 ? `(dastlabki 24 oy)` : ""}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs font-mono text-gray-500 border-b border-[#2a2a3e]">
                      <td className="px-4 py-3">Oy</td>
                      <td className="px-4 py-3 text-right">To'lov</td>
                      <td className="px-4 py-3 text-right text-green-400">Asosiy</td>
                      <td className="px-4 py-3 text-right text-red-400">Foiz</td>
                      <td className="px-4 py-3 text-right">Qoldiq</td>
                    </tr>
                  </thead>
                  <tbody>
                    {jadval.map((r) => (
                      <tr key={r.oy} className="border-b border-[#2a2a3e] hover:bg-[#0a0a0f] transition-colors">
                        <td className="px-4 py-3 font-mono text-gray-400">{r.oy}</td>
                        <td className="px-4 py-3 text-right">{Math.round(r.oylik).toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-green-400">{Math.round(r.asosiy).toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-red-400">{Math.round(r.foizQism).toLocaleString()}</td>
                        <td className="px-4 py-3 text-right">{Math.round(r.qoldiq).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Disclaimer */}
<div className="mt-8 bg-[#1a1a26] border border-[#2a2a3e] rounded-2xl p-5">
  <p className="text-xs font-mono text-yellow-400 mb-2">⚠ ESLATMA</p>
  <p className="text-xs text-gray-400 leading-relaxed">
    Zarafshon Dasturchilari kredit olishni tavsiya ham etmaydi, to'sqinlik ham qilmaydi. 
    Bu vosita faqat hisoblash imkonini beradi. Moliyaviy qarorlar uchun mutaxassisga murojaat qiling.
  </p>
</div>
    </main>
  );
}