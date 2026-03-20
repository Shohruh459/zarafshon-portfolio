"use client";
import { useState } from "react";

export default function VaqtHisoblagich() {
  var [stavka, setStavka] = useState("");
  var [soat, setSoat] = useState("");
  var [kun, setKun] = useState("");
  var [soliq, setSoliq] = useState(0);
  var [xarajatlar, setXarajatlar] = useState([]);
  var [xNom, setXNom] = useState("");
  var [xMiqdor, setXMiqdor] = useState("");
  var [xTur, setXTur] = useState("oylik");

  var s = parseFloat(stavka.replace(/\s/g,"").replace(/[^0-9]/g,"")) || 0;
  var h = parseFloat(soat) || 0;
  var d = parseFloat(kun) || 0;

  var kunlik = s * h;
  var haftalik = kunlik * d;
  var oylik = haftalik * 4;

  var oylikXarajat = xarajatlar.reduce(function(sum, x) {
    return sum + (x.tur === "oylik" ? x.miqdor : x.miqdor * d * 4);
  }, 0);

  var kunlikXarajat = xarajatlar.reduce(function(sum, x) {
    return sum + (x.tur === "kunlik" ? x.miqdor : 0);
  }, 0);

  var daromadSoliqOldin = oylik - oylikXarajat;
  var soliqSumma = daromadSoliqOldin > 0 ? daromadSoliqOldin * soliq / 100 : 0;
  var sof = daromadSoliqOldin - soliqSumma;

  function fmt(n) {
    if (n < 0) return "-" + Math.abs(Math.round(n)).toLocaleString("uz-UZ") + " so'm";
    return Math.round(n).toLocaleString("uz-UZ") + " so'm";
  }

  function xarajatQosh() {
    var m = parseFloat(xMiqdor.replace(/\s/g,"").replace(/[^0-9]/g,"")) || 0;
    if (!xNom || m <= 0) return;
    setXarajatlar(xarajatlar.concat([{
      id: Date.now(),
      nom: xNom,
      miqdor: m,
      tur: xTur,
    }]));
    setXNom("");
    setXMiqdor("");
  }

  function xarajatOchir(id) {
    setXarajatlar(xarajatlar.filter(function(x){ return x.id !== id; }));
  }

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
            <span style={{fontFamily:"monospace", fontSize:"11px", color:"#22d3ee", letterSpacing:"3px"}}>KUN 02 · TOOL</span>
          </div>
          <h1 style={{fontSize:"32px", fontWeight:"700", marginBottom:"8px"}}>Vaqt Hisoblagich</h1>
          <p style={{color:"#6b7280", fontSize:"14px"}}>Daromad, xarajat va sof foydangizni hisoblang</p>
        </div>

        {/* Daromad */}
        <div style={cardStyle}>
          <div style={{fontFamily:"monospace", fontSize:"12px", color:"#22d3ee", letterSpacing:"2px", marginBottom:"20px"}}>DAROMAD</div>

          <div style={{marginBottom:"20px"}}>
            <label style={label}>SOATLIK STAVKA (SO'M)</label>
            <input type="text" placeholder="Masalan: 50 000"
              value={stavka ? parseFloat(stavka.replace(/\s/g,"")).toLocaleString("uz-UZ") : ""}
              onChange={function(e){ setStavka(e.target.value.replace(/\s/g,"").replace(/[^0-9]/g,"")); }}
              style={inputStyle} />
          </div>

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px"}}>
            <div>
              <label style={label}>KUNLIK ISH SOATI</label>
              <input type="number" placeholder="8" value={soat}
                onChange={function(e){ setSoat(e.target.value); }}
                style={inputStyle} min="1" max="24" />
            </div>
            <div>
              <label style={label}>HAFTADA NECHA KUN</label>
              <input type="number" placeholder="5" value={kun}
                onChange={function(e){ setKun(e.target.value); }}
                style={inputStyle} min="1" max="7" />
            </div>
          </div>

          <div>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"8px"}}>
              <label style={label}>SOLIQ (%)</label>
              <span style={{fontFamily:"monospace", fontSize:"11px", color:"#22d3ee"}}>{soliq}%</span>
            </div>
            <input type="range" min="0" max="40" step="1" value={soliq}
              onChange={function(e){ setSoliq(+e.target.value); }}
              style={{width:"100%", accentColor:"#22d3ee"}} />
            <div style={{display:"flex", justifyContent:"space-between", fontFamily:"monospace", fontSize:"10px", color:"#374151", marginTop:"4px"}}>
              <span>0%</span><span>40%</span>
            </div>
          </div>
        </div>

        {/* Xarajatlar */}
        <div style={cardStyle}>
          <div style={{fontFamily:"monospace", fontSize:"12px", color:"#f87171", letterSpacing:"2px", marginBottom:"20px"}}>XARAJATLAR</div>

          <div style={{marginBottom:"16px"}}>
            <label style={label}>XARAJAT NOMI</label>
            <input type="text" placeholder="Masalan: Ishchi oyligi"
              value={xNom}
              onChange={function(e){ setXNom(e.target.value); }}
              style={inputStyle} />
          </div>

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"16px"}}>
            <div>
              <label style={label}>MIQDOR (SO'M)</label>
              <input type="text" placeholder="Masalan: 2 000 000"
                value={xMiqdor ? parseFloat(xMiqdor.replace(/\s/g,"")).toLocaleString("uz-UZ") : ""}
                onChange={function(e){ setXMiqdor(e.target.value.replace(/\s/g,"").replace(/[^0-9]/g,"")); }}
                style={inputStyle} />
            </div>
            <div>
              <label style={label}>TURI</label>
              <select value={xTur} onChange={function(e){ setXTur(e.target.value); }}
                style={{...inputStyle, cursor:"pointer"}}>
                <option value="oylik">Oylik</option>
                <option value="kunlik">Kunlik</option>
              </select>
            </div>
          </div>

          <button onClick={xarajatQosh}
            style={{width:"100%", background:"rgba(248,113,113,0.15)", border:"1px solid rgba(248,113,113,0.3)", borderRadius:"12px", padding:"12px", color:"#f87171", fontFamily:"monospace", fontSize:"13px", cursor:"pointer", letterSpacing:"1px"}}>
            + XARAJAT QO'SHISH
          </button>

          {xarajatlar.length > 0 && (
            <div style={{marginTop:"16px"}}>
              {xarajatlar.map(function(x) {
                return (
                  <div key={x.id} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                    <div>
                      <div style={{fontSize:"14px", marginBottom:"2px"}}>{x.nom}</div>
                      <div style={{fontFamily:"monospace", fontSize:"10px", color:"#6b7280"}}>
                        {x.tur === "oylik" ? "Oylik" : "Kunlik"} · {fmt(x.miqdor)}
                        {x.tur === "kunlik" && d > 0 ? " → oyiga " + fmt(x.miqdor * d * 4) : ""}
                      </div>
                    </div>
                    <button onClick={function(){ xarajatOchir(x.id); }}
                      style={{background:"none", border:"none", color:"#6b7280", cursor:"pointer", fontSize:"18px", padding:"4px 8px"}}>
                      ×
                    </button>
                  </div>
                );
              })}
              <div style={{display:"flex", justifyContent:"space-between", paddingTop:"12px", fontFamily:"monospace", fontSize:"12px", color:"#f87171"}}>
                <span>JAMI XARAJAT (OYLIK)</span>
                <span>{fmt(oylikXarajat)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Natija */}
        {s > 0 && h > 0 && d > 0 && (
          <div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"12px"}}>
              <div style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"12px", padding:"16px", textAlign:"center"}}>
                <div style={{fontFamily:"monospace", fontSize:"10px", color:"#6b7280", marginBottom:"8px", letterSpacing:"1px"}}>KUNLIK DAROMAD</div>
                <div style={{fontSize:"15px", fontWeight:"600"}}>{fmt(kunlik)}</div>
                {kunlikXarajat > 0 && <div style={{fontSize:"11px", color:"#f87171", marginTop:"4px"}}>-{fmt(kunlikXarajat)} xarajat</div>}
              </div>
              <div style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"12px", padding:"16px", textAlign:"center"}}>
                <div style={{fontFamily:"monospace", fontSize:"10px", color:"#6b7280", marginBottom:"8px", letterSpacing:"1px"}}>OYLIK DAROMAD</div>
                <div style={{fontSize:"15px", fontWeight:"600"}}>{fmt(oylik)}</div>
              </div>
            </div>

            {xarajatlar.length > 0 && (
              <div style={{background:"rgba(248,113,113,0.06)", border:"1px solid rgba(248,113,113,0.2)", borderRadius:"12px", padding:"16px", textAlign:"center", marginBottom:"12px"}}>
                <div style={{fontFamily:"monospace", fontSize:"10px", color:"#f87171", marginBottom:"8px", letterSpacing:"1px"}}>JAMI XARAJATLAR</div>
                <div style={{fontSize:"20px", fontWeight:"600", color:"#f87171"}}>-{fmt(oylikXarajat)}</div>
              </div>
            )}

            {soliq > 0 && (
              <div style={{background:"rgba(234,179,8,0.06)", border:"1px solid rgba(234,179,8,0.2)", borderRadius:"12px", padding:"16px", textAlign:"center", marginBottom:"12px"}}>
                <div style={{fontFamily:"monospace", fontSize:"10px", color:"#eab308", marginBottom:"8px", letterSpacing:"1px"}}>SOLIQ ({soliq}%)</div>
                <div style={{fontSize:"20px", fontWeight:"600", color:"#eab308"}}>-{fmt(soliqSumma)}</div>
              </div>
            )}

            <div style={{background: sof >= 0 ? "rgba(34,211,238,0.06)" : "rgba(248,113,113,0.06)", border: "1px solid " + (sof >= 0 ? "rgba(34,211,238,0.2)" : "rgba(248,113,113,0.2)"), borderRadius:"16px", padding:"28px", textAlign:"center"}}>
              <div style={{fontFamily:"monospace", fontSize:"11px", color: sof >= 0 ? "#22d3ee" : "#f87171", marginBottom:"10px", letterSpacing:"2px"}}>SOF DAROMAD (OYLIK)</div>
              <div style={{fontSize:"36px", fontWeight:"700", color: sof >= 0 ? "white" : "#f87171"}}>{fmt(sof)}</div>
              {sof < 0 && <div style={{fontSize:"12px", color:"#f87171", marginTop:"8px"}}>⚠ Xarajatlar daromaddan oshib ketmoqda!</div>}
            </div>
          </div>
        )}

        <div style={{background:"rgba(255,255,255,0.02)", border:"1px solid rgba(234,179,8,0.15)", borderRadius:"16px", padding:"20px", marginTop:"16px"}}>
          <div style={{fontFamily:"monospace", fontSize:"10px", color:"#eab308", marginBottom:"8px", letterSpacing:"2px"}}>⚠ ESLATMA</div>
          <p style={{fontSize:"12px", color:"#6b7280", lineHeight:"1.7", margin:0}}>
            Bu hisoblash taxminiy bo'lib, haqiqiy soliq miqdori farq qilishi mumkin. Aniq ma'lumot uchun soliq mutaxassisiga murojaat qiling.
          </p>
        </div>

      </div>
    </main>
  );
}