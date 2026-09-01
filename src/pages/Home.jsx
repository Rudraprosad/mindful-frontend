import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── PALETTE ─────────────── */
const BG       = "#416343ff";   // deep professional forest green
const TEXT      = "#f4f9f1";  // off-white
const TEXT_MID  = "#c6dabb";  // light sage mid
const TEXT_MUTED= "#8dae7b";  // muted green
const ACCENT    = "#bde089";  // bright lime accent
const ACCENT_DARK = "#0f1710"; // darker green for marquee
const BORDER    = "rgba(255,255,255,0.08)";
const BORDER2   = "rgba(255,255,255,0.04)";

/* ─────────────── DATA ─────────────── */
const stats = [
  { value: "2/3", label: "Students have a mental health condition", source: "Randstad, 2023" },
  { value: "39%", label: "Have considered leaving their course", source: "Randstad, 2023" },
  { value: "90%", label: "Say cost-of-living crisis impacts mental health", source: "NUS, 2022" },
  { value: "31%", label: "Of 16–24-year-olds show evidence of anxiety/depression", source: "ONS, 2020" },
];

const topIssues = [
  { label: "Academic Stress", pct: 59 },
  { label: "Financial Pressures", pct: 43 },
  { label: "Cost of Living", pct: 42 },
  { label: "Health Conditions", pct: 38 },
];

const conditionCards = [
  { name: "Anxiety", icon: "🌊", desc: "Persistent feelings of tension and fear that prevent everyday tasks. May include panic attacks or phobias." },
  { name: "OCD", icon: "🔁", desc: "Recurrent, compulsive thoughts and behaviours — e.g. excessive hand washing due to contamination fears." },
  { name: "Depression", icon: "🌧️", desc: "Deep sadness lasting weeks or months. In severe cases may involve suicidal thoughts." },
  { name: "Bipolar Disorder", icon: "⚡", desc: "Mood swings between extreme low depressive states and high or elated episodes." },
  { name: "Psychosis", icon: "🌀", desc: "Episodes where a person appears to lose touch with reality — often a feature of schizophrenia." },
  { name: "Eating Disorders", icon: "🌱", desc: "Conditions like anorexia and bulimia, closely linked to underlying mental health struggles." },
];

const actionSteps = [
  { icon: "🌙", text: "Better sleep routine" },
  { icon: "☀️", text: "Time outdoors in the sun" },
  { icon: "🏠", text: "Tidy your environment" },
  { icon: "🎮", text: "Do something fun" },
  { icon: "🥗", text: "Improve your diet" },
  { icon: "🏃", text: "Work out or play sport" },
  { icon: "👥", text: "Spend time with loved ones" },
  { icon: "🧘", text: "Take alone time when needed" },
];

const warningQuestions = [
  "Have you been withdrawn and not feeling like socialising? ",
  "Have you been isolating yourself from friends and family? ",
  "Have you been disappointed in your performance at work, university or any extracurricular activities you do? ",
  "Have you experienced a significant loss or increase in appetite?",
  "Have you noticed that you’re sleeping more or less than usual?",
  "Have you found it more of a struggle to take care of your appearance? ",
];

const talkTips = [
  { icon: "📍", heading: "Where to Talk", tips: ["Do something relaxing -  it’s easier to talk openly when the focus isn’t just on the conversation. Get outside, go for a walk or invite your friend out for a drink. ", "Choose somewhere quiet & private - find somewhere private where you won’t be interrupted. This could be somewhere familiar where you can have a relaxed and informal conversation."] },
  { icon: "⏰", heading: "When to Talk", tips: ["One-to-one -  it might be intimidating or uncomfortable to talk in a large group, so try to talk to them individually to offer support without overwhelming them.", "When you both have enough time - the last thing you want to do is have to walk out on an important conversation, so make sure that you’ve enough time to talk should your friend decide to share. ", "The time is right -  it’s best to avoid difficult times of intense stress, waiting instead for times when both you and your friend are comfortable and relaxed. "] },
  { icon: "💬", heading: "How to Act", tips: ["Be prepared — know what to say", "Consider your body language", "Respect boundaries & privacy", "Focus on thoughts and feelings rather than behaviours", "Respect boundaries", "Don’t worry about not understanding", "Ask open questions", "Actively listen and reflect on what the other person is saying"] },
];

/* ─────────────── HELPERS ─────────────── */
function splitWords(text) {
  return text.split(" ").map((w, i) => (
    <span key={i} className="split-word" style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
      <span className="split-word-inner" style={{ display: "inline-block" }}>{w}</span>
    </span>
  ));
}

/* ─────────────── COMPONENT ─────────────── */
export default function Home() {
  const wrapperRef    = useRef(null);
  const heroRef       = useRef(null);
  const titleRef      = useRef(null);
  const subtitleRef   = useRef(null);
  const statsRef      = useRef(null);
  const tunnelRef     = useRef(null);
  const marqueeRef    = useRef(null);
  const introTextRef  = useRef(null);
  const factorsRef    = useRef(null);
  const actionRef     = useRef(null);
  const talkRef       = useRef(null);
  const ctaRef        = useRef(null);

  useEffect(() => {
    /* ── Lenis Smooth Scroll ── */
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* ── Hero word split entrance ── */
    const titleWords = titleRef.current?.querySelectorAll(".split-word-inner");
    const subWords   = subtitleRef.current?.querySelectorAll(".split-word-inner");
    if (titleWords) {
      gsap.fromTo(titleWords,
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.1, stagger: 0.07, ease: "power4.out", delay: 0.2 }
      );
    }
    if (subWords) {
      gsap.fromTo(subWords,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.9, stagger: 0.04, ease: "power3.out", delay: 1.0 }
      );
    }
    gsap.fromTo(".hero-cta",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: "power3.out" }
    );

    /* ── Persistent grid parallax — scrub y across entire page ── */
    gsap.to(".page-grid", {
      y: "15%",
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    /* ── Scrub intro text (word colour reveal) ── */
    const introWords = introTextRef.current?.querySelectorAll(".scrub-word");
    if (introWords?.length) {
      gsap.fromTo(introWords,
        { color: "rgba(30,45,30,0.18)" },
        {
          color: "rgba(30,45,30,0.92)",
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: introTextRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    }

    /* ── Stats 3D pop-in ── */
    gsap.fromTo(".stat-card",
      { y: 70, opacity: 0, scale: 0.85, rotateX: 18 },
      {
        y: 0, opacity: 1, scale: 1, rotateX: 0,
        duration: 0.8, stagger: 0.12, ease: "back.out(1.4)",
        scrollTrigger: { trigger: statsRef.current, start: "top 70%" },
      }
    );

    /* ── Bar fills ── */
    gsap.fromTo(".bar-fill",
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1.4, stagger: 0.15, ease: "expo.out",
        transformOrigin: "left center",
        scrollTrigger: { trigger: ".issues-chart", start: "top 75%" },
      }
    );

    /* ── 3D Tunnel card fly-in ── */
    const cards = document.querySelectorAll(".tunnel-card");
    cards.forEach((card, i) => {
      const total = cards.length;
      gsap.fromTo(card,
        { z: -700 - i * 160, rotateX: 18 + i * 4, rotateY: (i % 2 === 0 ? -1 : 1) * (7 + i * 3), opacity: 0, scale: 0.72 },
        {
          z: 0, rotateX: 0, rotateY: 0, opacity: 1, scale: 1, ease: "none",
          scrollTrigger: {
            trigger: tunnelRef.current,
            start: `${(i / total) * 60}% center`,
            end: `${((i + 1) / total) * 60 + 20}% center`,
            scrub: 1.5,
          },
        }
      );
    });

    /* ── Marquee loop ── */
    const marqueeInner = marqueeRef.current?.querySelector(".marquee-inner");
    if (marqueeInner) {
      gsap.to(marqueeInner, { x: "-50%", ease: "none", duration: 22, repeat: -1 });
    }

    /* ── Factors 3D slide-in ── */
    gsap.fromTo(".factor-left",
      { x: -80, opacity: 0, rotateY: 14 },
      { x: 0, opacity: 1, rotateY: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: factorsRef.current, start: "top 75%" } }
    );
    gsap.fromTo(".factor-right",
      { x: 80, opacity: 0, rotateY: -14 },
      { x: 0, opacity: 1, rotateY: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: factorsRef.current, start: "top 75%" } }
    );

    /* ── Action grid stagger ── */
    gsap.fromTo(".action-item",
      { y: 55, opacity: 0, rotateX: 22, scale: 0.82 },
      {
        y: 0, opacity: 1, rotateX: 0, scale: 1,
        duration: 0.6, stagger: { each: 0.07, grid: "auto", from: "start" }, ease: "back.out(1.7)",
        scrollTrigger: { trigger: actionRef.current, start: "top 70%" },
      }
    );

    /* ── Talking cards ── */
    gsap.fromTo(".talk-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: talkRef.current, start: "top 75%" } }
    );

    /* ── Warning list ── */
    gsap.fromTo(".warning-bar",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, stagger: 0.08, transformOrigin: "left center",
        scrollTrigger: { trigger: ".warning-list", start: "top 75%" } }
    );
    gsap.fromTo(".warning-text",
      { x: -28, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.1,
        scrollTrigger: { trigger: ".warning-list", start: "top 75%" } }
    );

    /* ── CTA scale-in ── */
    gsap.fromTo(".cta-content",
      { scale: 0.82, opacity: 0, y: 60 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 75%" } }
    );

    /* ── Generic section reveals ── */
    gsap.utils.toArray(".section-reveal").forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    });

    /* ── Mouse parallax on hero orbs ── */
    const onMouseMove = (e) => {
      const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      gsap.to(".hero-orb-1", { x: dx * 28, y: dy * 18, duration: 1, ease: "power2.out" });
      gsap.to(".hero-orb-2", { x: dx * -18, y: dy * -14, duration: 1.2, ease: "power2.out" });
      gsap.to(".hero-orb-3", { x: dx * 12, y: dy * 9, duration: 0.9, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  /* ─── Shared section padding ─── */
  const sec = { padding: "110px 24px", position: "relative", overflow: "hidden" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;600;700;800;900&display=swap');
      
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .home-page {
          font-family: 'Inter', sans-serif;
          background: ${BG};
          color: ${TEXT};
          overflow-x: hidden;
          position: relative;
        }

        /* ── Full-page persistent perspective grid ── */
        .page-grid-wrapper {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          perspective: 700px;
        }
        .page-grid {
          width: 220%;
          height: 220%;
          position: absolute;
          top: -10%;
          left: -60%;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.13) 1px, transparent 1px);
          background-size: 72px 72px;
          transform: rotateX(55deg);
          transform-origin: center top;
          will-change: transform;
        }

        /* ── Section z-index above grid ── */
        .home-page > * { position: relative; z-index: 1; }

        /* ── Font ── */
        .font-display { font-family: 'Outfit', sans-serif; }

        /* ── Glass cards ── */
        .glass {
          background: rgba(33, 31, 31, 0.42);
          border: 1px solid rgba(255,255,255,0.7);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .glass-deep {
          background: rgba(255,255,255,0.22);
          border: 1px solid rgba(45,80,22,0.14);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        /* ── Hover ── */
        .hover-3d {
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease;
        }
        .hover-3d:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.15), 0 0 20px rgba(189,224,137,0.05);
        }

        /* ── Marquee ── */
        .marquee-track { overflow: hidden; white-space: nowrap; }
        .marquee-inner { display: inline-flex; gap: 0; will-change: transform; }
        .marquee-item {
          display: inline-flex; align-items: center; gap: 30px;
          padding: 0 36px;
          font-size: clamp(1.4rem, 3vw, 2.6rem);
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
          white-space: nowrap;
          color: ${TEXT_MID};
        }
        .marquee-dot { width: 9px; height: 9px; border-radius: 50%; background: ${BG}; opacity: 0.7; }

        /* ── Gradient text ── */
        .grad {
          background: linear-gradient(135deg, #181916ff 0%, #a8e060 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Orbs ── */
        .orb { border-radius: 50%; filter: blur(90px); position: absolute; pointer-events: none; }

        /* ── Section label ── */
        .section-label {
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: ${TEXT_MUTED}; font-weight: 700; margin-bottom: 14px;
          display: flex; align-items: center; gap: 10px;
        }
        .section-label::before {
          content: ''; width: 22px; height: 2px; background: ${TEXT_MUTED}; border-radius: 2px;
        }

        /* ── Scrub words ── */
        .scrub-word { display: inline; }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.4); border-radius: 10px; }

        /* ── Animations ── */
        @keyframes bounce-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
        .bounce { animation: bounce-y 2s ease-in-out infinite; }

        @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
        .float { animation: float 5s ease-in-out infinite; }

        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .spin-slow { animation: spin-slow 28s linear infinite; }

        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
      `}</style>

      <div ref={wrapperRef} className="home-page">
        {/* ── Full-page perspective grid (fixed behind all content) ── */}
        <div className="page-grid-wrapper">
          <div className="page-grid" />
        </div>

        {/* ════════════════════════════════
            HERO
        ════════════════════════════════ */}
        <section ref={heroRef} style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden", background: "transparent" }}>
          {/* Soft glow orbs — kept subtle so grid shows through */}
          <div className="orb hero-orb-1" style={{ width: 480, height: 480, background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", top: "-8%", right: "8%", zIndex: 0 }} />
          <div className="orb hero-orb-2" style={{ width: 340, height: 340, background: "radial-gradient(circle, rgba(189,224,137,0.08) 0%, transparent 70%)", bottom: "5%", left: "5%", zIndex: 0 }} />
          <div className="orb hero-orb-3" style={{ width: 240, height: 240, background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)", top: "35%", left: "20%", zIndex: 0 }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: 880, textAlign: "center" }}>


            {/* Headline */}
            <h1 ref={titleRef} className="font-display" style={{ fontSize: "clamp(1rem, 8vw, 2rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.04em", marginBottom: 30, marginTop: 20, color: TEXT }}>
              {splitWords("An online resource for spreading awareness about mental health ")}
            </h1>

            {/* Sub */}
            <p ref={subtitleRef} style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: TEXT_MID, lineHeight: 1.85, maxWidth: 580, margin: "0 auto 52px" }}>
              {splitWords("Two thirds of students experience a mental health condition. You are not alone — and taking the first step makes all the difference.")}
            </p>

            {/* CTAs */}
            <div className="hero-cta" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", opacity: 0 }}>
              <Link to="/phase"
                className="md:hidden"
                style={{ display: "inline-block", background: ACCENT, color: "#fff", padding: "17px 44px", borderRadius: 100, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", letterSpacing: "0.02em", transition: "all 0.3s ease", boxShadow: `0 8px 32px rgba(45,80,22,0.35)` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(45,80,22,0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 32px rgba(45,80,22,0.35)`; }}
              >Know Your Mental Health →</Link>

              <a href="#intro"
                style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", color: TEXT, padding: "17px 44px", borderRadius: 100, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", border: `1px solid rgba(255,255,255,0.1)`, backdropFilter: "blur(12px)", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
              >Explore ↓</a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            MARQUEE TICKER
        ════════════════════════════════ */}
        <div ref={marqueeRef} className="marquee-track" style={{ background: ACCENT_DARK, padding: "20px 0" }}>
          <div className="marquee-inner">
            {[...Array(2)].map((_, gi) => (
              <span key={gi} className="marquee-item">
                Mental Health Awareness <span className="marquee-dot" />
                2/3 Students Affected <span className="marquee-dot" />
                You Are Not Alone <span className="marquee-dot" />
                WHO: Mental Health Is A Human Right <span className="marquee-dot" />
                39% Considered Leaving University <span className="marquee-dot" />
                90% Impacted By Cost of Living <span className="marquee-dot" />
                Take The First Step Today <span className="marquee-dot" />
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════
            SCRUB TEXT INTRO
        ════════════════════════════════ */}
        <section id="intro" style={{ ...sec, background: "transparent" }}>
          <div style={{ maxWidth: 980, margin: "0 auto" }}>
            <div className="section-reveal section-label">Introduction</div>
            <p ref={introTextRef} className="font-display" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)", fontWeight: 700, lineHeight: 1.55, letterSpacing: "-0.02em", width: "100%", whiteSpace: "normal", wordBreak: "break-word" }}>
              {["Mental","health","is","a","state","of","wellbeing","that","enables",
               "people","to","cope","with","the","stresses","of","life,","realise","their","abilities,","and","contribute","to","their","community.","It","is","a","basic","human","right.","Mental","health","problems","can","happen","to","anybody."].map((w, i) => (
                <span key={i} className="scrub-word" style={{ color: `rgba(240,247,234,0.15)`, marginRight: "0.28em" }}>{w}</span>
              ))}
            </p>
            <p className="section-reveal" style={{ marginTop: 40, color: TEXT_MUTED, fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 640, borderLeft: `3px solid rgba(45,80,22,0.25)`, paddingLeft: 20 }}>
              — World Health Organisation, 2022. We all have mental health and can find ways to improve it, just as we can improve our physical health. Athletes don't stop training even when they are already fit.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════
            STATS
        ════════════════════════════════ */}
        <section ref={statsRef} style={{ ...sec, background: "transparent" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="section-reveal section-label" style={{ justifyContent: "center" }}>By The Numbers</div>
            <h2 className="section-reveal font-display" style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 800, marginBottom: 64, letterSpacing: "-0.03em", color: TEXT }}>
              The Scale of the Crisis
            </h2>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20, perspective: "1000px" }}>
              {stats.map((s, i) => (
                <div key={i} className="stat-card glass hover-3d" style={{ borderRadius: 22, padding: "38px 28px", textAlign: "center" }}>
                  <div className="font-display" style={{ fontSize: "3.8rem", fontWeight: 900, letterSpacing: "-0.04em", background: `linear-gradient(135deg, ${ACCENT} 0%, #4a8a30 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1, marginBottom: 16 }}>{s.value}</div>
                  <p style={{ color: TEXT_MID, fontSize: "0.93rem", lineHeight: 1.65, marginBottom: 12 }}>{s.label}</p>
                  <span style={{ fontSize: "0.72rem", color: ACCENT, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.source}</span>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="issues-chart glass" style={{ marginTop: 44, borderRadius: 24, padding: "40px 44px" }}>
              <h3 className="font-display" style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: 36, letterSpacing: "-0.02em", color: TEXT }}>
                Top Issues Impacting Students <span style={{ color: ACCENT, fontWeight: 600, fontSize: "0.95rem" }}>(Randstad, 2023)</span>
              </h3>
              {topIssues.map((item, i) => (
                <div key={i} style={{ marginBottom: 26 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ color: TEXT_MID, fontWeight: 600, fontSize: "0.95rem" }}>{item.label}</span>
                    <span className="font-display" style={{ color: ACCENT, fontWeight: 900, fontSize: "1.05rem" }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 7, background: `rgba(45,80,22,0.1)`, borderRadius: 100, overflow: "hidden" }}>
                    <div className="bar-fill" style={{ height: "100%", width: `${item.pct}%`, background: `linear-gradient(90deg, ${ACCENT}, #6aad44)`, borderRadius: 100 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            3D TUNNEL — Condition Cards
        ════════════════════════════════ */}
        <section ref={tunnelRef} style={{ ...sec, background: "transparent" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="section-reveal section-label" style={{ justifyContent: "center" }}>Mental Ill Health</div>
            <h2 className="section-reveal font-display" style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.03em", color: TEXT }}>
              When Mental Health Declines
            </h2>
            <p className="section-reveal" style={{ textAlign: "center", color: TEXT_MUTED, fontSize: "1rem", maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.75 }}>
              Mental ill health ranges from feeling a bit down to severe conditions. Most people's mental health rises and falls — this is entirely normal.
            </p>

            {/* Spectrum bar */}
            <div className="section-reveal" style={{ background: `linear-gradient(90deg, rgba(106,173,68,0.3), ${ACCENT})`, borderRadius: 100, height: 5, maxWidth: 560, margin: "0 auto 8px" }} />
            <p className="section-reveal" style={{ textAlign: "center", color: TEXT_MUTED, fontSize: "0.76rem", marginBottom: 72, letterSpacing: "0.04em" }}>
              Good wellbeing ←───── fluctuates naturally ─────→ Severe ill health
            </p>

            {/* 3D tunnel cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 22, perspective: "1200px", perspectiveOrigin: "50% 50%", transformStyle: "preserve-3d" }}>
              {conditionCards.map((c, i) => (
                <div key={i} className="tunnel-card glass hover-3d" style={{ borderRadius: 24, padding: "36px 28px", transformStyle: "preserve-3d" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <span style={{ fontSize: "2rem", display: "block" }}>{c.icon}</span>
                    <h3 className="font-display" style={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em", color: TEXT }}>{c.name}</h3>
                  </div>
                  <p style={{ color: TEXT_MUTED, fontSize: "0.92rem", lineHeight: 1.72 }}>{c.desc}</p>
                  <div style={{ marginTop: 20, height: 2, background: `linear-gradient(90deg, rgba(45,80,22,0.3), transparent)`, borderRadius: 100 }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            FACTORS
        ════════════════════════════════ */}
        <section ref={factorsRef} style={{ ...sec, background: "transparent" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="section-reveal section-label" style={{ justifyContent: "center" }}>Factors</div>
            <h2 className="section-reveal font-display" style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 800, marginBottom: 76, letterSpacing: "-0.03em", color: TEXT }}>
              What Affects Your <span className="grad">Mental Health?</span>
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
              {/* Within control */}
              <div className="factor-left glass hover-3d" style={{ borderRadius: 28, padding: "48px 40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
                  <div style={{ width: 50, height: 50, background: ACCENT, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>✅</div>
                  <div>
                    <p style={{ fontSize: "0.7rem", color: ACCENT, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>Lifestyle Factors</p>
                    <h3 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 800, color: TEXT }}>Within Your Control</h3>
                  </div>
                </div>
                {["Work", "University", "Diet", "Drug or Alcohol Consumption", "Exercise & Health", "Sleep"].map((f, i, arr) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                    <span style={{ width: 8, height: 8, background: ACCENT, borderRadius: "50%", flexShrink: 0 }} />
                    <span style={{ color: TEXT_MID, fontWeight: 500, fontSize: "0.95rem" }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Outside control */}
              <div className="factor-right glass-deep hover-3d" style={{ borderRadius: 28, padding: "48px 40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
                  <div style={{ width: 50, height: 50, background: "rgba(45,80,22,0.12)", border: `1px solid ${BORDER}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>⚡</div>
                  <div>
                    <p style={{ fontSize: "0.7rem", color: TEXT_MUTED, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>External Factors</p>
                    <h3 className="font-display" style={{ fontSize: "1.25rem", fontWeight: 800, color: TEXT }}>Outside Your Control</h3>
                  </div>
                </div>
                {["Financial Pressure & Cost of Living", "Poverty & Living Conditions", "Genetics", "Childhood Trauma", "Discrimination or Abuse", "Social Isolation"].map((f, i, arr) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < arr.length - 1 ? `1px solid ${BORDER2}` : "none" }}>
                    <span style={{ width: 8, height: 8, background: `rgba(45,80,22,0.35)`, borderRadius: "50%", flexShrink: 0 }} />
                    <span style={{ color: TEXT_MUTED, fontWeight: 500, fontSize: "0.95rem" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-reveal" style={{ marginTop: 26, textAlign: "center", color: TEXT_MUTED, fontSize: "0.9rem", borderTop: `1px solid ${BORDER}`, paddingTop: 26 }}>
              💡 Mental health problems can happen to anybody — regardless of these factors.
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            SELF-CHECK
        ════════════════════════════════ */}
        <section style={{ ...sec, background: "transparent" }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <div className="section-reveal section-label" style={{ justifyContent: "center" }}>Self-Check</div>
            <h2 className="section-reveal font-display" style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.03em", color: TEXT }}>
              When to Take Action
            </h2>
            <p className="section-reveal" style={{ textAlign: "center", color: TEXT_MUTED, marginBottom: 60, lineHeight: 1.75 }}>
             It’s important to pay attention to your own mental wellbeing, so that you can notice when it might be time for you take action to improve your mental health. There are a number of questions that you can ask yourself if you think you’re experiencing lower mental wellbeing:
            </p>

            <div className="warning-list glass" style={{ borderRadius: 28, overflow: "hidden" }}>
              {warningQuestions.map((q, i) => (
                <div key={i} style={{ position: "relative", padding: "22px 36px", borderBottom: i < warningQuestions.length - 1 ? `1px solid ${BORDER}` : "none", display: "flex", alignItems: "center", gap: 18 }}>
                  <div className="warning-bar" style={{ position: "absolute", left: 0, top: 0, height: "100%", width: 3, background: `linear-gradient(180deg, ${ACCENT}, transparent)`, transformOrigin: "top" }} />
                  <span className="font-display warning-text" style={{ minWidth: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(45,80,22,0.1)`, border: `1px solid rgba(45,80,22,0.2)`, borderRadius: "50%", fontSize: "0.82rem", fontWeight: 800, color: ACCENT, flexShrink: 0 }}>{i + 1}</span>
                  <p className="warning-text" style={{ color: TEXT_MID, fontSize: "0.98rem", lineHeight: 1.6 }}>{q}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            ACTION STEPS
        ════════════════════════════════ */}
        <section ref={actionRef} style={{ ...sec, background: "transparent" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="section-reveal section-label" style={{ justifyContent: "center" }}>Recovery</div>
            <h2 className="section-reveal font-display" style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.03em", color: TEXT }}>
              What You Can Do
            </h2>
            <p className="section-reveal" style={{ textAlign: "center", color: TEXT_MUTED, maxWidth: 500, margin: "0 auto 68px", lineHeight: 1.75 }}>
              It's not a sprint, but a marathon. Even the smallest first step starts the journey.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, perspective: "800px" }}>
              {actionSteps.map((a, i) => (
                <div key={i} className="action-item glass hover-3d" style={{ borderRadius: 20, padding: "26px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
                  <span style={{ fontSize: "2rem" }}>{a.icon}</span>
                  <p style={{ color: TEXT_MID, fontSize: "0.93rem", lineHeight: 1.55, fontWeight: 600 }}>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            TALKING
        ════════════════════════════════ */}
        <section ref={talkRef} style={{ ...sec, background: "transparent" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="section-reveal section-label" style={{ justifyContent: "center" }}>Conversation</div>
            <h2 className="section-reveal font-display" style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.03em", color: TEXT }}>
              Talking About <span className="grad">Mental Health</span>
            </h2>
            <p className="section-reveal" style={{ textAlign: "center", color: TEXT_MUTED, maxWidth: 560, margin: "0 auto 68px", lineHeight: 1.75 }}>
             Whether you or one of your family or friends are having difficulties with their mental wellbeing, it’s important to talk about mental health, and start the conversation to offer or receive support. Whilst talking about your own mental health can be a real challenge, it can prove just as difficult to initiate a conversation to offer support. There are a number of things you can do to build trust and rapport with a friend to encourage safe and meaningful sharing. This includes thinking about:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {talkTips.map((t, i) => (
                <div key={i} className="talk-card glass hover-3d" style={{ borderRadius: 24, padding: "40px 32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                    <span style={{ width: 52, height: 52, background: `rgba(45,80,22,0.1)`, border: `1px solid ${BORDER}`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{t.icon}</span>
                    <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.01em", color: TEXT }}>{t.heading}</h3>
                  </div>
                  <ul style={{ listStyle: "none" }}>
                    {t.tips.map((tip, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: j < t.tips.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                        <span style={{ width: 6, height: 6, background: ACCENT, borderRadius: "50%", flexShrink: 0, marginTop: 9 }} />
                        <span style={{ color: TEXT_MUTED, fontSize: "0.93rem", lineHeight: 1.65 }}>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            CTA — Getting Support
        ════════════════════════════════ */}
        <section ref={ctaRef} style={{ ...sec, background: "transparent", paddingBottom: 100 }}>
          {/* Big BG word */}
          <div className="font-display" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(7rem, 16vw, 17rem)", fontWeight: 900, color: `rgba(45,80,22,0.04)`, letterSpacing: "-0.05em", pointerEvents: "none", whiteSpace: "nowrap", userSelect: "none" }}>HELP</div>

          <div className="cta-content" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-block", fontSize: "3.5rem", marginBottom: 28 }} className="float">🌿</div>
            <h2 className="font-display" style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 20, lineHeight: 1.1, color: TEXT }}>
              Getting <span className="grad">Support</span>
            </h2>
            <p style={{ color: TEXT_MUTED, fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 550, margin: "0 auto 56px" }}>
              There are a number of organisations that offer support for those struggling with their mental wellbeing. The following are a good place to start, as well as talking with family and friends: 
            </p>

            {/* Org grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 48 }}>
              {[
                { name: "Mind", url: "https://www.studentminds.org.uk/ ", desc: "Mental health support & info" },
                { name: "Samaritans", url: "https://www.nhs.uk/nhs-services/mental-health-services/ ", desc: "Free listening, 24/7" },
                { name: "Young Minds", url: "https://www.mind.org.uk/information-support/guides-to-support-andservices/seeking-help-for-a-mental-health-problem/where-to-start/ ", desc: "For young people & students" },
                { name: "Student Minds", url: "https://www.studentminds.org.uk", desc: "UK's student mental health charity" },
              ].map((org, i) => (
                <a key={i} href={org.url} target="_blank" rel="noreferrer"
                  className="glass hover-3d"
                  style={{ borderRadius: 18, padding: "20px 22px", textDecoration: "none", display: "block", textAlign: "left" }}
                >
                  <div className="font-display" style={{ fontWeight: 800, color: TEXT, fontSize: "1rem", marginBottom: 4 }}>{org.name}</div>
                  <div style={{ fontSize: "0.8rem", color: TEXT_MUTED }}>{org.desc}</div>
                </a>
              ))}
            </div>

            <Link to="/phase"
              style={{ display: "inline-block", background: ACCENT, color: "#2c2828", padding: "18px 54px", borderRadius: 100, fontWeight: 800, fontSize: "1rem", textDecoration: "none", letterSpacing: "0.02em", boxShadow: `0 8px 40px rgba(45,80,22,0.3)`, transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 22px 55px rgba(45,80,22,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = `0 8px 40px rgba(45,80,22,0.3)`; }}
            >
              Start Your Wellbeing Journey →
            </Link>

            {/* <p style={{ marginTop: 28, color: TEXT_MUTED, fontSize: "0.82rem" }}>
              Emergency? Call <strong style={{ color: TEXT }}>999</strong> or text <strong style={{ color: TEXT }}>SHOUT to 85258</strong>
            </p> */}
          </div>
        </section>

      </div>
    </>
  );
}
