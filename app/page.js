import Link from "next/link";
import LedgerSignature from "@/components/LedgerSignature";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="page">
      <header className="site-header-gradient">
        <div className="container">
          <nav className="site-nav">
            <Link href="/" className="brand">
              <Logo />
              ClearLedger
            </Link>
            <div className="nav-links">
              <a className="nav-link" href="#producto">Producto</a>
              <a className="nav-link" href="#como-funciona">Cómo funciona</a>
              <a className="nav-link" href="#precios">Planes</a>
            </div>
            <div className="nav-actions">
              <Link href="/login" className="btn btn-pill-outline">Iniciar sesión</Link>
              <Link href="/register" className="btn btn-pill-white">Empezar</Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero greenbar-field">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Conciliación financiera · Factoring</span>
              <h1>Deja de cuadrar la cartera <em>a mano</em> cada fin de mes</h1>
              <p className="hero-sub">
                ClearLedger cruza automáticamente tus facturas de factoring contra tu ERP,
                marca cada partida como conciliada o en discrepancia, y te entrega el
                reporte de cierre en minutos, no en días.
              </p>
              <div className="hero-actions">
                <Link href="/register" className="btn btn-primary">Crear cuenta gratis</Link>
                <Link href="/login" className="btn btn-ghost">Ya tengo cuenta</Link>
              </div>
              <div className="hero-meta">
                <div><strong>92%</strong>menos horas de cruce manual</div>
                <div><strong>&lt; 2s</strong>por lote conciliado</div>
                <div><strong>100%</strong>trazabilidad por partida</div>
              </div>
            </div>
            <LedgerSignature />
          </div>
        </div>
      </section>

      <section className="section" id="producto">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">El problema</span>
              <h2>El cuadre manual no escala con tu cartera</h2>
              <p>
                Cada mes, un analista revisa a mano cientos de facturas contra los recaudos
                reportados por el ERP. Un desfase de un peso obliga a revisar todo el lote otra vez.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="compare">
              <div className="compare-card">
                <span className="compare-label">Sin ClearLedger</span>
                <ul>
                  <li>Exportar e importar hojas de cálculo entre sistemas</li>
                  <li>Cruzar factura por factura visualmente</li>
                  <li>Descuadres que se detectan días después del cierre</li>
                  <li>Ningún historial de qué se revisó y cuándo</li>
                </ul>
              </div>
              <div className="compare-card is-after">
                <span className="compare-label">Con ClearLedger</span>
                <ul>
                  <li>Cruce automático contra el ERP en cada lote</li>
                  <li>Discrepancias marcadas con su causa exacta</li>
                  <li>Reporte de cierre listo en segundos</li>
                  <li>Historial completo de cada conciliación ejecutada</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Qué hace</span>
              <h2>Cada partida, con su propia justificación</h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="entries">
              <div className="entry">
                <span className="entry-code">01 · Cruce</span>
                <h3>Cruce automático por id y monto</h3>
                <p>Compara cada factura del ERP contra el recaudo reportado por la empresa de factoring, campo a campo, sin intervención manual.</p>
              </div>
              <div className="entry">
                <span className="entry-code">02 · Detección</span>
                <h3>Discrepancias con causa explícita</h3>
                <p>No solo marca "no cuadra": indica si falta el pago, si el monto difiere, o si el cliente no coincide.</p>
              </div>
              <div className="entry">
                <span className="entry-code">03 · Historial</span>
                <h3>Cada conciliación queda registrada</h3>
                <p>Consulta cualquier lote anterior, quién lo ejecutó y qué resultado arrojó, sin depender de una hoja de cálculo perdida en un correo.</p>
              </div>
              <div className="entry">
                <span className="entry-code">04 · Acceso</span>
                <h3>Un acceso por analista, nunca abierto al público</h3>
                <p>Cada cuenta ve únicamente sus propias conciliaciones, con inicio de sesión protegido y contraseñas cifradas.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Cómo funciona</span>
              <h2>De la factura al reporte, en cuatro pasos</h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="steps">
              <div className="step"><span className="step-num">Paso 1</span><h3>Conecta tus fuentes</h3><p>Cargas o conectas las facturas de tu ERP y los recaudos de factoring.</p></div>
              <div className="step"><span className="step-num">Paso 2</span><h3>Ejecutas el cruce</h3><p>ClearLedger compara cada partida en segundos, sin hojas de cálculo.</p></div>
              <div className="step"><span className="step-num">Paso 3</span><h3>Revisas discrepancias</h3><p>Ves exactamente qué no cuadró y por qué, listo para resolver.</p></div>
              <div className="step"><span className="step-num">Paso 4</span><h3>Cierras con reporte</h3><p>Exportas el resultado del lote para tu cierre contable mensual.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <blockquote className="testimonial">
              <p>"Pasamos de tres días cerrando la cartera a revisar solo las partidas que realmente no cuadran. El resto queda conciliado automáticamente."</p>
              <footer><strong>Analista de cartera</strong><span>Empresa de factoring, Barranquilla</span></footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section" id="precios">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Para tu equipo</span>
              <h2>Un plan para cada tamaño de cartera</h2>
              <p>Todos los planes incluyen cruce automático, historial y acceso protegido por cuenta.</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="plans">
              <div className="plan-card">
                <span className="plan-name">Starter</span>
                <div className="plan-price">Gratis <span>/ hasta 100 facturas al mes</span></div>
                <ul><li>1 cuenta de analista</li><li>Carga de CSV propio</li><li>Historial de 50 lotes</li></ul>
                <Link href="/register" className="btn btn-ghost btn-block">Crear cuenta gratis</Link>
              </div>
              <div className="plan-card is-featured">
                <span className="plan-badge">Más usado</span>
                <span className="plan-name">Equipo</span>
                <div className="plan-price">A definir <span>/ según volumen mensual</span></div>
                <ul><li>Hasta 10 analistas</li><li>Exportación de reportes</li><li>Historial sin límite</li><li>Soporte prioritario</li></ul>
                <Link href="/register" className="btn btn-primary btn-block">Empezar con el equipo</Link>
              </div>
              <div className="plan-card">
                <span className="plan-name">Empresa</span>
                <div className="plan-price">A cotizar <span>/ integraciones a medida</span></div>
                <ul><li>Analistas ilimitados</li><li>Integración directa con tu ERP</li><li>Despliegue en tu propia nube</li></ul>
                <Link href="#faq" className="btn btn-ghost btn-block">Hablar con el equipo</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Preguntas frecuentes</span>
              <h2>Antes de que preguntes</h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="faq">
              <details className="faq-item"><summary>¿Necesito cambiar mi ERP actual?<span className="faq-icon" /></summary><p>No. ClearLedger se conecta al ERP que ya usas (como Siigo) para traer las facturas; no lo reemplaza ni requiere migrar tu contabilidad.</p></details>
              <details className="faq-item"><summary>¿Qué pasa si mis archivos tienen errores?<span className="faq-icon" /></summary><p>Cada discrepancia queda marcada con su causa exacta — pago no encontrado, monto distinto o cliente que no coincide — para que la resuelvas sin revisar todo el lote de nuevo.</p></details>
              <details className="faq-item"><summary>¿Puedo probarlo con mis propios datos?<span className="faq-icon" /></summary><p>Sí. Desde el panel de Conciliaciones puedes cargar tus archivos CSV de facturas y pagos, o usar el lote de ejemplo para explorar la herramienta.</p></details>
              <details className="faq-item"><summary>¿Quién puede ver mis conciliaciones?<span className="faq-icon" /></summary><p>Solo tu cuenta. El acceso requiere inicio de sesión, las contraseñas se guardan cifradas y cada analista ve únicamente lo que él mismo ejecutó.</p></details>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Tu primer lote conciliado toma menos de cinco minutos</h2>
                <p>Crea tu cuenta, usa el lote de ejemplo y mira el cruce en tiempo real.</p>
              </div>
              <Link href="/register" className="btn btn-primary">Crear cuenta gratis</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer-full">
        <div className="container site-footer-grid">
          <div className="footer-brand">
            <span className="brand"><Logo />ClearLedger</span>
            <p>Conciliación financiera automatizada para empresas de factoring.</p>
          </div>
          <div className="footer-col">
            <h4>Producto</h4>
            <a href="#producto">Cómo funciona</a>
            <a href="#precios">Planes</a>
            <a href="#faq">Preguntas frecuentes</a>
          </div>
          <div className="footer-col">
            <h4>Cuenta</h4>
            <Link href="/login">Iniciar sesión</Link>
            <Link href="/register">Crear cuenta</Link>
          </div>
          <div className="footer-col">
            <h4>Proyecto académico</h4>
            <span>Buenas prácticas de desarrollo de software</span>
            <span>Universidad de la Costa</span>
          </div>
        </div>
        <div className="container"><div className="footer-bottom">© 2026 ClearLedger SaaS</div></div>
      </footer>
    </div>
  );
}