"use client";
import { useState } from "react";

export default function QarzKalkulyatori() {
  var [qarz, setQarz] = useState("");
  var [muddat, setMuddat] = useState(12);
  var [foiz, setFoiz] = useState(20);
  var [qoshimcha, setQoshimcha] = useState("");
  var [qoshimchaOy, setQoshimchaOy] = useState(3);

  var P = parseFloat(qarz.replace(/\s/g, "").replace(/[^0-9]/g, "")) || 0;
  var r = foiz / 100 / 12;
  var n = muddat;

  var oylik = 0;
  if (P > 0) {
    oylik = r === 0 ? P / n : P * r * Math.pow(1+r,n) / (Math.pow(1+r,n) - 1);
  }
  var jami = oylik * n;
  var foizSumma = jami - P;

  // Muddatdan oldin to'lov hisoblash
  var qoshimchaPul = parseFloat(qoshimcha.replace(/\s/g, "").replace(/[^0-9]/g, "")) || 0;
  var tejash = 0;
  var yangiMuddat = 0;

  if (P > 0 && qoshimchaPul > 0) {
    // Oddiy jadval — qo'shimchasiz
    var qoldiq1 = P;
    var jami1 = 0;
    for (var i = 1; i <= n; i++) {
      var f1 = qoldiq1 * r;
      var a1 = oylik - f1;
      qoldiq1 = Math.max(0, qoldiq1 - a1);
      jami1 += oylik;
    }

    // Qo'shimcha to'lov bilan jadval
    var qoldiq2 = P;
var jami2 = 0;
var oylar = 0;

for (var j = 1; j <= n; j++) {
  if (qoldiq2 <= 0) break;
  var f2 = qoldiq2 * r;
  var a2 = oylik - f2;
  qoldiq2 = qoldiq2 - a2;
  jami2 += oylik;
  oylar++;

  if (j === qoshimchaOy) {
    if (qoshimchaPul >= qoldiq2) {
      jami2 += qoldiq2;
      qoldiq2 = 0;
      break;
    } else {
      qoldiq2 = qoldiq2 - qoshimchaPul;
      jami2 += qoshimchaPul;
    }
  }
}

tejash = (oylik * n) - jami2;
yangiMuddat = oylar;
  }

  function fmt(num) {
    return Math.round(num).toLocaleString("uz-UZ") + " so'm";
  }

  // Jadval
  var jadval = [];
  if (P > 0) {
    var qoldiqJ = P;
    for (var k = 1; k <= n; k++) {
      var fJ = qoldiqJ * r;
      var aJ = oylik - fJ;
      qoldiqJ = Math.max(0, qoldiqJ - aJ);
      jadval.push({oy: k, oylik: oylik, asosiy: aJ, foizQ: fJ, qoldiq: qoldiqJ});
    }
  }

  var inputStyle = {
    width:"100%", background:"#0d0d18", border:"1px solid #2a2a3e",
    borderRadius:"12px", padding:"12px 16px", color:"white",
    fontSize:"14px", outline:"none", boxSizing:"border-box",
  };
  var cardStyle = {
    background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:"16px", padding:"24px", marginBottom:"16px",
  };

  return (
    <main style={{minHeight:"100vh", background:"#07070f", color:"white", fontFamily:"'Segoe UI', system-ui, sans-serif"}}>
      <div style={{maxWidth:"680px", margin:"0 auto", padding:"60px 24px"}}>

        {/* Back */}
        <a href="/" style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", textDecoration:"none", letterSpacing:"2px", display:"inline-block", marginBottom:"40px"}}>
          ← ORQAGA
        </a>

        {/* Title */}
        <div style={{marginBottom:"40px"}}>
          <div style={{display:"inline-block", background:"rgba(34,211,238,0.08)", border:"1px solid rgba(34,211,238,0.2)", borderRadius:"100px", padding:"4px 16px", marginBottom:"16px"}}>
            <span style={{fontFamily:"monospace", fontSize:"11px", color:"#22d3ee", letterSpacing:"3px"}}>KUN 01 · TOOL</span>
          </div>
          <h1 style={{fontSize:"32px", fontWeight:"700", marginBottom:"8px"}}>Qarz Kalkulyatori</h1>
          <p style={{color:"#6b7280", fontSize:"14px"}}>Oylik to'lov, foiz va muddatdan oldin to'lashni hisoblang</p>
        </div>

        {/* Asosiy input */}
        <div style={cardStyle}>
          <div style={{marginBottom:"24px"}}>
            <label style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", display:"block", marginBottom:"8px", letterSpacing:"1px"}}>QARZ MIQDORI (SO'M)</label>
            <input
              type="text"
              placeholder="Masalan: 5 000 000"
              value={qarz ? parseFloat(qarz.replace(/\s/g,"")).toLocaleString("uz-UZ") : ""}
              onChange={function(e){ setQarz(e.target.value.replace(/\s/g,"").replace(/[^0-9]/g,"")); }}
              style={inputStyle}
            />
          </div>

          <div style={{marginBottom:"24px"}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"8px"}}>
              <label style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", letterSpacing:"1px"}}>MUDDAT</label>
              <span style={{fontFamily:"monospace", fontSize:"11px", color:"#22d3ee"}}>{muddat} oy</span>
            </div>
            <input type="range" min="1" max="60" value={muddat} onChange={function(e){setMuddat(+e.target.value);}} style={{width:"100%", accentColor:"#22d3ee"}} />
            <div style={{display:"flex", justifyContent:"space-between", fontFamily:"monospace", fontSize:"10px", color:"#374151", marginTop:"4px"}}>
              <span>1 oy</span><span>60 oy</span>
            </div>
          </div>

          <div>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"8px"}}>
              <label style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", letterSpacing:"1px"}}>YILLIK FOIZ</label>
              <span style={{fontFamily:"monospace", fontSize:"11px", color:"#22d3ee"}}>{foiz}%</span>
            </div>
            <input type="range" min="0" max="60" step="0.5" value={foiz} onChange={function(e){setFoiz(+e.target.value);}} style={{width:"100%", accentColor:"#22d3ee"}} />
            <div style={{display:"flex", justifyContent:"space-between", fontFamily:"monospace", fontSize:"10px", color:"#374151", marginTop:"4px"}}>
              <span>0%</span><span>60%</span>
            </div>
          </div>
        </div>

        {/* Natijalar */}
        {P > 0 && (
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px", marginBottom:"16px"}}>
            {[
              {nom:"Oylik to'lov", qiymat: fmt(oylik), rang:"white"},
              {nom:"Jami to'lov", qiymat: fmt(jami), rang:"white"},
              {nom:"Foiz summasi", qiymat:"+" + fmt(foizSumma), rang:"#f87171"},
            ].map(function(item) {
              return (
                <div key={item.nom} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"12px", padding:"16px", textAlign:"center"}}>
                  <div style={{fontFamily:"monospace", fontSize:"10px", color:"#6b7280", marginBottom:"8px", letterSpacing:"1px"}}>{item.nom}</div>
                  <div style={{fontSize:"13px", fontWeight:"600", color:item.rang}}>{item.qiymat}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Muddatdan oldin to'lov */}
        {P > 0 && (
          <div style={{...cardStyle, border:"1px solid rgba(167,139,250,0.2)", marginTop:"24px"}}>
            <div style={{display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px"}}>
              <div style={{width:"8px", height:"8px", borderRadius:"50%", background:"#a78bfa"}}></div>
              <h3 style={{fontSize:"14px", fontWeight:"600", margin:0}}>Muddatdan oldin to'lov</h3>
            </div>
            <p style={{fontSize:"12px", color:"#6b7280", marginBottom:"20px", lineHeight:"1.6"}}>
              Qo'shimcha pul to'lash orqali qancha foiz va vaqt tejashingizni hisoblang
            </p>

            <div style={{marginBottom:"16px"}}>
              <label style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", display:"block", marginBottom:"8px", letterSpacing:"1px"}}>QO'SHIMCHA TO'LOV (SO'M)</label>
              <input
                type="text"
                placeholder="Masalan: 1 000 000"
                value={qoshimcha ? parseFloat(qoshimcha.replace(/\s/g,"")).toLocaleString("uz-UZ") : ""}
                onChange={function(e){ setQoshimcha(e.target.value.replace(/\s/g,"").replace(/[^0-9]/g,"")); }}
                style={inputStyle}
              />
            </div>

            <div style={{marginBottom:"20px"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:"8px"}}>
                <label style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", letterSpacing:"1px"}}>NECHANCHI OYDA TO'LANADI</label>
                <span style={{fontFamily:"monospace", fontSize:"11px", color:"#a78bfa"}}>{qoshimchaOy}-oy</span>
              </div>
              <input type="range" min="1" max={muddat} value={qoshimchaOy} onChange={function(e){setQoshimchaOy(+e.target.value);}} style={{width:"100%", accentColor:"#a78bfa"}} />
            </div>

            {qoshimchaPul > 0 && (
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
                <div style={{background:"rgba(167,139,250,0.08)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:"12px", padding:"16px", textAlign:"center"}}>
                  <div style={{fontFamily:"monospace", fontSize:"10px", color:"#a78bfa", marginBottom:"8px", letterSpacing:"1px"}}>FOIZ TEJALADI</div>
                  <div style={{fontSize:"15px", fontWeight:"700", color:"#a78bfa"}}>{fmt(tejash > 0 ? tejash : 0)}</div>
                </div>
                <div style={{background:"rgba(167,139,250,0.08)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:"12px", padding:"16px", textAlign:"center"}}>
                  <div style={{fontFamily:"monospace", fontSize:"10px", color:"#a78bfa", marginBottom:"8px", letterSpacing:"1px"}}>YANGI MUDDAT</div>
                  <div style={{fontSize:"15px", fontWeight:"700", color:"#a78bfa"}}>{yangiMuddat} oy</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Jadval */}
        {P > 0 && jadval.length > 0 && (
          <div style={{...cardStyle, marginTop:"16px", padding:"0", overflow:"hidden"}}>
            <div style={{padding:"20px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
              <span style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", letterSpacing:"1px"}}>
                TO'LOV JADVALI ({n} oy)
              </span>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%", borderCollapse:"collapse", fontSize:"13px"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                    {["Oy","To'lov","Asosiy","Foiz","Qoldiq"].map(function(h) {
                      return <th key={h} style={{padding:"12px 16px", textAlign: h==="Oy"?"left":"right", fontFamily:"monospace", fontSize:"10px", color:"#4b5563", fontWeight:"500", letterSpacing:"1px"}}>{h.toUpperCase()}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {jadval.map(function(row) {
                    return (
                      <tr key={row.oy} style={{borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                        <td style={{padding:"10px 16px", fontFamily:"monospace", color:"#6b7280"}}>{row.oy}</td>
                        <td style={{padding:"10px 16px", textAlign:"right"}}>{Math.round(row.oylik).toLocaleString()}</td>
                        <td style={{padding:"10px 16px", textAlign:"right", color:"#34d399"}}>{Math.round(row.asosiy).toLocaleString()}</td>
                        <td style={{padding:"10px 16px", textAlign:"right", color:"#f87171"}}>{Math.round(row.foizQ).toLocaleString()}</td>
                        <td style={{padding:"10px 16px", textAlign:"right"}}>{Math.round(row.qoldiq).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div style={{...cardStyle, marginTop:"16px", border:"1px solid rgba(234,179,8,0.15)"}}>
          <div style={{fontFamily:"monospace", fontSize:"10px", color:"#eab308", marginBottom:"8px", letterSpacing:"2px"}}>⚠ ESLATMA</div>
          <p style={{fontSize:"12px", color:"#6b7280", lineHeight:"1.7", margin:0}}>
            Zarafshon Dasturchilari kredit olishni tavsiya ham etmaydi, to'sqinlik ham qilmaydi.
            Bu vosita faqat hisoblash imkonini beradi. Moliyaviy qarorlar uchun mutaxassisga murojaat qiling.
          </p>
        </div>

      </div>
    </main>
  );
}