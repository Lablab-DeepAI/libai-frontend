This is a Next.js project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and [`supabase-js`](https://supabase.com/docs/reference/javascript/introduction) for user management.

## Getting Started

1.  Install all the dependencies

```bash
pnpm install
```

2. Copy paste the .env.example file to create the .env.local file

```bash
cp env.example .env.local
```

3. Run the Supabase as docker container using the docker images from the instructions given [here](https://supabase.com/docs/guides/self-hosting/docker)

4. Go to .env file inside the supabase repo > docker > .env

- Update the SMTP Section with your smtp credentials

- Remember the following variables value (these will be used in nextjs app)

```bash
DASHBOARD_USERNAME #use this to log into supabase dashboard
DASHBOARD_PASSWORD #use this to log into supabase dashboard
SUPABASE_PUBLIC_URL #use this in nextjs
ANON_KEY #use this in nextjs
```

Finally, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/dashboard/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
