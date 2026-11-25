# ClearLedger SaaS — Conciliación Financiera Automatizada

Plataforma web SaaS desarrollada con **Next.js 16 (App Router)** y **React 19** para automatizar el cruce de facturas emitidas en ERP (como Siigo) contra pagos reportados por empresas de factoring, detectando discrepancias por factura y generando reportes de cierre contable.

---

## Enlace a la aplicación en producción

- **Dominio público:** `https://tu-dominio-personalizado.tech` *(actualizar con su dominio configurado en DNS)*
- **Health check:** `https://tu-dominio-personalizado.tech/api/health`
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
