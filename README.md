# BetrandCliff — Personal Portfolio

A personal portfolio for **Sakwe BetrandCliff**, showcasing selected software projects, engineering capabilities, and professional background. The site pairs an editorial visual style with responsive layouts and subtle motion.

## Built with

- [Next.js](https://nextjs.org/) App Router and React
- TypeScript
- Framer Motion for transitions and scroll reveals
- Lucide for interface icons
- CSS for layout, responsive styling, and visual effects

## Getting started

### Prerequisites

- Node.js 20.9 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
app/                 Pages, layout, and global styles
app/work/[slug]/     Project case-study pages
components/          Navigation, project cards, and reveal animation
data/portfolio.ts    Profile, social links, capabilities, and project content
public/              Static assets
```

## Updating portfolio content

Edit [`data/portfolio.ts`](data/portfolio.ts) to update the profile, email address, social profile URLs, capabilities, project descriptions, and timeline. Project detail pages use the project slugs defined in that file.

The contact page sends a visitor’s name, email, subject, and message directly to BetrandCliff through Resend. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in `.env.local` and in the deployment environment. The sender address must belong to a domain verified with Resend. Update the email and phone details in `data/portfolio.ts` when they change.

## Deployment

Deploy the project to a platform that supports Next.js, such as Vercel. Build the production version with:

```bash
npm run build
```
