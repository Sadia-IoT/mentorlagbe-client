# MentorLagbe — Client

A full-stack tuition marketplace for Bangladesh, built with **Next.js 16 (App Router)** and a separate **Express + MongoDB** API. Students browse admin-approved batches and apply; tutors publish listings and decide on applicants; admins moderate content and track Pro revenue.

This repository is the **client**. The API lives in `../mentorlagbe-server`.

- **Live site:** https://mentorlagbe-client-cyan.vercel.app
- **Live API:** https://mentorlagbe-server-five.vercel.app
- **Client repo:** https://github.com/Sadia-IoT/mentorlagbe-client
- **Server repo:** https://github.com/Sadia-IoT/mentorlagbe-server

---

## 1. Design concept — “Academic Editorial”

The UI deliberately avoids the usual purple-gradient marketplace template. It is built like a printed academic register:

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#FAF6EE` | Warm cream page background |
| Ink | `#12211D` | Near-black green text |
| Emerald | `#0E7C66` | Primary actions, links, verified marks |
| Amber | `#E8A33D` | Pro accents, highlighter marks |
| Display | Fraunces | Headings, prices, editorial numbers |
| Body | Inter | Interface text |

Signature details:

- **“Tuition Pass” cards** — a coloured spine per subject, dashed perforation line, pass-style fee block, equal-height cards.
- **Numbered section eyebrows** (`01 — FEATURED`, `02 — HOW IT WORKS`) that read like chapters.
- **Amber highlighter underline** on key words, paper dot-grid backgrounds, tape-corner photo collage in the hero.
- **Numbered dashboard sidebar** (`01`, `02`, `03`…) with collapse support and a mobile drawer.
- **Dark mode** via CSS variables, remembered in `localStorage`, with a pre-paint script to avoid a flash.
- Custom **loading, error and 404** screens written in the same editorial voice.

---

## 2. Feature map

### Public

- `/` — hero search, featured batches, workflow, top subjects, live stats, testimonials, pricing preview, tutor CTA.
- `/tuitions` — **server-side** search, subject/class/mode filters, and pagination (9 per page) rendered from URL search params.
- `/tuitions/[id]` — full details, tutor summary, reviews, sticky fee panel, role-aware apply button, bookmark toggle.
- `/pricing` — Free vs Pro Tutor ($15) vs Pro Student ($10), comparison table, FAQ, Stripe Checkout entry points.
- `/payment/success` — verifies the Stripe session server-side before showing success.
- `/payment/cancel` — friendly no-charge confirmation.
- `/about` — story, moderation promise, workflow and FAQ.
- `/sign-in`, `/sign-up` — split editorial layout, role cards, one-click demo credentials, safe `redirect` support.

### Student dashboard

- Overview stats (applied, accepted, pending, plan, bookmarks).
- My applications — cancel while pending, leave one review after acceptance.
- Saved tuitions — bookmark list with 5-item Free limit messaging.

### Tutor dashboard

- Overview stats, free-post quota banner, recent applicants.
- Post a tuition — validated form, **ImgBB file upload** or URL, pending-review notice.
- My tuitions — edit, close/reopen, delete (with confirmation), rejection feedback.
- Applicants — status tabs, accept/reject, phone + schedule + note.

### Admin dashboard

- Overview — user split, pending queue, revenue summary.
- User management — search, role filter, pagination, role changes (cannot demote yourself).
- Tuition approval — status tabs, search, pagination, approve / reject / back-to-pending.
- Transactions — Stripe ledger, revenue total, search + pagination.

---

## 3. Business rules enforced with the API

- Only `student` accounts can apply; tutors and admins see a locked notice.
- Duplicate applications to the same tuition are blocked (API + unique index).
- Free tutor: **max 2 tuition posts**; Pro tutor: unlimited.
- Free student: **max 5 bookmarks**; Pro student: unlimited.
- Only accepted students can review, once per application.
- Public browse only shows `approvalStatus: "approved"` + `isActive: true`.
- Tuition fees are displayed in **BDT (৳)**; Stripe charges are in **USD**.
- New sign-ups can only be `student` or `tutor`; `admin` is assigned manually.

---

## 4. Tech stack

- **Next.js 16.4** App Router, React 19, Turbopack
- **Tailwind CSS 4** with a CSS-variable design system (no component library)
- **Better Auth 1.7** — email/password, MongoDB adapter, JWT plugin
- **lucide-react** icons, **react-hot-toast** notifications
- **Stripe Checkout** (test mode) through the Express API
- **ImgBB** uploads proxied through the Express API (API key never reaches the browser)

Auth architecture:

1. Better Auth stores users in the shared `users` collection with `role` and `plan` fields.
2. The client calls `authClient.token()` and sends `Authorization: Bearer <jwt>` to Express.
3. Express verifies the JWT with `verifyToken` plus `verifyStudent` / `verifyTutor` / `verifyAdmin`.

---

## 5. Getting started

### Prerequisites

- Node.js 20+
- MongoDB Atlas connection string (or local MongoDB)
- The API server running (see `../mentorlagbe-server/README.md`)

### Install

```bash
npm install
cp .env.example .env.local   # then fill in real values
```

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | yes | Express API base URL, e.g. `http://localhost:5000` |
| `BETTER_AUTH_URL` | yes | This app’s URL, e.g. `http://localhost:3000` |
| `BETTER_AUTH_SECRET` | yes | Long random string used to sign sessions/JWTs |
| `MONGODB_URI` | yes | MongoDB connection string (same database as the API) |
| `DB_NAME` | no | Database name, defaults to `mentorlagbe` |

### Seed demo data

```bash
npm run seed
```

This creates **1 admin, 6 tutors, 6 students, 15 tuitions (12 approved), 8 applications (3 with reviews), 5 payments and bookmarks** using Better Auth’s real sign-up API, so every demo password works.

### Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
```

The API must be running first, otherwise public pages render empty states and dashboards show an error note.

---

## 6. Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@mentorlagbe.com` | `Admin@1234` |
| Tutor | `tutor1@mentorlagbe.dev` | `Tutor@1234` |
| Student | `student1@mentorlagbe.dev` | `Student@1234` |

All seeded tutors use `Tutor@1234` (`tutor1` … `tutor6`). All seeded students use `Student@1234` (`student1` … `student6`).

The sign-in page also has demo chips that fill these credentials automatically.

---

## 7. Project structure

```
app/
  (public)/            # marketing + browse pages (Navbar/Footer layout)
    page.js            # home
    tuitions/          # browse + details
    pricing/
    payment/success|cancel
    about/
    sign-in/ sign-up/
  dashboard/           # protected workspace (server session guard)
    layout.js          # auth check + DashboardShell
    student/ tutor/ admin/ profile/
  api/auth/[...all]/   # Better Auth route handler
  error.js  not-found.js  loading.js
components/
  ui/                  # Button, Field, Card, Badge, Modal, Skeleton, Photo…
  layout/              # Navbar, Footer, Logo, Avatar, ThemeToggle
  home/                # Hero + landing sections
  tuitions/            # Card, Filters, ApplyPanel, BookmarkButton, Form…
  dashboard/           # Shell, StatsCard, PageHeader, useApi
  auth/ payments/
lib/
  api.js               # fetch wrapper + Bearer JWT + FormData
  server-api.js        # server-component fetcher
  auth-config.mjs      # shared Better Auth factory (app + seed)
  dashboard-nav.js     # role navigation
  constants.js utils.js upload.js subject-icons.js
scripts/seed.mjs
```

---

## 8. Deployment checklist

1. Deploy the Express API (Render/Railway/Fly) and note its public URL.
2. Create the Next.js project on Vercel and set:
   - `NEXT_PUBLIC_API_URL` → API URL
   - `BETTER_AUTH_URL` → deployed client URL
   - `BETTER_AUTH_SECRET`, `MONGODB_URI`, `DB_NAME`
3. Add the client URL to the API’s `CLIENT_URL` CORS allow-list.
4. Set the API’s Stripe `success_url` / `cancel_url` to the deployed `/payment/success` and `/payment/cancel`.
5. Register the Stripe webhook at `POST /payments/webhook`.
6. Run `npm run seed` once against the production database (or create the admin manually).

### Demo limitations

- `STRIPE_SECRET_KEY` and `IMGBB_API_KEY` ship as placeholders. Without real keys, checkout and uploads return **503** with a clear message; every other flow works.
- Stripe runs in **test mode** — use card `4242 4242 4242 4242`.
- Pro is modelled as a one-time upgrade (`plan: "pro"`), not a recurring subscription.

---

## 9. Assignment requirement coverage

- 4 business collections: `users`, `tuitions`, `applications`, `payments` (Better Auth adds its internal session/account collections).
- JWT-protected API with `verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`.
- Server-side search, filtering and pagination on browse, admin users, moderation and transactions.
- Real image upload to ImgBB through the API proxy.
- 20+ client commits and 12+ server commits, each one a self-contained feature.
- Responsive at 360 px → 1440 px, equal-height cards, consistent heading/button system, custom loading/error/404 pages, toast feedback everywhere.
