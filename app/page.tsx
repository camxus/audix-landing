import FeatureLabel from "@/components/FeatureLabel";
import HeroTagline from "@/components/HeroTagline";
import SignupForm from "@/components/SignupForm";
import DeviceMockups from "@/components/DeviceMockups";
import ShaderBackground from "@/components/ShaderBackground";

export default function Home() {
  return (
    <main
      className="audix-main"
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "#141414",
      }}
    >
      {/* Left column — 45% */}
      <div
        className="audix-left"
        style={{
          width: "45%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 6% 0 8%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Wordmark */}
        <div className="animate-fadein-0">
          <span
            style={{
              fontSize: "clamp(2rem, 4vw, 2rem)",
              fontWeight: 300,
              color: "#F0F0EE",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "block",
            }}
          >
            AudixMusic
          </span>
        </div>

        {/* Hero tagline cycling */}
        <div className="animate-fadein-200">
          <HeroTagline />
        </div>

        {/* Feature label cycling */}
        <div className="animate-fadein-200" style={{ marginTop: "0.75rem" }}>
          <FeatureLabel />
        </div>

        {/* Signup form */}
        <div className="animate-fadein-400" style={{ marginTop: "2rem" }}>
          <SignupForm />
        </div>
      </div>

      {/* Right column — 55% */}
      <div
        className="audix-right"
        style={{
          width: "55%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Shader / gradient background */}
        <ShaderBackground />

        {/* Seam gradient — left→right on desktop, top→bottom on mobile */}
        <div className="audix-seam" />

        {/* Radial gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 60% at 75% 50%, rgba(63,55,160,0.12) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Device mockups */}
        <div
          className="animate-fadein-600"
          style={{ position: "relative", zIndex: 2 }}
        >
          <DeviceMockups />
        </div>
      </div>
    </main>
  );
}
