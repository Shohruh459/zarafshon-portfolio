"use client";

var loyihalar = [
  {
    id: 1,
    kun: "01",
    nomi: "Qarz Kalkulyatori",
    tavsif: "Oylik to'lov, foiz va jami summani hisoblang",
    kategoriya: "Tool",
    rang: "cyan",
    tayyor: true,
    link: "/loyihalar/qarz-kalkulyatori",
  },
];

export default function Home() {
  return (
    <main style={{minHeight:"100vh", background:"#0a0a0f", color:"white"}}>
      <div style={{maxWidth:"1100px", margin:"0 auto", padding:"64px 24px"}}>

        <div style={{textAlign:"center", marginBottom:"64px"}}>
          <p style={{fontFamily:"monospace", fontSize:"11px", letterSpacing:"6px", color:"#e8b84b", textTransform:"uppercase", marginBottom:"16px"}}>
            Zarafshon Dasturchilari
          </p>
          <h1 style={{fontSize:"48px", fontWeight:"bold", marginBottom:"16px"}}>
            30 Kunlik Loyihalar
          </h1>
          <p style={{color:"#9ca3af", fontFamily:"monospace", fontSize:"14px"}}>
            Har kuni yangi loyiha — ishlatib ko'ring
          </p>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"20px"}}>
          {loyihalar.map(function(l) {
            var cardStyle = {
              background:"#1a1a26",
              border:"1px solid #2a2a3e",
              borderRadius:"16px",
              padding:"24px",
              textDecoration:"none",
              color:"white",
              display:"block",
              transition:"transform 0.2s",
            };
            var badgeStyle = {
              fontSize:"10px",
              padding:"3px 10px",
              borderRadius:"100px",
              fontFamily:"monospace",
              fontWeight:"600",
              background:"#164e63",
              color:"#67e8f9",
            };
            return (
              <a key={l.id} href={l.tayyor ? l.link : "#"} style={cardStyle}
                onMouseEnter={function(e){ e.currentTarget.style.transform="translateY(-4px)"; }}
                onMouseLeave={function(e){ e.currentTarget.style.transform="translateY(0)"; }}
              >
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"16px"}}>
                  <span style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280"}}>KUN {l.kun}</span>
                  <span style={badgeStyle}>{l.kategoriya}</span>
                </div>
                <h2 style={{fontSize:"15px", fontWeight:"600", marginBottom:"8px"}}>{l.nomi}</h2>
                <p style={{color:"#9ca3af", fontSize:"13px", lineHeight:"1.6", marginBottom:"16px"}}>{l.tavsif}</p>
                <div style={{fontFamily:"monospace", fontSize:"11px", color:"#6b7280"}}>
                  {l.tayyor ? "▶ Ko'rish" : "⏳ Tez kunda"}
                </div>
              </a>
            );
          })}
        </div>

        <div style={{textAlign:"center", marginTop:"80px", color:"#374151", fontFamily:"monospace", fontSize:"11px", letterSpacing:"4px"}}>
          ZARAFSHON DASTURCHILARI · 2025
        </div>

      </div>
    </main>
  );
}