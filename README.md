# Prosper Otonye: Portfolio

Dark, futuristic 3D portfolio built with **React 19, TypeScript, Vite and Three.js (React Three Fiber)**, using custom GLSL shaders.

- Flowing particle "data ocean" and morphing particle orb that react to scroll and mouse
- 3D-tilt project cards, scroll reveals, typing effect and scroll progress bar
- Fewer particles on phones; respects "reduced motion"; the 3D bundle lazy-loads so text appears instantly
- **Case study page** for D4TF Connect at `/d4tf-connect/` (`src/CaseStudy.tsx`)
- **CV**: edit `cv/cv.html`, then run `node cv/build-cv.cjs` to regenerate `public/Prosper_Otonye_CV.pdf`
- **All content lives in `src/data.ts`**, so you can edit text, projects and links there

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Deploy for free (Vercel, recommended)
1. Create a new GitHub repo (e.g. `portfolio`) and push this folder to it.
2. Go to vercel.com → **Add New → Project** → import the repo. Vercel detects Vite automatically.
3. Click **Deploy**. You get a URL like `prosper-otonye.vercel.app` (rename it under Settings → Domains).

Netlify works the same way (build command `npm run build`, publish directory `dist`).
