import { lazy, Suspense } from 'react'
import { Reveal, SectionTitle, useScrollInput } from './components/ui'
import { profile } from './data'

const Scene = lazy(() => import('./components/Scene'))

const LIVE = 'https://d4tf-connect.com'
const REPO = 'https://github.com/mbyv/D4TF-CONECT'

const meta = [
  ['Role', 'Founder & sole engineer'],
  ['Timeline', '2023 — present'],
  ['Platform', 'Web · UK B2B'],
  ['Status', 'Live in production'],
]

const stack = ['Next.js 14 (App Router)', 'TypeScript', 'Supabase Auth', 'PostgreSQL + RLS', 'Supabase Storage', 'Stripe Checkout', 'Companies House API', 'Tailwind CSS', 'Vercel']

const glance = [
  { value: '2', label: 'User roles served by one codebase: brands & manufacturers' },
  { value: '6', label: 'Postgres tables, every one protected by Row-Level Security' },
  { value: '4', label: 'Trust tiers computed in the database, not the UI' },
  { value: '£0 / £3', label: 'Pay-per-action pricing: free requests, paid offers' },
]

function Code({ title, children }: { title: string; children: string }) {
  return (
    <figure className="code">
      <figcaption className="mono small"><span className="dots"><i /><i /><i /></span>{title}</figcaption>
      <pre><code>{children.trim()}</code></pre>
    </figure>
  )
}

function Decision({ n, title, why, children, code, codeTitle }: { n: string; title: string; why: string; children: React.ReactNode; code: string; codeTitle: string }) {
  return (
    <Reveal>
      <article className="decision">
        <div className="decision-text">
          <span className="mono accent small">Decision {n}</span>
          <h3>{title}</h3>
          <p className="why">{why}</p>
          <div className="muted body">{children}</div>
        </div>
        <Code title={codeTitle}>{code}</Code>
      </article>
    </Reveal>
  )
}

export default function CaseStudy() {
  const progressRef = useScrollInput()

  return (
    <>
      <div className="bg-gradient" aria-hidden />
      <Suspense fallback={null}><Scene orb={false} /></Suspense>
      <div className="grain" aria-hidden />
      <div className="progress" ref={progressRef} aria-hidden />

      <header className="nav">
        <a href="../" className="logo mono">&lt;PO /&gt;</a>
        <nav className="always">
          <a href="../#work" className="back">← <span className="hide-sm">Back to</span> portfolio</a>
          <a className="btn small" href={LIVE} target="_blank" rel="noreferrer">Live site ↗</a>
        </nav>
      </header>

      <main className="cs">
        {/* HERO */}
        <section className="cs-hero">
          <Reveal>
            <p className="mono accent">Case study · 01</p>
            <h1>D4TF Connect</h1>
            <p className="cs-sub">
              A live B2B marketplace where UK fashion brands post production requests and manufacturers compete to make them.
              I designed, built and run it on my own, from the Postgres schema to the payments flow.
            </p>
            <dl className="meta">
              {meta.map(([k, v]) => (
                <div key={k}><dt className="mono muted small">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <ul className="tags big">{stack.map((s) => <li key={s}>{s}</li>)}</ul>
            <div className="cta">
              <a className="btn primary" href={LIVE} target="_blank" rel="noreferrer">Visit d4tf-connect.com ↗</a>
              <a className="btn" href={REPO} target="_blank" rel="noreferrer">Read the source ↗</a>
            </div>
          </Reveal>
        </section>

        {/* AT A GLANCE */}
        <section className="tight">
          <div className="glance">
            {glance.map((g, i) => (
              <Reveal key={g.label} delay={i * 80}>
                <div className="card stat">
                  <span className="stat-value">{g.value}</span>
                  <span className="muted small">{g.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROBLEM + PIVOT */}
        <section>
          <SectionTitle index="01." title="The problem" />
          <div className="two-col">
            <Reveal>
              <div className="card glass prose">
                <p>
                  Independent UK fashion brands need manufacturers they can trust for small and mid-sized production runs.
                  Manufacturers need a steady stream of serious, well-specified work. Usually the two sides find each other
                  through word of mouth, cold emails and guesswork.
                </p>
                <p className="muted">
                  D4TF Connect turns that into a simple loop: a brand posts what it needs (quantity, budget, deadline),
                  manufacturers see a live feed of requests and send offers, and the brand picks the best fit. Profiles carry
                  portfolios, contact links and a verification badge, so both sides know who they're dealing with.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ol className="flow">
                <li><span className="step mono">01</span><div><strong>Brand posts a request</strong><p className="muted small">Title, spec, quantity, budget, deadline. Free.</p></div></li>
                <li><span className="step mono">02</span><div><strong>Manufacturers send offers</strong><p className="muted small">From a live production feed, with a price and message. £3 per offer.</p></div></li>
                <li><span className="step mono">03</span><div><strong>Brand picks the best fit</strong><p className="muted small">Compares offers, reviews portfolios and verification, then gets in touch directly.</p></div></li>
              </ol>
            </Reveal>
          </div>
        </section>

        <section>
          <SectionTitle index="02." title="The pivot" />
          <Reveal>
            <div className="pivot">
              <div className="card glass pivot-card before">
                <span className="pill">Before · Dressforthefuture</span>
                <h3>Multi-brand storefront</h3>
                <div className="mini-diagram mono small">
                  <span>Brands</span><i>→</i><span>Storefront</span><i>→</i><span>Shoppers</span>
                </div>
                <p className="muted small">A B2C MVP selling products from several brands to consumers.</p>
              </div>
              <div className="pivot-arrow mono accent" aria-hidden>user feedback ⟶</div>
              <div className="card glass pivot-card after">
                <span className="pill live">After · D4TF Connect</span>
                <h3>Two-sided B2B marketplace</h3>
                <div className="mini-diagram mono small">
                  <span>Brands</span><i>⇄</i><span>Requests / Offers</span><i>⇄</i><span>Manufacturers</span>
                </div>
                <p className="muted small">The real pain was finding production partners, not selling to consumers.</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <p className="lead muted cs-note">
              Early conversations with users showed the bigger opportunity was on the supply side, so I changed direction rather
              than polishing the wrong product. That meant <strong>re-architecting the data model</strong> around roles,
              requests and offers, and <strong>rebuilding the frontend</strong> as two role-specific dashboards plus public
              directories.
            </p>
          </Reveal>
        </section>

        {/* ARCHITECTURE */}
        <section>
          <SectionTitle index="03." title="Architecture" />
          <Reveal>
            <div className="arch card glass">
              <div className="arch-col">
                <span className="arch-label mono small muted">Client</span>
                <div className="node">Browser<small>Brand & manufacturer dashboards, directories, profiles</small></div>
              </div>
              <div className="arch-link" aria-hidden />
              <div className="arch-col">
                <span className="arch-label mono small muted">Edge · Next.js on Vercel</span>
                <div className="node accent-node">Middleware<small>Refreshes Supabase session cookies · role-based redirects</small></div>
                <div className="node">App Router pages<small>Server & client components</small></div>
                <div className="node">API routes<small>/stripe/create-payment · /stripe/webhook · /stripe/confirm-session · /verify/*</small></div>
              </div>
              <div className="arch-link" aria-hidden />
              <div className="arch-col">
                <span className="arch-label mono small muted">Data & services</span>
                <div className="node violet-node">Supabase Postgres<small>6 tables · RLS on all · triggers & SQL functions</small></div>
                <div className="node">Supabase Auth & Storage<small>Email + SMS OTP · per-user portfolio folders</small></div>
                <div className="node">Stripe Checkout<small>GBP card payments · signed webhooks</small></div>
                <div className="node">Companies House API<small>Checks that a company exists and is active</small></div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* DECISIONS */}
        <section>
          <SectionTitle index="04." title="Key engineering decisions" />
          <div className="decisions">
            <Decision
              n="01"
              title="Authorization lives in the database"
              why="If an API route ever has a bug, Postgres still refuses the query."
              codeTitle="supabase/migrations/001_initial_schema.sql"
              code={`
-- Brands can see offers on their own requests only
CREATE POLICY "offers_select_brand_on_own_requests"
  ON public.offers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.production_requests pr
      WHERE pr.id = offers.request_id
        AND pr.brand_id = auth.uid()
    )
  );

-- One offer per manufacturer per request
UNIQUE (request_id, manufacturer_id)`}
            >
              <p>
                Every table has Row-Level Security turned on. Manufacturers see the whole production feed; brands see only
                their own requests and the offers on them. A competitor can't read another manufacturer's quote, even with
                a hand-crafted query.
              </p>
              <p>A signup trigger creates each user's profile from their auth metadata, so no account is ever left without a role.</p>
            </Decision>

            <Decision
              n="02"
              title="Pay first, create second, and safe to retry"
              why="The send-offer flow writes the offer only after Stripe confirms the £3 payment."
              codeTitle="src/app/api/stripe/webhook/route.ts"
              code={`
event = stripe.webhooks.constructEvent(
  body, signature, process.env.STRIPE_WEBHOOK_SECRET!
)

if (event.type === 'checkout.session.completed') {
  // offer payload was parked in pending_offer_data
  const { request_id, price, message } =
    payment.pending_offer_data

  const { error } = await supabase.from('offers')
    .insert({ request_id, manufacturer_id, price, message })

  // 23505 = unique violation → already created. Idempotent.
  if (error && !error.code?.includes('23505')) log(error)
}`}
            >
              <p>
                When a manufacturer sends an offer, the API stores the offer details in a pending payment record and
                redirects to Stripe Checkout. The offer row is written only after payment is confirmed.
              </p>
              <p>
                Confirmation arrives two ways: a <strong>signature-verified webhook</strong>, and the success page checking
                the session directly with Stripe. Webhooks can be late or arrive twice, so both paths are idempotent. The
                unique constraint means a duplicate insert is harmless. Free actions skip Stripe entirely, and prices are set
                in pence through environment variables.
              </p>
            </Decision>

            <Decision
              n="03"
              title="Trust is computed in Postgres, not the UI"
              why="A marketplace lives or dies on trust, so the rules belong next to the data."
              codeTitle="supabase/migrations/003_portfolio_min5.sql"
              code={`
IF p.phone_verified THEN
  tier := 'basic';
  IF length(trim(p.bio)) >= 40
     AND trim(p.city) <> ''
     AND links_count >= 1
     AND (p.role = 'brand' OR portfolio_count >= 5)
  THEN
    tier := 'verified';
    IF p.companies_house_verified THEN
      tier := 'trusted';
    END IF;
  END IF;
END IF;`}
            >
              <div className="tiers">
                <span>Unverified</span><i>→</i><span>Basic<small>SMS OTP</small></span><i>→</i>
                <span>Verified<small>complete profile</small></span><i>→</i><span className="trusted">Trusted<small>Companies House</small></span>
              </div>
              <p>
                A SQL function calculates each profile's tier, and triggers re-run it whenever portfolio images or contact
                links change. UK mobile numbers are confirmed by SMS one-time code, and an API route checks a company number
                against Companies House, accepting only <em>active</em> companies.
              </p>
              <p>
                After launch I raised the bar for manufacturers from 1 to 5 portfolio images with a single migration. The
                tier logic didn't need any frontend changes.
              </p>
            </Decision>

            <Decision
              n="04"
              title="Role-aware routing at the edge"
              why="Each role lands in the right dashboard before a page even renders."
              codeTitle="src/lib/supabase/middleware.ts"
              code={`
if (user && (pathname.startsWith('/brand')
          || pathname.startsWith('/manufacturer'))) {
  const { data: profile } = await supabase
    .from('profiles').select('role')
    .eq('id', user.id).single()

  if (pathname.startsWith('/brand') && profile.role !== 'brand')
    return NextResponse.redirect(new URL('/manufacturer', request.url))
  if (pathname.startsWith('/manufacturer') && profile.role !== 'manufacturer')
    return NextResponse.redirect(new URL('/brand', request.url))
}`}
            >
              <p>
                Next.js middleware refreshes the Supabase session cookie on every request, sends signed-out visitors to
                login (remembering where they were going), and keeps brands and manufacturers inside their own route
                groups. Directories and public profiles stay open, which helps with SEO and sharing.
              </p>
            </Decision>
          </div>
        </section>

        {/* LESSONS */}
        <section>
          <SectionTitle index="05." title="What I learned" />
          <div className="lessons">
            {[
              ['Talk to users before polishing', 'The pivot came from conversations, not analytics. Changing direction early was cheaper than perfecting a storefront nobody needed.'],
              ['Put rules where they can’t be skipped', 'Permissions and trust tiers in Postgres stay correct whatever the UI or API does: one source of truth.'],
              ['Assume payments are messy', 'Webhooks retry, arrive late or arrive twice. Designing for idempotency up front made the payment flow boring, which is what you want.'],
              ['Own the whole slice', 'Being the only engineer meant schema, auth, payments, UI, deployment and go-to-market. Each part shaped the others.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="card glass lesson">
                  <span className="mono accent small">0{i + 1}</span>
                  <h3>{t}</h3>
                  <p className="muted small">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="contact">
          <Reveal>
            <h2 className="contact-title">Want this kind of ownership<br /><span className="gradient-text">on your team?</span></h2>
            <div className="cta center">
              <a className="btn primary big" href={`mailto:${profile.email}?subject=Opportunity%20for%20Prosper`}>Get in touch ✉</a>
              <a className="btn big" href="../#work">See more projects</a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer mono muted small">
        <span>Designed & built by {profile.name}</span>
        <a href="../">← Back to portfolio</a>
      </footer>
    </>
  )
}
