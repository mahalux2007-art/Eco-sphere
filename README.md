# EcoSphere

**Your Campus. Your Community. Your Impact.**

EcoSphere is a student-driven campus sustainability network where students report environmental
issues, share reusable resources, join green initiatives, and track their campus's collective
impact. This repository contains the **frontend only** — a fully functional, polished React
interface built for a college Full Stack Development project demonstration.

> This is a frontend demo. There is no backend or database yet. Authentication, data persistence
> (via `localStorage`), and the "demo AI" category suggestion are all simulated in the browser so
> the UI can be reviewed and presented end-to-end before a real API exists.

## Tech stack

- **React 19** + **Vite** — build tooling and dev server
- **JavaScript** (no TypeScript)
- **Tailwind CSS** — styling, with a custom forest-green theme
- **React Router** — client-side routing
- **Lucide React** — icon set
- **Recharts** — dashboard and analytics charts

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default. To create a production build:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/
    layout/        # Navbar, Sidebar, Topbar, Footer, Logo, nav config
    ui/             # Reusable primitives: Button, Card, Modal, Badge, forms, etc.
    dashboard/      # Student dashboard widgets
    reports/        # Report cards, filters, detail modal, demo AI panel
    marketplace/    # Listing cards, filters, detail + create modals
    initiatives/    # Initiative cards and icon mapping
    analytics/      # KPI cards and chart components
    landing/        # Landing page hero illustration
  pages/            # One component per route
  layouts/          # PublicLayout (marketing) and AppLayout (sidebar app shell)
  data/              # Seed/sample data + shared constants (categories, statuses, styles)
  services/          # Demo "API" layer — swap these for real REST calls later
  hooks/             # AuthContext, ToastContext, useMediaQuery
  utils/             # storage helpers, date formatting, local demo classifier
```

## Routes

| Route            | Page                         |
| ----------------- | ---------------------------- |
| `/`                | Landing page                 |
| `/login`, `/register` | Demo authentication       |
| `/dashboard`       | Student dashboard             |
| `/reports`         | Environmental reports list    |
| `/reports/new`      | Create a report               |
| `/marketplace`     | Resource-sharing marketplace  |
| `/initiatives`     | Community initiatives         |
| `/analytics`        | Sustainability analytics      |
| `/profile`          | User profile                  |
| `/admin`            | Moderator dashboard (demo role switch required — see profile menu) |

## Demo data & persistence

All reports, listings, initiatives, and profile data live in `src/data/seedData.js` and are copied
into `localStorage` on first load (namespaced under `ecosphere:`). Every read/write goes through
`src/services/*.js`, which already return Promises — so swapping a function body for a real
`fetch()` call to an Express/MongoDB backend later requires no changes to any component.

To reset all demo data, clear your browser's localStorage for this site (or call the `reset*()`
helpers exported from each service file in the browser console).

## Notes for backend integration

- Each file in `src/services/` maps to a likely future REST resource (`/api/reports`,
  `/api/listings`, `/api/initiatives`, `/api/auth`, `/api/profile`).
- Demo authentication (`src/services/authService.js`) does not create real accounts or hash
  passwords — it only simulates a logged-in session in the browser.
- The "demo AI classification" in the report form (`src/utils/demoClassifier.js`) is a local,
  keyword-based function. It does not call any AI model or external service.

## Sample data disclaimer

All statistics, charts, and activity shown throughout the app (landing page stats, dashboard
figures, analytics charts, etc.) are fictional sample data generated for this demonstration. They
do not represent verified real-world environmental measurements.
