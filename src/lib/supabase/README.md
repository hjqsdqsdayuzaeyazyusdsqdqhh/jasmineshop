# Supabase — future commerce phase only

Supabase is **not integrated** in Phases 1–2. No package is installed, no client
is created, and no network call is made. This folder is reserved for the data
layer.

The environment variables are already declared in `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Planned structure for the data phase

```
src/lib/supabase/
  client.ts        # browser client (public/anon key)
  server.ts        # server client for RSC and route handlers
  admin.ts         # service-role client, server only — never imported by client code
  middleware.ts    # optional session refresh, called from src/proxy.ts
src/types/
  database.ts      # generated types (supabase gen types typescript)
```

## Recommended next steps

1. Create the Supabase project and run the schema migrations.
2. Install `@supabase/supabase-js` (and `@supabase/ssr` if auth/session is needed).
3. Add `client.ts` / `server.ts` using the env variables above.
4. Generate `src/types/database.ts` and type every query.
5. Keep the anon key read-only with Row Level Security; never expose the service
   role key to the browser.

Product imagery is expected to live in Supabase Storage (public bucket) and be
served through `next/image` with a `remotePatterns` entry in `next.config.ts`.
