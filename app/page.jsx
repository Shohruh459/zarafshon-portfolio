"use client";

var loyihalar = [
  {
    id: 1,
    kun: "01",
    nomi: "Qarz Kalkulyatori",
    tavsif: "Oylik to'lov, foiz va jami summani hisoblang",
    kategoriya: "Tool",
    rang: "#22d3ee",
    tayyor: true,
    link: "/loyihalar/qarz-kalkulyatori",
  },
];

function Karta(props) {
  var l = props.l;
  var tashqi = {
    display: "block",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "28px",
    textDecoration: "none",
    color: "white",
    transition: "all 0.25s ease",
    cursor: l.tayyor ? "pointer" : "default",
    opacity: l.tayyor ? 1 : 0.4,
  };

  var ichki = (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
        <span style={{fontFamily:"monospace", fontSize:"11px", color:"#4b5563", letterSpacing:"2px"}}>KUN {l.kun}</span>
        <span style={{fontSize:"10px", padding:"4px 12px", borderRadius:"100px", fontFamily:"monospace", fontWeight:"600", letterSpacing:"1px", background: l.rang + "22", color: l.rang, border:"1px solid " + l.rang + "44"}}>{l.kategoriya}</span>
      </div>
      <div style={{fontSize:"56px", fontWeight:"800", color:"rgba(255,255,255,0.04)", fontFamily:"monospace", lineHeight:"1", marginBottom:"12px", letterSpacing:"-2px"}}>{l.kun}</div>
      <h2 style={{fontSize:"17px", fontWeight:"600", marginBottom:"10px", lineHeight:"1.3"}}>{l.nomi}</h2>
      <p style={{color:"#6b7280", fontSize:"13px", lineHeight:"1.7", marginBottom:"20px"}}>{l.tavsif}</p>
      <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
        <div style={{width:"6px", height:"6px", borderRadius:"50%", background: l.tayyor ? l.rang : "#374151"}}></div>
        <span style={{fontFamily:"monospace", fontSize:"11px", color: l.tayyor ? l.rang : "#4b5563"}}>{l.tayyor ? "Ko'rish →" : "Tez kunda"}</span>
      </div>
    </div>
  );

  if (l.tayyor) {
    return (
      <a href={l.link} style={tashqi}
        onMouseEnter={function(e){ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.border="1px solid "+l.rang+"55"; e.currentTarget.style.boxShadow="0 20px 40px rgba(0,0,0,0.3)"; }}
        onMouseLeave={function(e){ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.border="1px solid rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow="none"; }}
      >{ichki}</a>
    );
  }
  return <div style={tashqi}>{ichki}</div>;
}

export default function Home() {
  var tayyor = loyihalar.filter(function(l){ return l.tayyor; }).length;

  return (
    <main style={{minHeight:"100vh", background:"#07070f", color:"white", fontFamily:"'Segoe UI', system-ui, sans-serif"}}>

      <div style={{position:"fixed", top:0, left:0, right:0, bottom:0, pointerEvents:"none", zIndex:0, overflow:"hidden"}}>
        <div style={{position:"absolute", top:"-20%", left:"60%", width:"600px", height:"600px", background:"radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", borderRadius:"50%"}}></div>
        <div style={{position:"absolute", top:"40%", left:"-10%", width:"500px", height:"500px", background:"radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)", borderRadius:"50%"}}></div>
      </div>

      <div style={{maxWidth:"1100px", margin:"0 auto", padding:"80px 24px", position:"relative", zIndex:1}}>

        <div style={{textAlign:"center", marginBottom:"80px"}}>
          <div style={{display:"inline-block", background:"rgba(34,211,238,0.08)", border:"1px solid rgba(34,211,238,0.2)", borderRadius:"100px", padding:"6px 20px", marginBottom:"24px"}}>
            <span style={{fontFamily:"monospace", fontSize:"11px", letterSpacing:"4px", color:"#22d3ee", textTransform:"uppercase"}}>Zarafshon Dasturchilari</span>
          </div>
          <h1 style={{fontSize:"clamp(36px, 6vw, 64px)", fontWeight:"800", lineHeight:"1.1", marginBottom:"20px", letterSpacing:"-1px"}}>
            30 Kunlik
            <span style={{display:"block", background:"linear-gradient(135deg, #22d3ee, #a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}> Loyihalar</span>
          </h1>
          <p style={{color:"#6b7280", fontFamily:"monospace", fontSize:"13px", letterSpacing:"1px"}}>Har kuni yangi loyiha · Ishlatib ko'ring · Bepul</p>

          <div style={{display:"flex", justifyContent:"center", gap:"40px", marginTop:"40px"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"28px", fontWeight:"700", color:"white"}}>{tayyor}</div>
              <div style={{fontSize:"11px", color:"#6b7280", fontFamily:"monospace", letterSpacing:"2px", textTransform:"uppercase", marginTop:"4px"}}>Tayyor</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"28px", fontWeight:"700", color:"white"}}>30</div>
              <div style={{fontSize:"11px", color:"#6b7280", fontFamily:"monospace", letterSpacing:"2px", textTransform:"uppercase", marginTop:"4px"}}>Jami</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"28px", fontWeight:"700", color:"white"}}>4</div>
              <div style={{fontSize:"11px", color:"#6b7280", fontFamily:"monospace", letterSpacing:"2px", textTransform:"uppercase", marginTop:"4px"}}>Kategoriya</div>
            </div>
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"20px"}}>
          {loyihalar.map(function(l) {
            return <Karta key={l.id} l={l} />;
          })}
          {Array.from({length:5}).map(function(_, i) {
            return (
              <div key={"empty-"+i} style={{background:"rgba(255,255,255,0.01)", border:"1px dashed rgba(255,255,255,0.05)", borderRadius:"20px", padding:"28px", opacity:0.3, display:"flex", alignItems:"center", justifyContent:"center", minHeight:"200px"}}>
                <span style={{fontFamily:"monospace", fontSize:"11px", color:"#374151", letterSpacing:"2px"}}>TEZDA</span>
              </div>
            );
          })}
        </div>

        <div style={{textAlign:"center", marginTop:"100px", paddingTop:"40px", borderTop:"1px solid rgba(255,255,255,0.05)", fontFamily:"monospace", fontSize:"11px", color:"#374151", letterSpacing:"4px", textTransform:"uppercase"}}>
          Zarafshon Dasturchilari · 2025 · Buxoro, O'zbekiston
        </div>

      </div>
    </main>
  );
}
