# ClearLedger SaaS — Conciliación Financiera Automatizada

Plataforma web SaaS desarrollada con **Next.js 16 (App Router)** y **React 19** para automatizar el cruce de facturas emitidas en ERP (como Siigo) contra pagos reportados por empresas de factoring, detectando discrepancias por factura y generando reportes de cierre contable.

---

## Enlace a la aplicación en producción

- **Dominio público:** http://getclearledger.xyz/
- **Usuario demo:** `demo@clearledger.com` / `clearledger123`

---

## Getting Started (Instalación y ejecución local)

### Requisitos previos
- **Node.js** 20+ o 22 LTS
- **npm** 10+
- **Git**

### Pasos de instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Angeldmoralesv/clearledger-saas.git
   cd clearledger-saas
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno copiando `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Edita `SESSION_SECRET` con una clave aleatoria segura.
4. Ejecutar pruebas unitarias y servidor de desarrollo:
   ```bash
   npm test
   npm run dev
   ```
5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.


---

## Evidencias de funcionamiento

> *Nota:* Guarda tus capturas reales en `docs/images/` (`landing.png`, `dashboard.png`, `arquitectura-aws.png`) y enlázalas así:

![Landing ClearLedger](docs/images/landing.png)
![Dashboard ClearLedger](docs/images/dashboard.png)
![Arquitectura AWS](docs/images/arquitectura-aws.png)

---

## Datos de prueba y Recursos adicionales

- **CSV de prueba:** Usa `docs/samples/facturas_erp.csv` y `docs/samples/pagos_factoring.csv` en **Dashboard → Conciliaciones**.
- **Documentación oficial:**
  - [Next.js App Router Docs](https://nextjs.org/docs)
  - [React 19 Documentation](https://react.dev)
  - [GitHub Actions Documentation](https://docs.github.com/actions)
  - [AWS Academy Learner Lab](https://aws.amazon.com/training/awsacademy/)

---

## Equipo de desarrollo — Universidad de la Costa

- **Ángel Morales** — Componentes UI interactivos, fronteras App Router y Health Check API
- **Omar Gutiérrez** — Autenticación, criptografía de sesiones, proxy de rutas y persistencia
- **Frederick Jimenez** — Motor de conciliación, parser CSV, APIs REST y pruebas unitarias
- **Daniela Beltran** — Landing page, vistas del dashboard, historial y reportes
- **Ana Villanova** — SEO, configuración PM2, pipelines CI/CD y documentación técnica


---

## Compilación (Build) y Despliegue (Deploy)

### Compilación para producción
```bash
npm ci
npm test
npm run build
npm run start
