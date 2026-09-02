# AyubowanDiJital — Portfolio Site

Next.js 14 (App Router) + Supabase starter matching the AyubowanDiJital flyer:
public portfolio site, plus a password-protected `/admin` panel to manage
projects and reviews.

## 1. Supabase setup

1. Create a project at https://supabase.com.
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`. This
   creates the `projects` and `reviews` tables with Row Level Security
   policies (public read, authenticated-only write).
3. Go to **Authentication > Users > Add user** and create your one admin
   account (email + password). Don't build a public sign-up flow for this.
4. Go to **Project Settings > API** and copy the Project URL, anon key, and
   service_role key.

## 2. Local setup

```bash
npm install
cp .env.local.example .env.local
# paste your Supabase URL + keys into .env.local
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` to sign in as admin.

## 3. Project structure

```
app/
  page.tsx              # public homepage (reads from Supabase)
  admin/
    login/page.tsx       # admin sign-in
    layout.tsx            # admin nav + sign-out
    page.tsx               # admin dashboard
    projects/              # add/delete portfolio projects
    reviews/                 # add/publish/hide/delete client reviews
lib/
  supabase/client.ts    # browser Supabase client
  supabase/server.ts    # server Supabase client + admin (service role) client
  types.ts                 # shared types + static flyer content
middleware.ts            # protects /admin routes, refreshes auth session
supabase/schema.sql     # tables + RLS policies to run once in Supabase
```

## 4. Deploy

1. Push this repo to GitHub.
2. Import it into Vercel (vercel.com > New Project).
3. In Vercel's Project Settings > Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (mark as server-only / sensitive)
4. Deploy.
5. In Project Settings > Domains, add your custom domain and update your
   registrar's DNS records as instructed.

## Notes

- The service-role client (`createAdminClient` in `lib/supabase/server.ts`)
  bypasses RLS — only use it in server-only code that truly needs elevated
  privileges. The rest of the app uses the normal authenticated session,
  which is enough because the RLS policies already restrict writes to
  logged-in users.
- To add more admin users later, just add them the same way in
  Authentication > Users — no code changes needed.
