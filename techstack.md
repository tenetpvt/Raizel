| Layer             | Choice                                | Why                                                                                                        |
| ----------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Framework         | **Next.js + React + TypeScript**      | Full-stack React app, routing, server/client components, easy deployment                                   |
| Styling           | **Tailwind CSS**                      | Fast iteration and precise design-system implementation                                                    |
| Components        | **shadcn/ui**                         | Accessible primitives without forcing a visual style                                                       |
| Animation         | **Motion for React**                  | Excellent for the quest → light → constellation interactions, layout transitions and springs ([Motion][1]) |
| Smooth scrolling  | **Lenis**                             | Lightweight, performant smooth scrolling, ideal for your landing page ([Lenis][2])                         |
| Constellation     | **Custom SVG + Motion**               | Better than bringing in a huge 3D engine for this product                                                  |
| Forms             | **React Hook Form + Zod**             | Clean validation for quests, auth and settings                                                             |
| Database          | **Supabase PostgreSQL**               | Relational data fits quests, completions, attributes, streaks, inventory and purchases extremely well      |
| Auth              | **Supabase Auth**                     | Integrated with the database and has an official Next.js/App Router path ([Supabase][3])                   |
| Client state      | **Zustand**                           | Only for UI/transient state; don't use it as your database                                                 |
| Server/data layer | **Next.js Server Actions + Supabase** | Keeps architecture relatively simple                                                                       |
| Deployment        | **Vercel**                            | First-class Next.js hosting and preview deployments ([Vercel][4])                                          |
| Fonts             | **Geist + Inter**                     | Fits the existing Raizel aesthetic                                                                         |
| Icons             | **Lucide React**                      | Consistent thin-line iconography                                                                           |

[1]: https://motion.dev/docs/react?utm_source=chatgpt.com "Get started - React Animation Library - Motion.dev"
[2]: https://lenis.darkroom.engineering/?utm_source=chatgpt.com "Lenis – Smooth Scroll"
[3]: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs?utm_source=chatgpt.com "Use Supabase with Next.js"
[4]: https://vercel.com/docs/frameworks/full-stack/nextjs?utm_source=chatgpt.com "Next.js on Vercel"
