"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";
type Role = "artist" | "collector" | null;

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // 👇 NEW: controls when role selector appears
  const [showRole, setShowRole] = useState(false);

  const isValidEmail = email.includes("@");
  const canSubmit = isValidEmail && role !== null && status !== "loading";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!role) {
      setErrorMsg("Please select a role.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = (await res.json()) as { error?: string };
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p style={{ color: "#5DCAA5", fontSize: "0.95rem" }}>
        You're on the list.
      </p>
    );
  }

  return (
    <div>
      <p
        style={{
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#888884",
          marginBottom: 12,
        }}
      >
        Get early access
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {/* EMAIL */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setShowRole(true)} // 👈 trigger reveal
          placeholder="your@email.com"
          disabled={status === "loading"}
          style={{
            height: 44,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 8,
            color: "#F0F0EE",
            padding: "0 16px",
            outline: "none",
            backdropFilter: "blur(12px)",
          }}
        />

        {/* ROLE SELECT (NOW TRIGGERED BY CLICK/FOCUS, NOT EMAIL VALIDATION) */}
        <AnimatePresence>
          {showRole && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              {/* LABEL */}
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#777",
                  marginBottom: 8,
                }}
              >
                I am …
              </p>

              {/* GLASS TOGGLE */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  padding: 4,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                }}
              >
                {/* sliding pill */}
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    width: "50%",
                    borderRadius: 10,
                    background: "rgba(127,119,221,0.35)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    left: role === "collector" ? "50%" : 4,
                  }}
                />

                <button
                  type="button"
                  onClick={() => setRole("artist")}
                  style={{
                    flex: 1,
                    height: 40,
                    border: "none",
                    background: "transparent",
                    color: "#fff",
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                >
                  An Artist
                </button>

                <button
                  type="button"
                  onClick={() => setRole("collector")}
                  style={{
                    flex: 1,
                    height: 40,
                    border: "none",
                    background: "transparent",
                    color: "#fff",
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                >
                  A Collector
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={!canSubmit}
          style={{
            height: 44,
            borderRadius: 8,
            border: "none",
            background: canSubmit ? "#7F77DD" : "#444",
            color: "#fff",
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
        >
          {status === "loading" ? "Joining..." : "Join waitlist →"}
        </button>
      </form>

      {/* ERROR */}
      {status === "error" && (
        <p style={{ marginTop: 8, fontSize: "0.78rem", color: "#E07A5A" }}>
          {errorMsg}
        </p>
      )}
    </div>
  );
}
