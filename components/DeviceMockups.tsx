"use client";

import { useEffect, useState } from "react";

export default function DeviceMockups() {
  const initialFeed = [
    "@kira_m bought Neon Drifts · 0x4f2a…",
    "@theo sold Glass Hours · 0x9b1c…",
    "@lyra.wav bought Afterglow EP · 0x3da0…",
    "@juno_x traded Soft Reset · 0x7e55…",
    "@mo.beats bought Midnight Freq… · 0x2c11…",
    "@kira_m gifted Neon Drifts · 0x8a3b…",
    "@theo bought Afterglow EP · 0x1f90…",
    "@yael sold Glass Hours · 0x6d44…",
  ];

  const [feed, setFeed] = useState(initialFeed);
  const [priceData, setPriceData] = useState<number[]>([]);
  const [currentPrice, setCurrentPrice] = useState(24.8);

  const START_PRICE = 24.8;
  const MAX_DEVIATION = 0.1; // ±10% max
  const POINTS = 30;

  // Generate price data that trends up but draws back (static chart)
  const generatePricePath = () => {
    const prices: number[] = [START_PRICE];
    let currentPrice = START_PRICE;
    let upwardTrend = 0;

    for (let i = 1; i < POINTS; i++) {
      upwardTrend += 0.002;
      const randomChange = (Math.random() - 0.45) * 0.08;
      const changePercent = randomChange + upwardTrend * 0.01;

      currentPrice += currentPrice * changePercent;

      const minPrice = START_PRICE * (1 - MAX_DEVIATION);
      const maxPrice = START_PRICE * (1 + MAX_DEVIATION);
      currentPrice = Math.max(minPrice, Math.min(maxPrice, currentPrice));

      prices.push(currentPrice);

      if (Math.random() < 0.15 && i > 5) {
        currentPrice -= currentPrice * 0.02;
        currentPrice = Math.max(minPrice, currentPrice);
        prices[i] = currentPrice;
      }
    }

    if (prices[POINTS - 1] < START_PRICE) {
      prices[POINTS - 1] = START_PRICE * 1.03;
    }

    return prices;
  };

  // Generate SVG path from price data
  const generateSparklinePath = (prices: number[]) => {
    if (prices.length === 0) return { linePath: "", areaPath: "" };

    const width = 300;
    const height = 80;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice || 1;

    const points = prices.map((price, i) => {
      const x = (i / (POINTS - 1)) * width;
      const y = height - ((price - minPrice) / range) * (height - 10) - 5;
      return `${x},${y}`;
    });

    const linePath = `M${points.join(" L")}`;
    const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

    return { linePath, areaPath };
  };

  // Generate static chart data on mount (only once)
  useEffect(() => {
    setPriceData(generatePricePath());
  }, []);

  // Update current price every second (trending up)
  useEffect(() => {
    const interval = setInterval(() => {
      const changePercent = 0.001 + (Math.random() - 0.3) * 0.005;
      const newPrice = currentPrice * (1 + changePercent);

      const maxPrice = START_PRICE * (1 + MAX_DEVIATION);
      setCurrentPrice(Math.min(maxPrice, newPrice));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  const { linePath, areaPath } = generateSparklinePath(priceData);

  const percentageChange = (
    ((currentPrice - START_PRICE) / START_PRICE) *
    100
  ).toFixed(1);

  // realtime simulation with random faster intervals
  useEffect(() => {
    const mockEvents = [
      "@nova bought Neon Drifts · 0x91aa…",
      "@zen sold Afterglow EP · 0x22bc…",
      "@aria traded Soft Reset · 0x88ff…",
      "@mo.beats bought Glass Hours · 0x77aa…",
    ];

    let timeoutId: NodeJS.Timeout;

    const scheduleNext = () => {
      const randomDelay = Math.floor(Math.random() * 1200) + 800;

      timeoutId = setTimeout(() => {
        const next = mockEvents[Math.floor(Math.random() * mockEvents.length)];
        setFeed((prev) => [next, ...prev.slice(0, 7)]);
        scheduleNext();
      }, randomDelay);
    };

    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className="audix-devices"
      style={{
        position: "relative",
        width: "560px",
        height: "400px",
        maxWidth: "85vw",
      }}
    >
      {/* ── Laptop Frame ── */}
      <div
        className="audix-laptop"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "520px",
          maxWidth: "100%",
        }}
      >
        {/* Screen lid */}
        <div
          style={{
            background: "#1C1C1E",
            borderRadius: "12px 12px 4px 4px",
            padding: "10px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
          }}
        >
          {/* Bezel */}
          <div
            style={{
              background: "#141414",
              borderRadius: "8px",
              overflow: "hidden",
              height: "296px",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* App content */}
            <div
              style={{
                transform: "scale(0.6)",
                transformOrigin: "top left",
                width: "166.67%",
                height: "166.67%",
                fontFamily: "Inter, -apple-system, sans-serif",
                background: "#141414",
                color: "#F0F0EE",
              }}
            >
              {/* Top nav */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: "#1C1C1E",
                }}
              >
                <span
                  style={{
                    fontWeight: 300,
                    fontSize: "15px",
                    letterSpacing: "-0.03em",
                  }}
                >
                  audix
                </span>

                <div
                  style={{
                    background: "#2C2C2E",
                    borderRadius: "20px",
                    padding: "5px 14px",
                    fontSize: "11px",
                    color: "#888884",
                    flex: "0 0 200px",
                    textAlign: "center",
                  }}
                >
                  Search artists, releases…
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  {["⚡", "◎", "▤"].map((icon, i) => (
                    <span key={i} style={{ fontSize: "14px", opacity: 0.5 }}>
                      {icon}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero / Featured Release */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #26215C 0%, #1a1a3a 60%, #141414 100%)",
                  padding: "24px 20px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#888884",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Featured Release
                </div>

                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 300,
                    marginBottom: "4px",
                  }}
                >
                  Midnight Reverie
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#888884",
                    marginBottom: "14px",
                  }}
                >
                  @solaris.wav · 14,200 shares
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "20px" }}>
                    $ {currentPrice.toFixed(2)}
                  </span>
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "12px",
                      color: "#5DCAA5",
                    }}
                  >
                    +{percentageChange}%
                  </span>
                </div>
              </div>

              {/* Trending */}
              <div style={{ padding: "16px 20px 0" }}>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#888884",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Trending Today
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "10px",
                  }}
                >
                  {[
                    {
                      name: "Echo Phase",
                      artist: "@nue.audio",
                      price: "$18.40",
                      pct: "+12.1%",
                      gain: true,
                      bg: "var(--audix-card-purple-bg)",
                      color: "#7F77DD",
                    },
                    {
                      name: "Gold Seam",
                      artist: "@marigold",
                      price: "$9.60",
                      pct: "-2.4%",
                      gain: false,
                      bg: "var(--audix-card-amber-bg)",
                      color: "#D4A044",
                    },
                    {
                      name: "Drift",
                      artist: "@coastline",
                      price: "$31.20",
                      pct: "+5.7%",
                      gain: true,
                      bg: "var(--audix-card-green-bg)",
                      color: "#5DCAA5",
                    },
                    {
                      name: "Fever Club",
                      artist: "@prism.io",
                      price: "$14.90",
                      pct: "+3.2%",
                      gain: true,
                      bg: "var(--audix-card-pink-bg)",
                      color: "#E47FA3",
                    },
                  ].map((r) => (
                    <div
                      key={r.name}
                      style={{
                        background: r.bg,
                        borderRadius: "8px",
                        padding: "10px",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          background: r.color + "22",
                          borderRadius: "6px",
                          marginBottom: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                        }}
                      >
                        ♪
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 400,
                          marginBottom: "2px",
                        }}
                      >
                        {r.name}
                      </div>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "#888884",
                          marginBottom: "6px",
                        }}
                      >
                        {r.artist}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: "11px" }}>{r.price}</span>
                        <span
                          style={{
                            fontSize: "9px",
                            color: r.gain ? "#5DCAA5" : "#E07A5A",
                          }}
                        >
                          {r.pct}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Happening Now */}
                <div style={{ padding: "16px 20px 0", marginTop: "16px" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#888884",
                      marginBottom: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Happening Now
                  </div>

                  <div
                    style={{
                      height: "140px",
                      overflow: "hidden",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="ticker">
                      {[...feed, ...feed].map((item, i) => {
                        const isBuy = item.includes("bought");
                        const isSell = item.includes("sold");

                        return (
                          <div
                            key={i}
                            style={{
                              fontSize: "11px",
                              color: "#CFCFCB",
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "6px 10px",
                              margin: "6px 10px",
                              borderRadius: "10px",
                              background: "rgba(0,0,0,0.2)",
                            }}
                          >
                            <span>{item}</span>
                            <span
                              style={{
                                fontSize: "9px",
                                color: isBuy
                                  ? "#5DCAA5"
                                  : isSell
                                    ? "#E07A5A"
                                    : "#888884",
                              }}
                            >
                              {isBuy ? "BUY" : isSell ? "SELL" : "TRADE"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Bar at bottom of laptop */}
            </div>
          </div>
        </div>

        {/* hinge */}
        <div
          style={{
            background: "#111113",
            height: "6px",
            borderRadius: "0 0 3px 3px",
          }}
        />
        <div
          style={{
            background: "#1C1C1E",
            height: "8px",
            borderRadius: "0 0 8px 8px",
          }}
        />
      </div>

      <div
        className="audix-laptop"
        style={{
          borderRadius: 8,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#1C1C1E",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Cover art */}
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #7F77DD33, #26215C)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              border: "1px solid rgba(127,119,221,0.2)",
            }}
          >
            ♫
          </div>

          {/* Track info */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 400,
                marginBottom: "2px",
              }}
            >
              Midnight Reverie
            </div>
            <div style={{ fontSize: "10px", color: "#888884" }}>
              @solaris.wav
            </div>
          </div>

          {/* Play controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                opacity: 0.6,
                cursor: "pointer",
              }}
            >
              ⏮
            </span>
            <span
              style={{
                fontSize: "20px",
                opacity: 0.9,
                cursor: "pointer",
                color: "#7F77DD",
              }}
            >
              ▶
            </span>
            <span
              style={{
                fontSize: "16px",
                opacity: 0.6,
                cursor: "pointer",
              }}
            >
              ⏭
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              flex: 1.5,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                color: "#888884",
                width: "24px",
              }}
            >
              0:47
            </span>
            <div
              style={{
                flex: 1,
                height: "4px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "35%",
                  height: "100%",
                  background: "#7F77DD",
                  borderRadius: "2px",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "9px",
                color: "#888884",
                width: "24px",
              }}
            >
              3:47
            </span>
          </div>

          {/* Volume */}
          <span
            style={{
              fontSize: "14px",
              opacity: 0.5,
              cursor: "pointer",
            }}
          >
            ⊞
          </span>
        </div>
      </div>

      {/* ── Phone Frame ── */}
      <div
        className="audix-phone"
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "0px",
          width: "200px",
          height: "380px",
          background: "#1C1C1E",
          borderRadius: "40px",
          border: "1.5px solid rgba(255,255,255,0.10)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.04)",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-2px",
            top: "100px",
            width: "3px",
            height: "40px",
            background: "#2C2C2E",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-2px",
            top: "90px",
            width: "3px",
            height: "28px",
            background: "#2C2C2E",
            borderRadius: "0 2px 2px 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-2px",
            top: "130px",
            width: "3px",
            height: "28px",
            background: "#2C2C2E",
            borderRadius: "0 2px 2px 0",
          }}
        />

        <div
          style={{
            transform: "scale(0.55)",
            transformOrigin: "top left",
            width: "181.8%",
            height: "181.8%",
            fontFamily: "Inter, -apple-system, sans-serif",
            color: "#F0F0EE",
            position: "relative",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(180deg, #26215C 0%, #1a1a38 70%, #141414 100%)",
              padding: "40px 24px 24px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "8px",
                background: "#0f0f1a",
                borderRadius: "10px",
              }}
            />

            <div
              style={{
                width: "100px",
                height: "100px",
                background: "linear-gradient(135deg, #7F77DD33, #26215C)",
                borderRadius: "14px",
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                border: "1px solid rgba(127,119,221,0.2)",
              }}
            >
              ♫
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                }}
              >
                Midnight Reverie
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#888884",
                  marginBottom: "14px",
                }}
              >
                @solaris.wav
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "22px", fontWeight: 300 }}>
                  $ {currentPrice.toFixed(2)}
                </span>
                <span
                  style={{
                    color: "#5DCAA5",
                    fontSize: "13px",
                    background: "rgba(93,202,165,0.1)",
                    padding: "3px 8px",
                    borderRadius: "20px",
                  }}
                >
                  +{percentageChange}%
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "16px 24px 0",
              justifyContent: "center",
            }}
          >
            {["Buy", "Sell", "Trade"].map((action, i) => (
              <div
                key={action}
                style={{
                  padding: "8px 20px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  background: i === 0 ? "#7F77DD" : "#2C2C2E",
                  color: i === 0 ? "#fff" : "#888884",
                  border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {action}
              </div>
            ))}
          </div>

          <div style={{ padding: "16px 24px 0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "11px", color: "#888884" }}>
                Price history
              </span>
              {["1D", "1W", "1M", "All"].map((t, i) => (
                <span
                  key={t}
                  style={{
                    fontSize: "10px",
                    color: i === 1 ? "#7F77DD" : "#888884",
                    padding: "2px 6px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <svg
              viewBox="0 0 300 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", display: "block" }}
            >
              <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7F77DD" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#7F77DD" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={linePath}
                stroke="#7F77DD"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d={areaPath} fill="url(#sparkGrad)" />
            </svg>
          </div>

          <div style={{ padding: "12px 24px 0" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#888884",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "10px",
              }}
            >
              Tracklist
            </div>
            {[
              { n: "01", title: "Prelude", dur: "2:14" },
              { n: "02", title: "Midnight Reverie", dur: "3:47" },
              { n: "03", title: "Dissolve", dur: "4:02" },
              { n: "04", title: "Return", dur: "3:18" },
            ].map((track) => (
              <div
                key={track.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "9px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  gap: "12px",
                }}
              >
                <span
                  style={{ fontSize: "10px", color: "#888884", width: "20px" }}
                >
                  {track.n}
                </span>
                <span style={{ fontSize: "13px", flex: 1 }}>{track.title}</span>
                <span style={{ fontSize: "10px", color: "#888884" }}>
                  {track.dur}
                </span>
              </div>
            ))}
          </div>

          {/* Currently Playing at bottom of phone */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#1C1C1E",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "14px 20px 18px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                color: "#888884",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Currently Playing
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Cover art */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  background: "linear-gradient(135deg, #7F77DD33, #26215C)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  border: "1px solid rgba(127,119,221,0.2)",
                }}
              >
                ♫
              </div>

              {/* Track info */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 400,
                    marginBottom: "2px",
                  }}
                >
                  Midnight Reverie
                </div>
                <div style={{ fontSize: "10px", color: "#888884" }}>
                  @solaris.wav
                </div>
              </div>

              {/* Play button */}
              <span
                style={{
                  fontSize: "22px",
                  color: "#7F77DD",
                  cursor: "pointer",
                  opacity: 0.9,
                }}
              >
                ▶
              </span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "10px",
              }}
            >
              <span
                style={{ fontSize: "9px", color: "#888884", width: "20px" }}
              >
                0:47
              </span>
              <div
                style={{
                  flex: 1,
                  height: "3px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "35%",
                    height: "100%",
                    background: "#7F77DD",
                    borderRadius: "2px",
                  }}
                />
              </div>
              <span
                style={{ fontSize: "9px", color: "#888884", width: "20px" }}
              >
                3:47
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
