# 🏢 LivooCRMFinal - Documentación del Proyecto

> **Plataforma Inmobiliaria LOFT - Implementación Frontend**
> Web pública LOFT-styled + Backoffice CRM | Presupuesto: $0-50 USD/mes

---

## 📋 RESUMEN DEL PROYECTO

**LivooCRMFinal** es una plataforma inmobiliaria completa inspirada en **LOFT** (Brasil), que consta de:

1. **Web Pública LOFT**: Sitio para búsqueda de propiedades con diseño premium, mapas interactivos, y captación de leads
2. **Portal para Agencias**: Landing pages para agencias inmobiliarias y CRM
3. **Backoffice CRM**: Sistema completo con 21 módulos para gestión inmobiliaria

**Estado actual**: Fase 1 & 2 completadas (Design System + Home Page LOFT)

**Próximos pasos**: Completar Home Page → Property Detail → Search/Filters → CRM Module

---

## 🛠️ STACK TECNOLÓGICO

### Core
- **Framework**: Next.js 16.1.6 (App Router)
- **Runtime**: React 19.2.4
- **Language**: TypeScript 5.9.3 (strict mode)
- **Styling**: Tailwind CSS 3.4.19

### UI & Components
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React 0.564.0 + react-icons 4.12.0
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

---

## 🎨 SISTEMA DE DISEÑO LOFT

### Colores de Marca LOFT
```css
/* Brand Colors */
--loft-orange:       #FF6B35;  /* Color principal LOFT */
--loft-orange-hover: #E65A2B;  /* Hover states */
--loft-orange-light: #FFF4F0;  /* Backgrounds */
--loft-red-dark:     #8B1E1E;  /* Gradient accent */
--loft-gradient-start: #FF6B35;
--loft-gradient-end:   #8B1E1E;

/* Semantic Colors */
--color-green:     #22C55E;  /* Success, WhatsApp */
--color-red:       #EF4444;  /* Errors */
--color-amber:     #F59E0B;  /* Warnings */
--color-blue:      #3B82F6;  /* Info */
```

### Tipografía
```css
/* Font Family */
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Typography Scale (LOFT Extended) */
--text-xs:    12px;
--text-sm:    14px;
--text-base:  16px;
--text-md:    18px;
--text-lg:    20px;
--text-xl:    24px;
--text-2xl:   28px;
--text-3xl:   32px;
--text-4xl:   40px;
--text-5xl:   48px;  /* Hero headlines */
--text-6xl:   56px;  /* Large hero headlines */
```

### Botones LOFT
- **Primario**: Fondo naranja (#FF6B35), texto blanco
- **Secundario**: Fondo blanco, borde naranja
- **Hover**: Naranja oscuro (#E65A2B)

### Espaciado
- Sistema base: 8px
- Section gaps: 40px (mobile) / 60px (tablet) / 80px (desktop)

---

## 📁 ESTRUCTURA DEL PROYECTO

```
LivooCRMFinal/
├── app/
│   ├── page.tsx               # ✅ Home LOFT
│   ├── globals.css            # ✅ Design system LOFT + shadcn
│   └── layout.tsx             # ✅ Root layout
│
├── components/
│   ├── ui/                    # ✅ shadcn components
│   │   ├── badge.tsx          # ✅ Con variantes LOFT
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ...
│   │
│   ├── layout/                # ✅ Layout components
│   │   ├── loft-header.tsx    # ✅ Header LOFT sticky
│   │   ├── loft-footer.tsx    # ✅ Footer 6 columnas + WhatsApp
│   │   ├── sidebar.tsx        # Sidebar CRM (backoffice)
│   │   └── header.tsx         # Header backoffice
│   │
│   ├── home/                  # ✅ Home page components
│   │   ├── hero-section.tsx   # ✅ Hero con gradiente
│   │   ├── service-cards.tsx  # ✅ 4 tarjetas de servicios
│   │   └── featured-properties.tsx # ✅ Grid de propiedades
│   │
│   ├── search/                # ✅ Search components
│   │   └── search-module.tsx  # ✅ Módulo de búsqueda con tabs
│   │
│   ├── property/              # ✅ Property components
│   │   └── property-card.tsx  # ✅ Card con carrusel de imágenes
│   │
│   └── dashboard/             # ⏳ CRM components (futuro)
│
├── lib/
│   ├── utils.ts               # ✅ cn() helper
│   └── mock-data/             # Mock data (futuro)
│       └── properties.ts
│
├── types/                     # TypeScript types (futuro)
│   └── property.ts
│
├── public/
│   ├── hero-couple.jpg        # ✅ Imagen hero
│   ├── property1.jpg          # ✅ Apartamento moderno
│   ├── property2.jpg          # ✅ Casa exterior
│   ├── property3.jpg          # ✅ Studio interior
│   └── property4.jpg          # ✅ Loft luxury
│
├── package.json               # ✅ Dependencies
├── tailwind.config.ts         # ✅ LOFT design tokens
└── CLAUDE.md                  # 📄 Este archivo
```

---

## 🎯 ESTADO ACTUAL - FASE 1 & 2 COMPLETADAS

### ✅ FASE 1: Design System Foundation (COMPLETO)

**Implementado**:
- [x] Colores de marca LOFT (naranja #FF6B35, rojo #8B1E1E)
- [x] Tipografía extendida hasta 56px para héroes
- [x] Sistema de botones con naranja como primario
- [x] Badges con variantes LOFT (new, propertyType, success)
- [x] Header sticky con navegación y CTA
- [x] Footer 6 columnas con WhatsApp flotante
- [x] Espaciado consistente (sistema 8px)

**Archivos modificados**:
- `app/globals.css` - Design tokens LOFT
- `components/ui/badge.tsx` - Variantes LOFT
- `components/layout/loft-header.tsx` - Header con logo y menú
- `components/layout/loft-footer.tsx` - Footer completo

---

### ✅ FASE 2: Home Page (COMPLETO)

**Implementado**:
- [x] Hero section con gradiente naranja/rojo
- [x] Módulo de búsqueda con tabs (Comprar/Alugar)
- [x] 4 tarjetas de servicios con iconos
- [x] Grid de propiedades destacadas con filtros
- [x] Property cards con carrusel de imágenes
- [x] Botón de favoritos funcional
- [x] 5 imágenes generadas con IA

**Componentes creados**:
- `components/home/hero-section.tsx` - Hero con gradiente
- `components/home/service-cards.tsx` - 4 servicios
- `components/home/featured-properties.tsx` - Grid de propiedades
- `components/search/search-module.tsx` - Búsqueda con tabs
- `components/property/property-card.tsx` - Card con carrusel

**Mock Data**:
```typescript
// 4 propiedades de muestra
- Apartamento moderno (R$ 1.200.000) - Jardim Paulista
- Casa espaciosa (R$ 2.500.000) - Pinheiros
- Studio charmoso (R$ 480.000) - Vila Madalena
- Loft de luxo (R$ 1.800.000) - Itaim Bibi
```

---

## 📸 CAPTURAS DE PANTALLA

### Hero Section
![Hero Section](file:///Users/manuelacosta/.gemini/antigravity/brain/e2009bd0-f9fe-4258-b07e-d6daa2b3422d/hero_section_1771038599377.png)

**Características**:
- Gradiente naranja → rojo oscuro
- Headline grande y clara
- Módulo de búsqueda integrado
- Imagen de pareja con llaves
- Wave divider SVG

### Service Cards
![Service Cards](file:///Users/manuelacosta/.gemini/antigravity/brain/e2009bd0-f9fe-4258-b07e-d6daa2b3422d/service_cards_1771038604801.png)

**4 Servicios**:
1. Encuentra una agencia inmobiliaria
2. Vender o alquilar mi propiedad
3. Financia tu propiedad
4. Agencia inmobiliaria, únete a Loft

### Featured Properties
![Featured Properties](file:///Users/manuelacosta/.gemini/antigravity/brain/e2009bd0-f9fe-4258-b07e-d6daa2b3422d/featured_properties_1771038609584.png)

**Características**:
- Tabs de filtros (Novidades, 3 quartos, etc.)
- Grid 4 columnas responsive
- Cards con carrusel de imágenes
- Badges "Chegou hoje" + tipo de propiedad
- Botón de favoritos
- Precio destacado en BRL
- Iconos de características (m², quartos, baños, vagas)

### Footer
![Footer](file:///Users/manuelacosta/.gemini/antigravity/brain/e2009bd0-f9fe-4258-b07e-d6daa2b3422d/footer_section_1771038616152.png)

**Estructura**:
- 6 columnas de links
- Redes sociales
- WhatsApp flotante (verde)
- Copyright © 2026 Loft

---

## 🚀 PRÓXIMOS PASOS

### Fase 2 (Pendiente)
- [ ] Sección "Curadoria Loft" (propiedades temáticas)
- [ ] Links de ciudades y barrios

### Fase 3: Property Detail Page
- [ ] Galería de imágenes con lightbox
- [ ] Información detallada de la propiedad
- [ ] Sidebar sticky con formulario de contacto
- [ ] Calculadora de financiamiento
- [ ] Secciones expandibles (ubicación, ambientes, simulador)
- [ ] Propiedades similares

### Fase 4: Search & Filters
- [ ] Página de búsqueda avanzada
- [ ] Filtros laterales (precio, habitaciones, amenidades)
- [ ] Grid de resultados
- [ ] Ordenamiento

### Fase 5: Agency Portal
- [ ] Landing page para agencias
- [ ] Soluciones por objetivo
- [ ] Carrusel de logos de partners

### Fase 6: CRM Module
- [ ] Landing page CRM
- [ ] Comparación con/sin LOFT CRM
- [ ] Planes de precios (4 cards)
- [ ] Tabla comparativa de features
- [ ] Integraciones
- [ ] Add-ons

### Fase 7: Optimization
- [ ] Lazy loading de imágenes
- [ ] Skeleton loading states
- [ ] Performance optimization
- [ ] SEO meta tags
- [ ] Responsive testing

---

## ⚡ COMANDOS IMPORTANTES

### Desarrollo
```bash
npm run dev           # ✅ Servidor en http://localhost:3000
npm run build         # Build de producción
npm run start         # Servidor de producción
npm run lint          # Linter
```

### Instalación de componentes shadcn
```bash
npx shadcn@latest add [component-name]
```

---

## 📊 COMPONENTES IMPLEMENTADOS

### Layout Components
| Component | Path | Estado |
|-----------|------|--------|
| LOFT Header | `components/layout/loft-header.tsx` | ✅ |
| LOFT Footer | `components/layout/loft-footer.tsx` | ✅ |
| Page Container | `components/layout/page-container.tsx` | ✅ |

### UI Components
| Component | Features | Estado |
|-----------|----------|--------|
| Badge | 3 variantes LOFT (new, propertyType, success) | ✅ |
| Button | Estilo naranja LOFT | ✅ |
| Input | Con iconos | ✅ |
| Select | Dropdown custom | ✅ |

### Home Components
| Component | Description | Estado |
|-----------|-------------|--------|
| Hero Section | Gradiente + búsqueda | ✅ |
| Service Cards | 4 servicios con iconos | ✅ |
| Featured Properties | Grid + filtros | ✅ |
| Search Module | Tabs Comprar/Alugar | ✅ |
| Property Card | Carrusel + favoritos | ✅ |

---

## 🎨 BRAND CONSISTENCY

**LOFT Orange (#FF6B35)** se usa consistentemente en:
- ✅ Botones primarios
- ✅ Tabs activos en filtros
- ✅ Hover de iconos
- ✅ Links hover
- ✅ CTAs destacados
- ✅ Gradientes de hero

**Gradiente LOFT**: `linear-gradient(to right, #FF6B35, #D45B29, #8B1E1E)`

---

## 📝 FEATURES IMPLEMENTADAS

### Property Card
- ✅ Carrusel de imágenes (múltiples fotos)
- ✅ Navegación prev/next (visible on hover)
- ✅ Indicadores de puntos
- ✅ Contador de fotos
- ✅ Badge "Chegou hoje" (amarillo)
- ✅ Badge tipo de propiedad (gris)
- ✅ Botón de favoritos (toggle)
- ✅ Precio destacado en BRL
- ✅ Dirección truncada
- ✅ Iconos de características (m², quartos, baños, vagas)
- ✅ Botón "Ver contato"
- ✅ Hover effects

### Search Module
- ✅ Tabs Comprar/Alugar
- ✅ Input de ubicación con icono
- ✅ Select tipo de inmueble
- ✅ Select número de habitaciones
- ✅ Botón de búsqueda naranja
- ✅ Link "Buscar por características"

### Hero Section
- ✅ Gradiente naranja → rojo
- ✅ Headline 48-56px
- ✅ Subheadline descriptivo
- ✅ Search module integrado
- ✅ Imagen de pareja (desktop)
- ✅ Wave divider SVG

---

## 🌐 RESPONSIVE DESIGN

Todos los componentes son responsive:
- **Header**: Hamburger menu en mobile
- **Hero**: Layout stacked en mobile, side-by-side en desktop
- **Service Cards**: 1 col (mobile) → 2 (tablet) → 4 (desktop)
- **Property Grid**: 1 col (mobile) → 2 (tablet) → 4 (desktop)
- **Footer**: 2-3 cols (mobile) → 6 (desktop)
- **Filter Tabs**: Scroll horizontal en mobile

---

## 📚 REFERENCIAS

### Documentación Técnica
- **Plan de Implementación**: `brain/implementation_plan.md`
- **Walkthrough Fase 1 & 2**: `brain/walkthrough.md`
- **Tareas**: `brain/task.md`

### Inspiración de Diseño
- **LOFT Brasil**: https://loft.com.br
- **Compass**: Búsqueda con mapa 50/50
- **Tokko Broker**: Multi-portal
- **EasyBroker**: UX LATAM

### Stack Documentation
- [Next.js 16 Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [MapLibre GL JS](https://maplibre.org)
- [Lucide Icons](https://lucide.dev)

---

## 📈 ESTADÍSTICAS DEL PROYECTO

### Archivos Creados (Fase 1 & 2)
- **10 componentes** nuevos LOFT
- **5 imágenes** generadas con IA
- **1 archivo** de estilos actualizado
- **4 propiedades** mock data

### Performance
- **Build Time**: 485ms (Next.js 16.1.6 Turbopack)
- **Page Load**: ~941ms (compile + render)
- **Imágenes**: Optimizadas con Next.js Image
- **Bundle**: Route-based code splitting

---

## 💡 TIPS & BEST PRACTICES

### CSS LOFT
- Usar variables CSS LOFT (`--loft-orange`, `--loft-gradient-start`)
- Mantener consistencia de color naranja en toda la plataforma
- Gradientes solo en hero sections
- Sombras sutiles (no de color)

### Components LOFT
- Property cards deben tener carrusel de imágenes
- Todos los CTAs principales en naranja
- Badges consistentes (amarillo new, gris type)
- Hover effects suaves (0.2-0.3s)

### Responsive LOFT
- Mobile-first approach
- Tabs con scroll horizontal en mobile
- Grids adaptables: 1 → 2 → 4 columnas
- Imágenes optimizadas para todos los tamaños

---

**Última actualización**: 2026-02-13 21:15
**Versión**: 2.0.0
**Estado**: FASE 1 & 2 COMPLETADAS ✅

**URL Local**: http://localhost:3000

---

## 🎉 LISTO PARA CONTINUAR

El proyecto tiene implementado:
✅ Design system LOFT completo
✅ Home page funcional con todos los componentes
✅ Property cards interactivos
✅ Sistema de navegación
✅ Footer completo
✅ Imágenes profesionales

**Próximo objetivo**: Completar secciones finales de Home + Property Detail Page 🚀
