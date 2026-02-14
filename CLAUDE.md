# 🏢 LivooCRMFinal - Documentación del Proyecto

> **CRM Inmobiliario de Clase Mundial**
> Frontend público + Backoffice completo | Presupuesto: $0-50 USD/mes

---

## 📋 RESUMEN DEL PROYECTO

**LivooCRMFinal** es una plataforma inmobiliaria completa que consta de dos componentes principales:

1. **Web Pública**: Sitio para búsqueda de propiedades con mapas interactivos, filtros avanzados, y captación de leads
2. **Backoffice CRM**: Sistema completo con 21 módulos para gestión inmobiliaria

**Filosofía del proyecto:**
- Stack 100% gratuito (presupuesto máximo $0-50/mes)
- Frontend-first (mock data inicialmente, backend se conecta después)
- Design system neutro y profesional
- Inspirado en: Lone Wolf, Compass, Loft, Tokko Broker, EasyBroker, GoHighLevel, Monopolio

---

## 🛠️ STACK TECNOLÓGICO

### Core
- **Framework**: Next.js 16.1.6 (App Router)
- **Runtime**: React 19.2.4
- **Language**: TypeScript 5.9.3 (strict mode)
- **Styling**: Tailwind CSS 3.4.19

### UI & Components
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React 0.564.0
- **Animations**: Framer Motion 12.34.0
- **Toasts**: Sonner 2.0.7

### State Management & Data
- **Global State**: Zustand 5.0.11
- **Server State**: TanStack Query 5.90.21
- **Forms**: React Hook Form 7.71.1 + Zod 4.3.6
- **Tables**: TanStack Table 8.21.3

### Features
- **Maps**: MapLibre GL 5.18.0 + react-map-gl 8.1.0 (100% gratis, sin API key)
- **Drag & Drop**: @dnd-kit (core, sortable, utilities)
- **Rich Text**: Tiptap 3.19.0 + starter-kit
- **Charts**: Recharts 3.7.0
- **Dates**: date-fns 4.1.0

### Utilities
- **CSS**: clsx 2.1.1, tailwind-merge 3.4.0
- **Variants**: class-variance-authority 0.7.1
- **Animations**: tailwindcss-animate 1.0.7

---

## 🎨 DECISIONES DE ARQUITECTURA

### 1. **Tailwind CSS: Downgrade de v4 a v3**

**Decisión**: Usar Tailwind CSS 3.4.19 en lugar de v4
**Razón**: Tailwind CSS 4 está en versiones tempranas y tiene problemas de compatibilidad con:
- Next.js 16 + Turbopack
- shadcn/ui
- Sistema de plugins PostCSS

**Beneficios**:
- ✅ Estabilidad comprobada
- ✅ Compatibilidad total con shadcn/ui
- ✅ Plugin `tailwindcss-animate` funcionando correctamente
- ✅ Build sin errores

**Configuración PostCSS** (`postcss.config.mjs`):
```js
{
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

### 2. **Design System Neutro Profesional**

**Colores principales**:
- `--bg-page`: #F5F5F7 (Apple-style gray)
- `--bg-card`: #FFFFFF (blanco puro)
- `--text-primary`: #111827 (Gray-900)
- `--border-default`: #E5E7EB (Gray-200)

**Reglas absolutas**:
- ❌ NUNCA gradientes
- ❌ NUNCA sombras de color
- ❌ NUNCA emojis en UI
- ✅ Solo Lucide Icons (outlined)
- ✅ Animaciones máx 0.3s
- ✅ Espaciado en múltiplos de 4px

### 3. **Estructura de Rutas con Route Groups**

**Decisión**: Usar route groups `(public)` y `(backoffice)`
**Razón**: Separación clara entre web pública y CRM sin afectar URLs

```
app/
├── (public)/          # Web pública (sin /public en URL)
│   ├── page.tsx       # → /
│   ├── buscar/        # → /buscar
│   ├── propiedad/[id]/ # → /propiedad/123
│   └── layout.tsx
│
└── (backoffice)/      # CRM (sin /backoffice en URL)
    ├── dashboard/     # → /dashboard
    ├── propiedades/   # → /propiedades
    └── layout.tsx
```

### 4. **MapLibre GL en lugar de Google Maps / Mapbox**

**Decisión**: MapLibre GL JS + OpenFreeMap
**Razón**: 100% gratuito, sin API keys, sin límites

**Comparación**:
| Feature | Google Maps | Mapbox | MapLibre + OFM |
|---------|-------------|--------|----------------|
| Costo | $7/1000 requests | $0.50/1000 loads | $0 SIEMPRE |
| API Key | Sí | Sí | No |
| Vector tiles | No | Sí | Sí |
| WebGL | Limitado | Sí | Sí |
| Clusters | Plugin | Nativo | Nativo |

### 5. **globals.css: Híbrido Custom + shadcn**

**Problema encontrado**: shadcn agregó `@layer base` con clases que causaban errores
**Solución**: Eliminar `@layer base` y mantener variables CSS personalizadas

El archivo `globals.css` contiene:
1. Custom CSS Variables (nuestro design system)
2. shadcn CSS Variables (oklch colors para componentes)
3. @theme inline (mapping de variables)
4. Sin @layer base (causaba conflictos)

---

## 📁 ESTRUCTURA DEL PROYECTO

```
LivooCRMFinal/
├── app/
│   ├── (public)/              # Web pública
│   │   ├── page.tsx           # Home
│   │   ├── buscar/            # Búsqueda con mapa 50/50
│   │   ├── propiedad/[id]/    # Detalle de propiedad
│   │   ├── desarrollos/       # Desarrollos inmobiliarios
│   │   ├── agentes/           # Directorio de agentes
│   │   ├── valuacion/         # Solicitud de valuación
│   │   └── layout.tsx         # Layout público (header + footer)
│   │
│   ├── (backoffice)/          # CRM Backoffice
│   │   ├── dashboard/         # ✅ Dashboard con KPIs
│   │   ├── propiedades/       # ✅ CRUD propiedades (4 vistas)
│   │   ├── captaciones/       # Captación de propiedades
│   │   ├── inventario/        # Vista consolidada stock
│   │   ├── contactos/         # CRM contactos + lead scoring
│   │   ├── oportunidades/     # Pipeline Kanban 12 etapas
│   │   ├── inbox/             # Inbox unificado multi-canal
│   │   ├── tareas/            # Tareas con 3 vistas
│   │   ├── broadcast/         # Broadcast WhatsApp
│   │   ├── email-marketing/   # Email campaigns
│   │   ├── social-planner/    # Planificador social
│   │   ├── campanas/          # Campañas Ads
│   │   ├── automatizaciones/  # Workflow builder visual
│   │   ├── valuacion/         # IA Valuación
│   │   ├── ai-assistant/      # Asistente IA
│   │   ├── analytics/         # Analytics 2.0
│   │   ├── desarrollos/       # Desarrollos (7 tabs)
│   │   ├── bolsa/             # Bolsa inmobiliaria
│   │   ├── reportes/          # Reportes CMA, propietario
│   │   ├── config/            # Configuración
│   │   ├── propietarios/      # Portal propietarios
│   │   └── layout.tsx         # Layout backoffice (sidebar + header)
│   │
│   ├── globals.css            # ✅ Design system + shadcn
│   └── layout.tsx             # ✅ Layout raíz
│
├── components/
│   ├── ui/                    # ✅ shadcn components (16)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── sidebar.tsx        # ⏳ TODO: 21 módulos
│   │   ├── header.tsx         # ⏳ TODO
│   │   ├── page-container.tsx # ⏳ TODO
│   │   └── mobile-nav.tsx     # ⏳ TODO
│   ├── property/
│   │   ├── property-card.tsx
│   │   ├── property-table.tsx
│   │   ├── property-drawer.tsx
│   │   ├── new-property-wizard.tsx
│   │   └── property-filters-sidebar.tsx
│   ├── dashboard/
│   │   ├── kpi-card.tsx
│   │   ├── funnel-chart.tsx
│   │   └── activity-feed.tsx
│   ├── map/
│   │   ├── map-view.tsx       # MapLibre wrapper
│   │   └── property-marker.tsx
│   └── shared/
│
├── lib/
│   ├── utils.ts               # ✅ cn() helper
│   ├── constants.ts           # ⏳ TODO
│   ├── validations.ts         # ⏳ TODO: Zod schemas
│   └── mock-data/
│       ├── properties.ts      # ⏳ TODO: 50+ propiedades
│       ├── contacts.ts        # ⏳ TODO
│       ├── opportunities.ts   # ⏳ TODO
│       └── dashboard.ts       # ⏳ TODO
│
├── types/
│   ├── property.ts            # ⏳ TODO
│   ├── contact.ts             # ⏳ TODO
│   ├── opportunity.ts         # ⏳ TODO
│   ├── task.ts                # ⏳ TODO
│   └── index.ts               # ⏳ TODO
│
├── hooks/
│   ├── use-properties.ts      # ⏳ TODO
│   ├── use-contacts.ts        # ⏳ TODO
│   └── use-toast.ts           # shadcn hook
│
├── public/
│   ├── images/
│   └── icons/
│
├── .gitignore                 # ✅
├── tailwind.config.ts         # ✅ Design system
├── postcss.config.mjs         # ✅
├── tsconfig.json              # ✅
├── next.config.ts             # ✅
├── package.json               # ✅
└── CLAUDE.md                  # 📄 Este archivo
```

**Leyenda**:
- ✅ Completado
- ⏳ Pendiente
- 📄 Documentación

---

## ⚡ COMANDOS IMPORTANTES

### Desarrollo
```bash
npm run dev           # Iniciar servidor de desarrollo
npm run build         # Build de producción
npm run start         # Servidor de producción
npm run lint          # Linter
```

### Instalación de componentes shadcn
```bash
npx shadcn@latest add [component-name]

# Ejemplos:
npx shadcn@latest add table
npx shadcn@latest add command
npx shadcn@latest add toast
```

### Git
```bash
git init
git add .
git commit -m "mensaje"
git push
```

### Deploy a Vercel
```bash
vercel --prod
```

---

## 📊 ESTADO ACTUAL DEL DESARROLLO

### ✅ FASE 0: Scaffolding (95% completo)

**Completado**:
- [x] Proyecto Next.js 16 inicializado
- [x] Tailwind CSS 3 configurado con design system
- [x] globals.css con design tokens completos
- [x] Estructura de carpetas completa
- [x] Stack de dependencias instalado (shadcn, Zustand, MapLibre, etc.)
- [x] Build funcionando sin errores
- [x] 16 componentes shadcn instalados

**Pendiente** (resto de Fase 0):
- [ ] Crear layouts (public y backoffice)
- [ ] Implementar sidebar con 21 módulos
- [ ] Crear tipos TypeScript base
- [ ] Generar mock data inicial (50+ propiedades)
- [ ] Crear placeholder pages para 21 módulos
- [ ] Inicializar git
- [ ] Deploy a Vercel

---

## 🎯 PRÓXIMOS PASOS (Fase 0 - Resto)

### 1. Crear Layouts Base

**`app/(backoffice)/layout.tsx`**:
- Sidebar fijo izquierda (260px)
- Header superior (64px)
- Content area con max-width 1280px
- Responsive (mobile collapse sidebar)

**`app/(public)/layout.tsx`**:
- Header navigation
- Footer con links
- SEO meta tags

### 2. Sidebar con 21 Módulos

**GRUPO 1: CORE CRM**
1. Dashboard
2. Propiedades
3. Captaciones
4. Inventario
5. Contactos 2.0
6. Oportunidades

**GRUPO 2: COMUNICACIÓN**
7. Inbox Unificado
8. Tareas 2.0
9. Broadcast
10. Email Marketing
11. Social Planner
12. Campañas Ads

**GRUPO 3: INTELIGENCIA**
13. Automatizaciones
14. IA Valuación
15. AI Assistant
16. Analytics 2.0

**GRUPO 4: PLATAFORMA**
17. Desarrollos
18. Bolsa Inmobiliaria
19. Reportes 2.0
20. Configuración
21. Propietarios

### 3. Tipos TypeScript

**`types/property.ts`**:
```typescript
export type PropertyType = 'casa' | 'departamento' | 'terreno' | 'local' | 'oficina' | 'bodega';
export type OperationType = 'venta' | 'renta' | 'traspaso';
export type PropertyStatus = 'disponible' | 'apartado' | 'vendido' | 'rentado' | 'inactivo';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  operation: OperationType;
  status: PropertyStatus;
  price: number;
  currency: 'MXN' | 'USD';
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  address: Address;
  description: string;
  features: string[];
  images: string[];
  video?: string;
  tour360?: string;
  agent: Agent;
  healthScore?: number; // 0-100
  createdAt: string;
  updatedAt: string;
}
```

### 4. Mock Data

Crear 50+ propiedades realistas para:
- CDMX (Polanco, Roma, Condesa, Santa Fe)
- Guadalajara (Providencia, Chapultepec)
- Monterrey (San Pedro, Valle)

Con datos completos:
- Precios reales de mercado
- Coordenadas GPS correctas
- Imágenes placeholder
- Health scores variables

---

## 📚 REFERENCIAS

### Documentación del Proyecto
- **Design System**: `/Users/manuelacosta/Downloads/global-design-system.md`
- **Arquitectura v5**: `/Users/manuelacosta/Desktop/LIVOO FINAL v5 ARQUITECTURA.docx`
- **Plan Completo**: `~/.claude/plans/soft-dreaming-shore.md`

### CRMs de Referencia
- **Lone Wolf**: Lead-to-close, relationships CRM
- **Tokko Broker**: Multi-portal, publicación automática
- **Loft**: UX LATAM, fintech integrado
- **GoHighLevel**: Motor de automatizaciones
- **Monopolio**: Inteligencia de mercado
- **EasyBroker**: Bolsa inmobiliaria, MLS
- **Compass**: Búsqueda con mapa 50/50

### Stack Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [MapLibre GL JS](https://maplibre.org)
- [Lucide Icons](https://lucide.dev)
- [TanStack Query](https://tanstack.com/query)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

---

## 🐛 PROBLEMAS RESUELTOS

### 1. Tailwind CSS 4 incompatibilidad
**Error**: `Missing field 'negated' on ScannerOptions.sources`
**Solución**: Downgrade a Tailwind CSS 3.4.19

### 2. PostCSS plugin error
**Error**: `The PostCSS plugin has moved to @tailwindcss/postcss`
**Solución**: Cambiar de `@tailwindcss/postcss` a `tailwindcss` en postcss.config.mjs

### 3. CSS @apply errors
**Error**: `The 'text-foreground' class does not exist`
**Solución**: Eliminar `@layer base` que agregó shadcn

### 4. npm naming restrictions
**Error**: `name can no longer contain capital letters`
**Solución**: Renombrar directorio a minúsculas temporalmente

---

## 💡 TIPS & BEST PRACTICES

### CSS
- Usar SIEMPRE las variables CSS en lugar de hardcodear valores
- Preferir Tailwind classes sobre CSS custom cuando sea posible
- Mantener globals.css organizado por secciones con comentarios

### Components
- Cada componente debe ser reutilizable (DRY)
- Usar shadcn/ui como base, extender cuando sea necesario
- Props tipados con TypeScript strict

### State Management
- Zustand para estado global simple
- TanStack Query para servidor state (cache, refetch, etc.)
- React Hook Form para formularios (no state global)

### Performance
- Lazy load componentes pesados
- Optimizar imágenes con Next.js Image
- Virtualizar listas largas (react-window)
- Code splitting por ruta

### Git Commits
```bash
# Formato recomendado:
git commit -m "feat: agregar sidebar con 21 módulos"
git commit -m "fix: corregir error en property filter"
git commit -m "refactor: mejorar tipos TypeScript"
git commit -m "docs: actualizar CLAUDE.md"
```

---

## 🔐 VARIABLES DE ENTORNO

**`.env.local`** (crear después):
```env
# Supabase (cuando se conecte backend)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# APIs (futuro)
RESEND_API_KEY=
GEMINI_API_KEY=

# URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📝 NOTAS IMPORTANTES

1. **No usar backend todavía**: Todo con mock data hasta completar frontend
2. **Design system es sagrado**: No inventar colores/espaciados fuera del sistema
3. **MapLibre es gratis**: Sin API keys, sin límites, sin sorpresas
4. **shadcn es copy-paste**: Los componentes se copian al proyecto, no es dependency
5. **Presupuesto $0-50/mes**: Priorizar soluciones gratuitas siempre

---

**Última actualización**: 2026-02-13
**Versión**: 0.1.0
**Estado**: FASE 0 - Scaffolding (95%)

---

**🚀 Ready to build a world-class real estate CRM!**
