// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: 'Prosper Otonye',
  firstName: 'Prosper',
  roles: ['Full-Stack Developer', 'React & Next.js Engineer', 'Vue.js Developer', 'Python / Django Engineer', 'Node.js & Postgres Builder', 'AI-Augmented Engineer'],
  location: 'London, UK',
  availability: 'Available now · open to full-time roles',
  email: 'prosperbillions162@gmail.com',
  github: 'https://github.com/mbyv',
  linkedin: 'https://www.linkedin.com/in/prosper-otonye-69689225b',
  cv: './Prosper_Otonye_CV.pdf',
  summary:
    "I've been building for the web for 6+ years. I started freelancing at 18, shipping sites for real clients, and grew into a full-stack engineer who takes products from a blank repo to paying users. I own features end-to-end, from database schema to deployed UI, and use an AI-augmented workflow to move fast without cutting corners on tests, CI or code quality.",
}

export const stats = [
  { value: '6+', label: 'Years building for the web, starting as a freelancer at 18' },
  { value: '7+', label: 'Projects shipped end-to-end' },
  { value: '2', label: 'Live products founded, built & run solo' },
  { value: '0 → 1', label: 'Idea to production: schema, UI, payments, deploy' },
]

export const skillGroups = [
  { title: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5 / CSS3', 'React Native', 'UI/UX'] },
  { title: 'Backend & Data', items: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'Supabase', 'Prisma', 'Firebase', 'REST APIs', 'Stripe'] },
  { title: 'Quality & Delivery', items: ['Jest', 'Vitest', 'Cypress', 'GitHub Actions CI/CD', 'Vercel / Netlify', 'Docker', 'Git / GitHub'] },
  { title: 'AI & Growth', items: ['Claude / Vercel AI SDK', 'AI Agents', 'Prompt Engineering', 'SEO Auditing', 'Lighthouse Perf', 'WordPress'] },
]

export type Project = {
  title: string
  tagline: string
  description: string
  tags: string[]
  github?: string
  live?: string
  caseStudy?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'D4TF Connect',
    tagline: 'B2B fashion marketplace · live',
    description:
      'Live marketplace connecting UK fashion brands with manufacturers. Auth, brand & manufacturer directories and a pay-per-action pricing model. Pivoted from a storefront MVP based on user feedback — re-architected the data model and rebuilt the frontend.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL'],
    github: 'https://github.com/mbyv/D4TF-CONECT',
    live: 'https://d4tf-connect.com',
    caseStudy: './d4tf-connect/',
    featured: true,
  },
  {
    title: 'ApplyFlow AI',
    tagline: 'AI career platform · monorepo',
    description:
      'AI-powered career OS: resume understanding, gap analysis and tailored applications. pnpm monorepo with a standalone Express/Prisma API, Claude via the Vercel AI SDK, ADRs, CI and end-to-end tests from day one.',
    tags: ['Next.js 15', 'React 19', 'Supabase', 'Prisma', 'Vercel AI SDK'],
    github: 'https://github.com/mbyv/applyflow-ai',
    live: 'https://applyflow-ai-ecru.vercel.app',
    featured: true,
  },
  {
    title: 'Future of Work',
    tagline: 'Marketing landing page',
    description: 'Landing page designed, built and deployed independently — responsive, fast and SEO-ready.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/mbyv/futureworklandingpage',
    live: 'https://futureworklandingpage.vercel.app',
  },
  {
    title: 'DDL Body Repair',
    tagline: 'Client website · live',
    description:
      'Website for DDL Body Repair, a vehicle body-repair business. Designed and built for a real client: responsive, fast, and focused on turning visitors into enquiries.',
    tags: ['Client project', 'Responsive', 'Vercel'],
    live: 'https://ddl-body-repair.vercel.app',
  },
  {
    title: 'D4TF Backend',
    tagline: 'Containerised service',
    description: 'Python backend service scaffold for D4TF Connect, containerised for deployment.',
    tags: ['Python', 'Docker'],
    github: 'https://github.com/mbyv/d4tf-backend',
  },
  {
    title: 'Recipe App',
    tagline: 'Discovery app',
    description: 'Recipe discovery app deployed on Firebase Hosting.',
    tags: ['JavaScript', 'Firebase'],
    live: 'https://my-recipe-app-f87aa.web.app',
  },
  {
    title: 'Animal Charity Website',
    tagline: 'University coursework',
    description: 'Static charity website built from scratch for CN4003 at the University of East London.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/mbyv/CN4003-Web-Project',
  },
]

export const experience = [
  {
    role: 'Founder & Full-Stack Developer',
    company: 'D4TF Connect',
    period: '2023 — Present',
    points: [
      'Built and shipped a live B2B marketplace (Next.js, TypeScript, Supabase/PostgreSQL) with auth, directories and pay-per-action pricing.',
      'Pivoted from a storefront MVP to a marketplace on user feedback — re-architected the data model and rebuilt the frontend.',
      'Sole engineer across the full lifecycle: schema design, auth, UI, deployment and go-to-market.',
    ],
  },
  {
    role: 'WordPress Developer & SEO Engineer (Contract)',
    company: 'Tecric — Digital Agency',
    period: '2024 — 2025',
    points: [
      'Delivered 3 production client sites with custom themes and plugins built to spec.',
      'Ran full SEO audits and on-page optimisation, improving Lighthouse scores and organic rankings.',
      'Cut average page load times through asset, caching and technical SEO work.',
    ],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'NovaBridge Digital',
    period: 'Jun 2023 — Dec 2023',
    points: [
      'Built reusable Next.js + TypeScript components for a shared component library.',
      'Wrote unit/integration tests (Jest, Vitest) and Cypress end-to-end suites for core flows.',
      'Shipped inside a GitHub Actions CI/CD pipeline, integrating Node.js REST APIs.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Patricia Technologies',
    period: '2021 — 2023',
    points: [
      'Built and maintained responsive interfaces in HTML, CSS and JavaScript from design handoff.',
      'Took part in code reviews with the product team.',
    ],
  },
  {
    role: 'Freelance Web Developer',
    company: 'Self-employed',
    period: '2020 — 2021',
    points: [
      'Started freelancing at 18, designing and building websites for clients and taking each one from brief to launch.',
      'Taught myself the modern stack on real projects: React, Vue.js, Python and Django.',
      'Learned to scope work, communicate with clients and deliver on deadlines, which I still rely on today.',
    ],
  },
]

export const education = [
  { title: 'CertHE Computer Science', place: 'University of East London', period: '2023 — 2025' },
  { title: 'Foundation Degree — Political Science', place: 'University of Lagos', period: '2021 — 2022' },
]
