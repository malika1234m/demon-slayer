import { useEffect, useRef } from "react";

interface SwordAnimationProps {
  style: string;
  glow: string;
  isVisible: boolean;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; color: string;
}

const W = 240;
const H = 210;

// Sword geometry constants (relative to origin at cx, cy)
const TIP   = -88;   // blade tip
const GUARD =  22;   // blade-to-guard junction
const GUARD_R = 10;
const HANDLE = 42;   // handle length below guard

const SwordAnimation = ({ style, glow, isVisible }: SwordAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H / 2 + 10;   // center shifted down so blade has room above

    let t = 0;
    let reveal = 0;           // 0→1 "draw the sword" animation
    const pts: Particle[] = [];

    // ── helpers ──────────────────────────────────────────────────────────────
    const hex2rgb = (h: string) => ({
      r: parseInt(h.slice(1,3),16),
      g: parseInt(h.slice(3,5),16),
      b: parseInt(h.slice(5,7),16),
    });
    const C = hex2rgb(glow);

    const emit = (x:number, y:number, vx:number, vy:number, size:number, color:string, life:number) => {
      if (pts.length < 100) pts.push({ x,y,vx,vy,life,maxLife:life,size,color });
    };

    const tickPts = () => {
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.04;
        if (--p.life <= 0) pts.splice(i,1);
      }
    };

    const drawPts = () => {
      for (const p of pts) {
        const a = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.size * a), 0, Math.PI*2);
        ctx.fillStyle = p.color.replace("rgb(","rgba(").replace(")",`,${a})`);
        ctx.fill();
      }
    };

    // Common handle draw (re-used by all styles)
    const drawHandle = (wrapColor: string, wrapAlpha = 0.4) => {
      ctx.fillStyle = "#0e0e0e";
      ctx.fillRect(-4, GUARD + GUARD_R, 8, HANDLE);
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = wrapColor.replace(")",`,${wrapAlpha})`).replace("rgb(","rgba(");
        ctx.fillRect(-5, GUARD + GUARD_R + 3 + i*6, 10, 3.5);
      }
    };

    // ── per-style draw functions ──────────────────────────────────────────────

    const drawWaterSun = () => {
      const blend = (Math.sin(t*1.4)+1)/2;
      const r = Math.round(C.r*(1-blend)+210*blend);
      const g = Math.round(C.g*(1-blend)+55*blend);
      const b = Math.round(C.b*(1-blend)+55*blend);

      const bg = ctx.createLinearGradient(0,TIP,0,GUARD);
      bg.addColorStop(0, `rgba(${r},${g},${b},0.95)`);
      bg.addColorStop(0.45, `rgba(15,15,25,0.92)`);
      bg.addColorStop(1, `rgba(${r},${g},${b},0.75)`);
      ctx.beginPath();
      ctx.moveTo(0,TIP);
      ctx.lineTo(5.5,GUARD-12); ctx.lineTo(6.5,GUARD);
      ctx.lineTo(-6.5,GUARD); ctx.lineTo(-5.5,GUARD-12);
      ctx.closePath();
      ctx.fillStyle = bg; ctx.fill();

      // running gleam
      const gy = TIP + ((t*42)%(GUARD-TIP));
      const gg = ctx.createLinearGradient(0,gy-9,0,gy+9);
      gg.addColorStop(0,"rgba(255,255,255,0)");
      gg.addColorStop(.5,"rgba(255,255,255,0.75)");
      gg.addColorStop(1,"rgba(255,255,255,0)");
      ctx.fillStyle=gg; ctx.fillRect(-5,gy-9,10,18);

      // ripple lines
      for (let i=0;i<4;i++) {
        const ry=TIP+8+((t*32+i*24)%(GUARD-TIP-8));
        ctx.beginPath(); ctx.moveTo(-5,ry);
        ctx.quadraticCurveTo(Math.sin(t*4+i)*5,ry+6,5,ry+12);
        ctx.strokeStyle=`rgba(${r},${g},${b},0.38)`; ctx.lineWidth=0.7; ctx.stroke();
      }
      // tip sparks
      if (Math.random()<0.28) emit(cx,cy+TIP,(Math.random()-.5)*2.5,-Math.random()*2.2,1.5,`rgb(${r},${g},${b})`,28+Math.random()*18);

      // wheel tsuba
      ctx.beginPath(); ctx.arc(0,GUARD,GUARD_R,0,Math.PI*2);
      ctx.strokeStyle=`rgba(${r},${g},${b},0.8)`; ctx.lineWidth=1.8; ctx.stroke();
      for (let i=0;i<8;i++) {
        const a=(i*Math.PI)/4;
        ctx.beginPath(); ctx.moveTo(Math.cos(a)*3,GUARD+Math.sin(a)*3);
        ctx.lineTo(Math.cos(a)*GUARD_R,GUARD+Math.sin(a)*GUARD_R); ctx.stroke();
      }
      drawHandle(`rgb(${r},${g},${b})`);
    };

    const drawThunder = () => {
      const vib = Math.sin(t*28)*(Math.sin(t*5)>0.25?2.8:0.4);
      ctx.translate(vib,0);

      // aura
      const aura = ctx.createRadialGradient(0,(TIP+GUARD)/2,0,0,(TIP+GUARD)/2,35);
      aura.addColorStop(0,`rgba(${C.r},${C.g},${C.b},0.3)`);
      aura.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=aura; ctx.fillRect(-35,TIP-12,70,GUARD-TIP+24);

      // blade
      const bg = ctx.createLinearGradient(0,TIP,0,GUARD);
      bg.addColorStop(0,"rgba(255,255,220,0.98)");
      bg.addColorStop(.4,`rgba(${C.r},${C.g},${C.b},0.92)`);
      bg.addColorStop(1,`rgba(${C.r},${C.g},${C.b},0.7)`);
      ctx.beginPath();
      ctx.moveTo(0,TIP); ctx.lineTo(4.5,GUARD-12); ctx.lineTo(5.5,GUARD);
      ctx.lineTo(-5.5,GUARD); ctx.lineTo(-4.5,GUARD-12); ctx.closePath();
      ctx.fillStyle=bg; ctx.fill();

      // 3 lightning arcs
      for (let arc=0;arc<3;arc++) {
        ctx.beginPath(); ctx.moveTo(0,TIP);
        let ly=TIP;
        while(ly<GUARD){ ly+=5+Math.random()*5; ctx.lineTo((Math.random()-.5)*(9+arc*5)*Math.sin(t*12+arc*2.1),ly); }
        ctx.strokeStyle=`rgba(255,255,180,${0.65-arc*0.18})`; ctx.lineWidth=1.6-arc*0.45; ctx.stroke();
      }
      // spark particles
      if (Math.random()<0.55) {
        const sy=TIP+Math.random()*(GUARD-TIP);
        emit(cx+(Math.random()-.5)*6,cy+sy,(Math.random()-.5)*4.5,(Math.random()-.5)*4.5,1,`rgb(255,255,150)`,14+Math.random()*14);
      }
      // circular guard
      ctx.beginPath(); ctx.arc(0,GUARD,GUARD_R,0,Math.PI*2);
      ctx.fillStyle=`rgba(${C.r},${C.g},${C.b},0.38)`; ctx.fill();
      ctx.strokeStyle="rgba(255,255,180,0.75)"; ctx.lineWidth=1.8; ctx.stroke();
      drawHandle(`rgb(${C.r},${C.g},${C.b})`,0.45);
    };

    const drawBeast = () => {
      const sway = Math.sin(t*3.5)*5.5;
      for (const side of [-1,1]) {
        ctx.save();
        ctx.translate(side*17,0);
        ctx.rotate((sway*side*Math.PI)/180);

        const bg = ctx.createLinearGradient(0,TIP,0,GUARD);
        bg.addColorStop(0,`rgba(${C.r},${C.g},${C.b},0.9)`);
        bg.addColorStop(1,`rgba(${C.r},${C.g},${C.b},0.5)`);
        ctx.beginPath(); ctx.moveTo(0,TIP);
        for (let y=TIP;y<GUARD;y+=5) {
          ctx.lineTo(side*(3.5+Math.sin(y*.4)*2.5),y);
          ctx.lineTo(side*0.5,y+2.5);
        }
        ctx.lineTo(side*0.5,GUARD); ctx.lineTo(-side*3.5,GUARD); ctx.lineTo(-side*3.5,TIP); ctx.closePath();
        ctx.fillStyle=bg; ctx.fill();

        // slash spark
        if (Math.random()<0.1) emit(cx+side*22,cy+TIP+Math.random()*55,side*(1.5+Math.random()*2),(Math.random()-.5)*2,2,`rgb(${C.r},${C.g},${C.b})`,18);

        ctx.fillStyle="#1a1a1a"; ctx.fillRect(-3,GUARD,6,HANDLE);
        for (let i=0;i<5;i++) { ctx.fillStyle=`rgba(${C.r},${C.g},${C.b},0.35)`; ctx.fillRect(-4,GUARD+3+i*7,8,4); }
        ctx.restore();
      }
    };

    const drawWater = () => {
      const sway = Math.sin(t*1.2)*1.5;
      ctx.rotate((sway*Math.PI)/180);

      const aura = ctx.createRadialGradient(0,0,0,0,0,42);
      aura.addColorStop(0,`rgba(${C.r},${C.g},${C.b},0.18)`); aura.addColorStop(1,"transparent");
      ctx.fillStyle=aura; ctx.fillRect(-42,TIP-12,84,GUARD-TIP+24);

      const bg = ctx.createLinearGradient(-7,0,7,0);
      bg.addColorStop(0,`rgba(${C.r},${C.g},${C.b},0.6)`);
      bg.addColorStop(.5,"rgba(190,225,255,0.97)");
      bg.addColorStop(1,`rgba(${C.r},${C.g},${C.b},0.6)`);
      ctx.beginPath();
      ctx.moveTo(0,TIP); ctx.lineTo(5.5,GUARD-12); ctx.lineTo(6.5,GUARD);
      ctx.lineTo(-6.5,GUARD); ctx.lineTo(-5.5,GUARD-12); ctx.closePath();
      ctx.fillStyle=bg; ctx.fill();

      // flowing ripples
      for (let i=0;i<5;i++) {
        const ry=TIP+5+((t*35+i*22)%(GUARD-TIP));
        ctx.beginPath(); ctx.moveTo(-5,ry);
        ctx.quadraticCurveTo(Math.sin(t*3+i*1.5)*5,ry+7,5,ry+13);
        ctx.strokeStyle=`rgba(190,225,255,${0.28+Math.sin(t*2+i)*0.1})`; ctx.lineWidth=0.9; ctx.stroke();
      }
      if (Math.random()<0.22) emit(cx+(Math.random()-.5)*7,cy+TIP+Math.random()*40,(Math.random()-.5)*1.5,Math.random()*1.5+0.5,1.3,`rgb(${C.r},${C.g},${C.b})`,38);

      // rotating hexagon tsuba
      ctx.save(); ctx.translate(0,GUARD); ctx.rotate(t*0.35);
      ctx.beginPath();
      for (let i=0;i<6;i++) { const a=(i*Math.PI)/3; const x=Math.cos(a)*GUARD_R,y=Math.sin(a)*GUARD_R; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }
      ctx.closePath(); ctx.strokeStyle=`rgba(${C.r},${C.g},${C.b},0.82)`; ctx.lineWidth=1.8; ctx.stroke();
      ctx.restore();
      drawHandle(`rgb(${C.r},${C.g},${C.b})`,0.32);
    };

    const drawInsect = () => {
      const sway = Math.sin(t*2)*2;
      ctx.rotate((sway*Math.PI)/180);

      ctx.beginPath();
      ctx.moveTo(0,TIP); ctx.lineTo(2,GUARD-18); ctx.lineTo(3.5,GUARD);
      ctx.lineTo(-3.5,GUARD); ctx.lineTo(-2,GUARD-18); ctx.closePath();
      ctx.fillStyle=`rgba(${C.r},${C.g},${C.b},0.87)`; ctx.fill();

      // poison drip
      const dy=TIP+((t*22)%(GUARD-TIP+30));
      const da=Math.sin((dy-TIP)/(GUARD-TIP)*Math.PI);
      ctx.beginPath(); ctx.arc(0,dy,2.2,0,Math.PI*2);
      ctx.fillStyle=`rgba(140,55,255,${da*0.72})`; ctx.fill();

      if (Math.random()<0.28) emit(cx+(Math.random()-.5)*4.5,cy+TIP+Math.random()*28,(Math.random()-.5)*1.5,-Math.random()*1.8,1.6,"rgb(150,70,255)",32+Math.random()*20);

      // butterfly tsuba wings
      for (const side of [-1,1]) {
        ctx.save(); ctx.translate(side*9,GUARD); ctx.rotate(Math.sin(t*1.6)*0.18);
        ctx.beginPath(); ctx.ellipse(0,0,8,4.5,side*25*Math.PI/180,0,Math.PI*2);
        ctx.fillStyle=`rgba(${C.r},${C.g},${C.b},${0.28+Math.sin(t*2)*0.1})`; ctx.fill();
        ctx.strokeStyle=`rgba(${C.r},${C.g},${C.b},0.65)`; ctx.lineWidth=0.9; ctx.stroke();
        ctx.restore();
      }
      drawHandle(`rgb(${C.r},${C.g},${C.b})`,0.32);
    };

    const drawFlame = () => {
      const sway = Math.sin(t*1.8)*1.6;
      ctx.rotate((sway*Math.PI)/180);

      const bg = ctx.createLinearGradient(0,TIP,0,GUARD);
      bg.addColorStop(0,"rgba(255,245,80,0.98)");
      bg.addColorStop(.3,"rgba(255,160,28,0.95)");
      bg.addColorStop(.65,`rgba(${C.r},${C.g},${C.b},0.9)`);
      bg.addColorStop(1,"rgba(175,28,18,0.88)");
      ctx.beginPath();
      ctx.moveTo(0,TIP); ctx.lineTo(6.5,GUARD-10); ctx.lineTo(7.5,GUARD);
      ctx.lineTo(-7.5,GUARD); ctx.lineTo(-6.5,GUARD-10); ctx.closePath();
      ctx.fillStyle=bg; ctx.fill();

      // heat gleam
      const gy=TIP+((t*52)%(GUARD-TIP));
      const gg=ctx.createLinearGradient(0,gy-10,0,gy+10);
      gg.addColorStop(0,"rgba(255,255,200,0)"); gg.addColorStop(.5,"rgba(255,255,200,0.82)"); gg.addColorStop(1,"rgba(255,255,200,0)");
      ctx.fillStyle=gg; ctx.fillRect(-6,gy-10,12,20);

      // rising flame particles from tip + edge embers
      if (Math.random()<0.55) emit(cx+(Math.random()-.5)*11,cy+TIP+Math.random()*16,(Math.random()-.5)*2.2,-(1.8+Math.random()*2.2),1.6+Math.random()*.8,`rgb(255,${95+Math.floor(Math.random()*120)},18)`,22+Math.random()*20);
      if (Math.random()<0.35) {
        const ey=TIP+Math.random()*(GUARD-TIP);
        emit(cx+(Math.random()>.5?7:-7),cy+ey,(Math.random()-.5)*3,-(0.6+Math.random()),1,"rgb(255,148,28)",18);
      }

      // wavy flame-star tsuba
      ctx.beginPath();
      for (let i=0;i<16;i++) {
        const a=(i*Math.PI)/8;
        const r=(i%2===0?GUARD_R+3.5:GUARD_R-2)+Math.sin(a*3+t*4)*1.8;
        i===0?ctx.moveTo(Math.cos(a)*r,GUARD+Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,GUARD+Math.sin(a)*r);
      }
      ctx.closePath();
      ctx.fillStyle=`rgba(${C.r},${C.g},${C.b},0.45)`; ctx.fill();
      ctx.strokeStyle="rgba(255,200,48,0.82)"; ctx.lineWidth=1.2; ctx.stroke();
      drawHandle(`rgb(${C.r},${C.g},${C.b})`,0.48);
    };

    const drawWhip = () => {
      const amp = 16;
      // glow trail
      ctx.beginPath(); ctx.moveTo(0,TIP);
      for (let y=TIP;y<GUARD;y+=2) {
        const p=(y-TIP)/(GUARD-TIP);
        ctx.lineTo(Math.sin(y*.07+t*3.8)*(amp*p),y);
      }
      ctx.strokeStyle=`rgba(${C.r},${C.g},${C.b},0.22)`; ctx.lineWidth=10; ctx.lineCap="round"; ctx.stroke();

      // main blade
      ctx.beginPath(); ctx.moveTo(0,TIP);
      for (let y=TIP;y<GUARD;y+=2) {
        const p=(y-TIP)/(GUARD-TIP);
        ctx.lineTo(Math.sin(y*.07+t*3.8)*(amp*p),y);
      }
      ctx.strokeStyle=`rgba(${C.r},${C.g},${C.b},0.92)`; ctx.lineWidth=3; ctx.stroke();

      // sparkles along whip
      for (let i=0;i<4;i++) {
        const sy=TIP+((t*28+i*22)%(GUARD-TIP));
        const p=(sy-TIP)/(GUARD-TIP);
        const sx=Math.sin(sy*.07+t*3.8)*(amp*p);
        ctx.beginPath(); ctx.arc(sx,sy,1.8,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${0.55+Math.sin(t*5+i)*.3})`; ctx.fill();
      }
      if (Math.random()<0.22) {
        const py=TIP+Math.random()*(GUARD-TIP); const pp=(py-TIP)/(GUARD-TIP);
        const px=Math.sin(py*.07+t*3.8)*(amp*pp);
        emit(cx+px,cy+py,(Math.random()-.5)*2.8,-Math.random()*2.2,1.6,`rgb(${C.r},${C.g},${C.b})`,28);
      }
      ctx.beginPath(); ctx.arc(0,GUARD,GUARD_R,0,Math.PI*2);
      ctx.fillStyle=`rgba(${C.r},${C.g},${C.b},0.32)`; ctx.fill();
      ctx.strokeStyle=`rgba(${C.r},${C.g},${C.b},0.72)`; ctx.lineWidth=1.6; ctx.stroke();
      drawHandle(`rgb(${C.r},${C.g},${C.b})`,0.42);
    };

    const drawMist = () => {
      const sway = Math.sin(t*.9)*2;
      ctx.rotate((sway*Math.PI)/180);

      const op = 0.5+Math.sin(t*1.9)*0.22;
      const bg = ctx.createLinearGradient(-7,0,7,0);
      bg.addColorStop(0,`rgba(${C.r},${C.g},${C.b},${op*.65})`);
      bg.addColorStop(.5,`rgba(255,255,255,${op})`);
      bg.addColorStop(1,`rgba(${C.r},${C.g},${C.b},${op*.65})`);
      ctx.beginPath();
      ctx.moveTo(0,TIP); ctx.lineTo(5.5,GUARD-10); ctx.lineTo(6,GUARD);
      ctx.lineTo(-6,GUARD); ctx.lineTo(-5.5,GUARD-10); ctx.closePath();
      ctx.fillStyle=bg; ctx.fill();

      if (Math.random()<0.38) emit(cx+(Math.random()-.5)*32,cy+TIP+Math.random()*(GUARD-TIP),(Math.random()-.5)*1.5,-Math.random()*.9,3.5+Math.random()*3.5,`rgb(${C.r},${C.g},${C.b})`,55+Math.random()*30);

      ctx.beginPath(); ctx.arc(0,GUARD,GUARD_R,0,Math.PI*2);
      ctx.strokeStyle=`rgba(${C.r},${C.g},${C.b},${0.38+Math.sin(t)*.22})`; ctx.lineWidth=1.6; ctx.stroke();
      drawHandle(`rgb(${C.r},${C.g},${C.b})`,0.2+Math.sin(t)*.1);
    };

    // ── main loop ─────────────────────────────────────────────────────────────
    const drawFrame = () => {
      ctx.clearRect(0,0,W,H);

      // background radial glow
      const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,90);
      bg.addColorStop(0,`rgba(${C.r},${C.g},${C.b},${0.08+Math.sin(t*2)*.04})`);
      bg.addColorStop(1,"transparent");
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      // reveal clip: blade draws from handle upward
      const totalLen = (GUARD-TIP) + GUARD_R + HANDLE;
      const revealY  = cy + GUARD + GUARD_R + HANDLE - reveal * totalLen;

      ctx.save();
      ctx.beginPath(); ctx.rect(0, revealY, W, H); ctx.clip();

      ctx.save();
      ctx.translate(cx, cy);
      switch(style) {
        case "Water / Sun": drawWaterSun(); break;
        case "Thunder":     drawThunder();  break;
        case "Beast":       drawBeast();    break;
        case "Water":       drawWater();    break;
        case "Insect":      drawInsect();   break;
        case "Flame":       drawFlame();    break;
        case "Love":        drawWhip();     break;
        case "Mist":        drawMist();     break;
        default:            drawWater();
      }
      ctx.restore();
      ctx.restore(); // unclip

      drawPts();
    };

    const loop = () => {
      t      += 0.018;
      reveal  = Math.min(1, reveal + 0.024);
      tickPts();
      drawFrame();
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [style, glow, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="w-[240px] h-[210px]"
      style={{ imageRendering: "auto" }}
    />
  );
};

export default SwordAnimation;
