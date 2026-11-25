"use client";

import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FileText, Bank, CheckCircle } from "@phosphor-icons/react";

export default function LedgerSignature() {
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 });

  function handleMouseMove(e) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: "easeOut", delay: reduce ? 0 : delay },
  });

  return (
    <motion.div
      role="img"
      aria-label="Una factura y un movimiento bancario cruzados con el sello MATCHED"
      className="hero-sig"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformPerspective: 1200 }}
    >
      <motion.div className="hero-sig-discrepancy" {...fadeUp(0)}>
        <div className="hero-sig-discrepancy-head">
          <span>FAC-2026-004790</span>
          <span className="hero-sig-delta">Δ $ 120.000</span>
        </div>
        <div className="hero-sig-bar" style={{ width: "80%" }} />
        <div className="hero-sig-bar" style={{ width: "55%", opacity: 0.6 }} />
        <span className="hero-sig-tag flag">Discrepancia</span>
      </motion.div>

      <motion.div className="hero-sig-invoice cl-fa" {...fadeUp(0.1)}>
        <div className="hero-sig-scan" />
        <div className="hero-sig-invoice-head">
          <div>
            <span className="hero-sig-label">Factura electrónica</span>
            <span className="hero-sig-id">FAC-2026-004812</span>
          </div>
          <FileText size={24} weight="regular" color="#2600A5" />
        </div>
        <div className="hero-sig-invoice-grid">
          <div>
            <span>Deudor</span>
            <strong>Distribuidora Andina S.A.S.</strong>
          </div>
          <div>
            <span>NIT</span>
            <strong className="mono">900.482.117-3</strong>
          </div>
          <div>
            <span>Vencimiento</span>
            <strong className="mono">15 dic 2026</strong>
          </div>
          <div>
            <span>Cedida</span>
            <strong className="mono">02 nov 2026</strong>
          </div>
        </div>
        <div className="hero-sig-invoice-total">
          <span>Valor</span>
          <strong className="mono">$ 48.250.000</strong>
        </div>
      </motion.div>

      <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 580 540" preserveAspectRatio="none" className="hero-sig-link">
        <path d="M250 300 C 300 330, 300 360, 340 372" fill="none" stroke="#B8ACFF" strokeWidth="2" strokeDasharray="5 6" />
        <circle cx="250" cy="300" r="5" fill="#B8ACFF" />
        <circle cx="340" cy="372" r="5" fill="#B8ACFF" />
      </svg>

      <motion.div className="hero-sig-bank cl-fb" {...fadeUp(0.2)}>
        <div className="hero-sig-bank-head">
          <span>Extracto bancario · CTA ****4417</span>
          <Bank size={20} weight="regular" color="#B8ACFF" />
        </div>
        <div className="hero-sig-bank-desc">Abono ACH Distrib Andina SAS</div>
        <div className="hero-sig-bank-row">
          <span>18 nov 2026 · Ref 7710-2291</span>
          <strong className="mono">$ 48.250.000</strong>
        </div>
      </motion.div>

      <motion.div
        className="hero-sig-stamp cl-stamp"
        initial={{ opacity: 0, scale: reduce ? 1 : 1.25 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: reduce ? 0 : 0.5 }}
      >
        <CheckCircle size={26} weight="bold" color="#22C55E" />
        <div>
          <span className="hero-sig-stamp-title">MATCHED</span>
          <span className="hero-sig-stamp-sub">NIT · MONTO · REFERENCIA</span>
        </div>
      </motion.div>

      <motion.div className="hero-sig-progress" {...fadeUp(0.3)}>
        <div className="hero-sig-progress-row">
          <span>Cruzando cartera…</span>
          <span className="hero-sig-progress-count">1.197 / 1.284</span>
        </div>
        <div className="hero-sig-progress-track">
          <div className="hero-sig-progress-fill cl-bar" />
        </div>
      </motion.div>
    </motion.div>
  );
}