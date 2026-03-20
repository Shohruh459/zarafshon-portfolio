"use client";
import { useState, useEffect } from "react";

export default function Kurs() {
  var [kurslar, setKurslar] = useState(null);
  var [loading, setLoading] = useState(true);
  var [xato, setXato] = useState(false);
  var [miqdor, setMiqdor] = useState("");
  var [yonalish, setYonalish] = useState("uzsToUsd");
  var [oxiriYangilangan, setOxiriYangilangan] = useState("");

  useEffect(function() {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then(function(res) { return res.json(); })
      .then(function(data) {
        setKurslar(data.rates);
        var sana = new Date();
        setOxiriYangilangan(sana.toLocaleString("uz-UZ"));
        setLoading(false);
      })
      .catch(function() {
        setXato(true);
        setLoading(false);
      });
  }, []);

  var uzs = kurslar ? kurslar["UZS"] : 0;
  var eur = kurslar ? kurslar["EUR"] : 0;
  var rub = kurslar ? kurslar["RUB"] : 0;
  var gbp = kurslar ? kurslar["GBP"] : 0;

  var m = parseFloat(miqdor.replace(/\s/g,"").replace(/[^0-9.]/g,"")) || 0;

  function hisobla() {
    if (!kurslar || m <= 0) return null;
    if (yonalish === "uzsToUsd") return m / uzs;
    if (yonalish === "usdToUzs") return m * uzs;
    if (yonalish === "uzsToEur") return m / uzs * eur;
    if (yonalish === "uzsToRub") return m / uzs * rub;
    if (yonalish === "uzsToGbp") return m / uzs * gbp;
    return null;
  }

  var natija = hisobla();

  function fmtUzs(n) {
    return Math.round(n).toLocaleString("uz-UZ") + " so'm";
  }
  function fmtVal(n, symbol) {
    return n.toLocaleString("uz-UZ", {minimumFractionDigits:2, maximumFractionDigits:2}) + " " + symbol;
  }

  var yonalishlar = [
    {key:"uzsToUsd", nom:"So'm → USD", symbol:"$"},
    {key:"usdToUzs", nom:"USD → So'm", symbol:"so'm"},
    {key:"uzsToEur", nom:"So'm → EUR", symbol:"€"},
    {key:"uzsToRub", nom:"So'm → RUB", symbol:"₽"},
    {key:"uzsToGbp", nom:"So'm → GBP", symbol:"£"},
  ];

  var cardStyle = {
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"16px",
    padding:"24px",
    marginBottom:"16px",
  };

  var inputStyle = {
    width:"100%",
    background:"#0d0d18",
    border:"1px solid #2a2a3e",
    borderRadius:"12px",
    padding:"12px 16px",
    color:"white",
    fontSize:"14px",
    outline:"none",
    boxSizing:"border-box",
  };

  var label = {
    fontFamily:"monospace",
    fontSize:"11px",
    color:"#6b7280",
    display:"block",
    marginBottom:"8px",
    letterSpacing:"1px",
  };

  return (
    <main style={{minHeight:"100vh", background:"#07070f", color:"white", fontFamily:"'Segoe UI', system-ui, sans-serif"}}>
      <div style={{maxWidth:"680px", margin:"0 auto", padding:"60px 24px"}}>

        <a href="/" style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", textDecoration:"none", letterSpacing:"2px", display:"inline-block", marginBottom:"40px"}}>
          ← ORQAGA
        </a>

        <div style={{marginBottom:"40px"}}>
          <div style={{display:"inline-block", background:"rgba(34,211,238,0.08)", border:"1px solid rgba(34,211,238,0.2)", borderRadius:"100px", padding:"4px 16px", marginBottom:"16px"}}>
            <span style={{fontFamily:"monospace", fontSize:"11px", color:"#22d3ee", letterSpacing:"3px"}}>KUN 03 · TOOL</span>
          </div>
          <h1 style={{fontSize:"32px", fontWeight:"700", marginBottom:"8px"}}>Valyuta Konvertor</h1>
          <p style={{color:"#6b7280", fontSize:"14px"}}>Real vaqtda valyuta kurslari</p>
        </div>

        {/* Kurs kartochkalari */}
        {loading && (
          <div style={{textAlign:"center", padding:"40px", color:"#6b7280", fontFamily:"monospace", fontSize:"13px"}}>
            Kurslar yuklanmoqda...
          </div>
        )}

        {xato && (
          <div style={{...cardStyle, border:"1px solid rgba(248,113,113,0.3)", textAlign:"center", color:"#f87171", fontFamily:"monospace", fontSize:"13px"}}>
            ⚠ Kurslarni yuklashda xatolik. Internet aloqasini tekshiring.
          </div>
        )}

        {kurslar && (
          <div>
            {/* Real kurs kartochkalari */}
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"16px"}}>
              {[
                {nom:"1 USD", qiymat: fmtUzs(uzs), rang:"#22d3ee", flag:"🇺🇸"},
                {nom:"1 EUR", qiymat: fmtUzs(uzs/eur), rang:"#a78bfa", flag:"🇪🇺"},
                {nom:"1 RUB", qiymat: fmtUzs(uzs/rub), rang:"#f87171", flag:"🇷🇺"},
                {nom:"1 GBP", qiymat: fmtUzs(uzs/gbp), rang:"#e8b84b", flag:"🇬🇧"},
              ].map(function(item) {
                return (
                  <div key={item.nom} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"14px", padding:"18px"}}>
                    <div style={{fontSize:"22px", marginBottom:"6px"}}>{item.flag}</div>
                    <div style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", marginBottom:"4px"}}>{item.nom}</div>
                    <div style={{fontSize:"16px", fontWeight:"600", color:item.rang}}>{item.qiymat}</div>
                  </div>
                );
              })}
            </div>

            <div style={{fontFamily:"monospace", fontSize:"10px", color:"#374151", textAlign:"right", marginBottom:"20px"}}>
              Yangilangan: {oxiriYangilangan}
            </div>

            {/* Konvertor */}
            <div style={cardStyle}>
              <div style={{fontFamily:"monospace", fontSize:"12px", color:"#22d3ee", letterSpacing:"2px", marginBottom:"20px"}}>KONVERTOR</div>

              <div style={{marginBottom:"16px"}}>
                <label style={label}>YO'NALISH</label>
                <select value={yonalish} onChange={function(e){ setYonalish(e.target.value); setMiqdor(""); }}
                  style={{...inputStyle, cursor:"pointer"}}>
                  {yonalishlar.map(function(y) {
                    return <option key={y.key} value={y.key}>{y.nom}</option>;
                  })}
                </select>
              </div>

              <div style={{marginBottom:"16px"}}>
                <label style={label}>MIQDOR</label>
                <input type="text"
                  placeholder={yonalish === "usdToUzs" ? "Masalan: 100" : "Masalan: 1 000 000"}
                  value={miqdor ? parseFloat(miqdor.replace(/\s/g,"")).toLocaleString("uz-UZ") : ""}
                  onChange={function(e){ setMiqdor(e.target.value.replace(/\s/g,"").replace(/[^0-9]/g,"")); }}
                  style={inputStyle} />
              </div>

              {natija !== null && m > 0 && (
                <div style={{background:"rgba(34,211,238,0.06)", border:"1px solid rgba(34,211,238,0.2)", borderRadius:"14px", padding:"20px", textAlign:"center"}}>
                  <div style={{fontFamily:"monospace", fontSize:"10px", color:"#22d3ee", marginBottom:"10px", letterSpacing:"2px"}}>NATIJA</div>
                  <div style={{fontSize:"28px", fontWeight:"700", color:"white"}}>
                    {yonalish === "usdToUzs" ? fmtUzs(natija) : fmtVal(natija, yonalishlar.find(function(y){ return y.key === yonalish; }).symbol)}
                  </div>
                </div>
              )}
            </div>

            {/* Manba */}
            <div style={{...cardStyle, border:"1px solid rgba(234,179,8,0.15)"}}>
              <div style={{fontFamily:"monospace", fontSize:"10px", color:"#eab308", marginBottom:"8px", letterSpacing:"2px"}}>ℹ MANBA</div>
              <p style={{fontSize:"12px", color:"#6b7280", lineHeight:"1.7", margin:0}}>
                Kurslar <strong style={{color:"#9ca3af"}}>open.er-api.com</strong> orqali real vaqtda olinadi. 
                Rasmiy CBAR kursidan biroz farq qilishi mumkin. Katta miqdorli operatsiyalar uchun rasmiy bank kursini tekshiring.
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}