"use client";
import { useState } from "react";

var savollar = [
  {emoji:"🍎", javob:"olma", maslahat:"Qizil meva"},
  {emoji:"🍇", javob:"uzum", maslahat:"Tokda o'sadi"},
  {emoji:"🌙", javob:"oy", maslahat:"Kechasi ko'rinadi"},
  {emoji:"☀️", javob:"quyosh", maslahat:"Issiqlik beradi"},
  {emoji:"🐄", javob:"sigir", maslahat:"Sut beradi"},
  {emoji:"🐑", javob:"qo'y", maslahat:"Juni bor"},
  {emoji:"🏠", javob:"uy", maslahat:"Ichida yashaymiz"},
  {emoji:"🚗", javob:"mashina", maslahat:"Yo'lda yuradi"},
  {emoji:"📚", javob:"kitob", maslahat:"O'qish uchun"},
  {emoji:"✏️", javob:"qalam", maslahat:"Yozish uchun"},
  {emoji:"🌊", javob:"to'lqin", maslahat:"Dengizda bo'ladi"},
  {emoji:"⭐", javob:"yulduz", maslahat:"Kechasi yonadi"},
  {emoji:"🌸", javob:"gul", maslahat:"Bog'da o'sadi"},
  {emoji:"🐟", javob:"baliq", maslahat:"Suvda yashaydi"},
  {emoji:"🍞", javob:"non", maslahat:"Nonvoyxonada sotiladi"},
  {emoji:"🥛", javob:"sut", maslahat:"Sigirdan olinadi"},
  {emoji:"🔑", javob:"kalit", maslahat:"Eshikni ochadi"},
  {emoji:"💧", javob:"suv", maslahat:"Ichimlik"},
  {emoji:"🌳", javob:"daraxt", maslahat:"O'rmonda ko'p"},
  {emoji:"🦅", javob:"burgut", maslahat:"Tog'da uchadi"},
];

function aralashtir(arr) {
  var a = arr.slice();
  for (var i = a.length-1; i > 0; i--) {
    var j = Math.floor(Math.random()*(i+1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

export default function EmojiOyin() {
  var [royhat] = useState(savollar.slice(0,10));
  var [index, setIndex] = useState(0);
  var [javob, setJavob] = useState("");
  var [holat, setHolat] = useState("kutish");
  var [ball, setBall] = useState(0);
  var [maslahatKo, setMaslahatKo] = useState(false);
  var [tugadi, setTugadi] = useState(false);
  var [natijalar, setNatijalar] = useState([]);

  var joriy = royhat[index];

  function tekshir() {
    if (!javob.trim()) return;
    var togri = javob.trim().toLowerCase() === joriy.javob.toLowerCase();
    setHolat(togri ? "togri" : "xato");
    if (togri) setBall(function(b){ return b+1; });
    setNatijalar(function(n){ return n.concat([{emoji: joriy.emoji, javob: joriy.javob, foydalanuvchi: javob.trim(), togri: togri}]); });
  }

  function keyingi() {
    if (index + 1 >= royhat.length) {
      setTugadi(true);
    } else {
      setIndex(function(i){ return i+1; });
      setJavob("");
      setHolat("kutish");
      setMaslahatKo(false);
    }
  }

  function qaytadan() {
    setIndex(0);
    setJavob("");
    setHolat("kutish");
    setBall(0);
    setMaslahatKo(false);
    setTugadi(false);
    setNatijalar([]);
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
    fontSize:"16px",
    outline:"none",
    boxSizing:"border-box",
    textAlign:"center",
  };

  return (
    <main style={{minHeight:"100vh", background:"#07070f", color:"white", fontFamily:"'Segoe UI', system-ui, sans-serif"}}>
      <div style={{maxWidth:"520px", margin:"0 auto", padding:"60px 24px"}}>

        <a href="/" style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", textDecoration:"none", letterSpacing:"2px", display:"inline-block", marginBottom:"40px"}}>
          ← ORQAGA
        </a>

        <div style={{marginBottom:"32px"}}>
          <div style={{display:"inline-block", background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.2)", borderRadius:"100px", padding:"4px 16px", marginBottom:"16px"}}>
            <span style={{fontFamily:"monospace", fontSize:"11px", color:"#f87171", letterSpacing:"3px"}}>KUN 04 · O'YIN</span>
          </div>
          <h1 style={{fontSize:"32px", fontWeight:"700", marginBottom:"8px"}}>Emoji So'z O'yini</h1>
          <p style={{color:"#6b7280", fontSize:"14px"}}>Emojiga qarab o'zbek so'zini toping!</p>
        </div>

        {!tugadi ? (
          <div>
            {/* Progress */}
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
              <span style={{fontFamily:"monospace", fontSize:"12px", color:"#6b7280"}}>{index+1} / {royhat.length}</span>
              <span style={{fontFamily:"monospace", fontSize:"12px", color:"#e8b84b"}}>Ball: {ball}</span>
            </div>
            <div style={{background:"rgba(255,255,255,0.05)", borderRadius:"100px", height:"6px", marginBottom:"32px"}}>
              <div style={{background:"linear-gradient(90deg, #f87171, #e8b84b)", borderRadius:"100px", height:"6px", width:((index+1)/royhat.length*100)+"%", transition:"width 0.3s"}}></div>
            </div>

            {/* Emoji */}
            <div style={{...cardStyle, textAlign:"center", padding:"48px 24px"}}>
              <div style={{fontSize:"120px", lineHeight:"1", marginBottom:"16px"}}>{joriy.emoji}</div>
              {maslahatKo && (
                <div style={{fontFamily:"monospace", fontSize:"12px", color:"#a78bfa", marginTop:"8px"}}>
                  💡 Maslahat: {joriy.maslahat}
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{marginBottom:"16px"}}>
              <input
                type="text"
                placeholder="O'zbek so'zini yozing..."
                value={javob}
                onChange={function(e){ if(holat==="kutish") setJavob(e.target.value); }}
                onKeyDown={function(e){ if(e.key==="Enter" && holat==="kutish") tekshir(); }}
                style={{
                  ...inputStyle,
                  border: holat==="togri" ? "1px solid #34d399" : holat==="xato" ? "1px solid #f87171" : "1px solid #2a2a3e",
                }}
                disabled={holat !== "kutish"}
              />
            </div>

            {/* Natija xabari */}
            {holat === "togri" && (
              <div style={{textAlign:"center", padding:"16px", background:"rgba(52,211,153,0.08)", border:"1px solid rgba(52,211,153,0.2)", borderRadius:"12px", marginBottom:"16px"}}>
                <div style={{fontSize:"32px", marginBottom:"4px"}}>✅</div>
                <div style={{color:"#34d399", fontWeight:"600"}}>To'g'ri!</div>
              </div>
            )}
            {holat === "xato" && (
              <div style={{textAlign:"center", padding:"16px", background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.2)", borderRadius:"12px", marginBottom:"16px"}}>
                <div style={{fontSize:"32px", marginBottom:"4px"}}>❌</div>
                <div style={{color:"#f87171", fontWeight:"600"}}>Noto'g'ri!</div>
                <div style={{color:"#6b7280", fontSize:"13px", marginTop:"4px"}}>To'g'ri javob: <strong style={{color:"white"}}>{joriy.javob}</strong></div>
              </div>
            )}

            {/* Tugmalar */}
            <div style={{display:"grid", gridTemplateColumns: holat==="kutish" ? "1fr 1fr" : "1fr", gap:"12px"}}>
              {holat === "kutish" && (
                <button onClick={function(){ setMaslahatKo(true); }}
                  style={{padding:"14px", background:"rgba(167,139,250,0.1)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:"12px", color:"#a78bfa", fontFamily:"monospace", fontSize:"13px", cursor:"pointer"}}>
                  💡 Maslahat
                </button>
              )}
              {holat === "kutish" ? (
                <button onClick={tekshir}
                  style={{padding:"14px", background:"rgba(248,113,113,0.15)", border:"1px solid rgba(248,113,113,0.3)", borderRadius:"12px", color:"#f87171", fontFamily:"monospace", fontSize:"13px", cursor:"pointer"}}>
                  ✓ TEKSHIR
                </button>
              ) : (
                <button onClick={keyingi}
                  style={{padding:"14px", background:"rgba(34,211,238,0.15)", border:"1px solid rgba(34,211,238,0.3)", borderRadius:"12px", color:"#22d3ee", fontFamily:"monospace", fontSize:"13px", cursor:"pointer"}}>
                  {index+1 >= royhat.length ? "🏆 NATIJA" : "KEYINGI →"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Yakuniy natija */}
            <div style={{...cardStyle, textAlign:"center", padding:"40px 24px", border: ball>=8 ? "1px solid rgba(52,211,153,0.3)" : ball>=5 ? "1px solid rgba(234,179,8,0.3)" : "1px solid rgba(248,113,113,0.3)"}}>
              <div style={{fontSize:"64px", marginBottom:"16px"}}>
                {ball>=8 ? "🏆" : ball>=5 ? "👍" : "💪"}
              </div>
              <div style={{fontSize:"48px", fontWeight:"700", marginBottom:"8px", color: ball>=8 ? "#34d399" : ball>=5 ? "#e8b84b" : "#f87171"}}>
                {ball} / {royhat.length}
              </div>
              <div style={{color:"#6b7280", fontSize:"14px", marginBottom:"8px"}}>
                {ball>=8 ? "Zo'r! Siz haqiqiy bilimdon!" : ball>=5 ? "Yaxshi! Yana mashq qiling!" : "Davom eting, har gal yaxshilanasiz!"}
              </div>
            </div>

            {/* Natijalar ro'yxati */}
            <div style={cardStyle}>
              <div style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280", letterSpacing:"2px", marginBottom:"16px"}}>NATIJALAR</div>
              {natijalar.map(function(n, i) {
                return (
                  <div key={i} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                    <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
                      <span style={{fontSize:"28px"}}>{n.emoji}</span>
                      <span style={{fontSize:"14px", color: n.togri ? "#34d399" : "#f87171"}}>{n.javob}</span>
                    </div>
                    <span style={{fontSize:"20px"}}>{n.togri ? "✅" : "❌"}</span>
                  </div>
                );
              })}
            </div>

            <button onClick={qaytadan}
              style={{width:"100%", padding:"16px", background:"rgba(248,113,113,0.15)", border:"1px solid rgba(248,113,113,0.3)", borderRadius:"12px", color:"#f87171", fontFamily:"monospace", fontSize:"14px", cursor:"pointer", letterSpacing:"1px"}}>
              🔄 QAYTADAN O'YNASH
            </button>
          </div>
        )}

      </div>
    </main>
  );
}