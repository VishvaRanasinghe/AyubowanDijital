import { createClient } from "@/lib/supabase/server";
import { SUPPORT_AREAS, WHY_US, type Project, type Review } from "@/lib/types";
import Image from "next/image";
import StructuredData from "@/components/StructuredData";
import ProjectCard from "@/components/ProjectCard";

export const revalidate = 60; // refresh content every 60s

export default async function HomePage() {
  const supabase = createClient();

  const [{ data: projects }, { data: reviews }] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("reviews")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return (
    <main className="min-h-screen bg-ink bg-circuit">
      <StructuredData />
      
      {/* NAV */}
      <header className="sticky top-0 z-50 mx-auto flex w-full items-center justify-between border-b border-line bg-ink/90 px-6 py-4 backdrop-blur-md">
        <div className="flex w-full max-w-6xl items-center justify-between mx-auto">
          <a
            href="#"
            className="font-display text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded"
            aria-label="AyubowanDiJital Home"
          >
            AyubowanDi<span className="text-signal">J</span>ital
          </a>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-mist" aria-label="Main Navigation">
            <a href="#services" className="hover:text-signalBright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded px-1">Services</a>
            <a href="#work" className="hover:text-signalBright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded px-1">Recent Work</a>
            <a href="#reviews" className="hover:text-signalBright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded px-1">Reviews</a>
            <a href="#contact" className="hover:text-signalBright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded px-1">Contact</a>
          </nav>

          <a
            href="https://wa.me/94763022689"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-signal/60 px-5 py-2 text-sm font-semibold text-signalBright transition hover:bg-signal/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright"
            aria-label="Message us on WhatsApp"
          >
            WhatsApp Us
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-mist">
            Technology & Professional Solutions
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl md:leading-tight">
            Your requirement.
            <br />
            <span className="text-signal">Our expertise.</span>
          </h1>
          <p className="mt-5 max-w-md text-mist text-lg">
            From academic support and research to modern technology, data, and business solutions. We deliver the precise expertise you need to scale and succeed.
          </p>
          <a
            href="https://wa.me/94763022689"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-signal px-7 py-3 font-semibold text-ink transition hover:bg-signalBright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Start a Conversation
          </a>
        </div>

        <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80 glow-node">
          <Image
            src="/logo.jpg"
            alt="AyubowanDiJital futuristic circuit logo"
            fill
            className="rounded-full object-cover"
            priority
            sizes="(max-width: 768px) 256px, 320px"
          />
        </div>
      </section>

      {/* WHAT WE SUPPORT */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-14 scroll-mt-20">
        <h2 className="font-display text-2xl font-bold text-signalBright">
          What We Support
        </h2>
        <div className="section-divider mt-3" />
        <ul className="mt-8 divide-y divide-line">
          {SUPPORT_AREAS.map((area) => (
            <li key={area.title} className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-2 py-4">
              <span className="font-semibold text-lg sm:text-base">{area.title}</span>
              <span className="text-mist hidden sm:inline">—</span>
              <span className="text-mist leading-relaxed">{area.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-center font-display text-2xl font-bold text-signalBright">
          Why AyubowanDiJital?
        </h2>
        <div className="section-divider mx-auto mt-3 max-w-xs" />
        <div className="mt-10 grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
          {WHY_US.map((item) => (
            <div key={item.title}>
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-mist">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-14 scroll-mt-20">
        <h2 className="font-display text-2xl font-bold text-signalBright">
          Recent Work
        </h2>
        <div className="section-divider mt-3" />
        {projects && projects.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {(projects as Project[]).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-line p-10 text-center text-mist">
            <p>We are currently updating our portfolio. Check back soon for our latest projects!</p>
          </div>
        )}
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="mx-auto max-w-6xl px-6 py-14 scroll-mt-20">
        <h2 className="font-display text-2xl font-bold text-signalBright">
          What Clients Say
        </h2>
        <div className="section-divider mt-3" />
        {reviews && reviews.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {(reviews as Review[]).map((r) => (
              <div
                key={r.id}
                className="flex flex-col justify-between rounded-xl border border-line bg-panel p-6 shadow-sm"
              >
                <div>
                  <p className="text-signal text-lg" aria-label={`${r.rating} out of 5 stars`}>
                    {"★".repeat(r.rating)}<span className="text-line">{"★".repeat(5 - r.rating)}</span>
                  </p>
                  <p className="mt-4 text-sm text-mist italic leading-relaxed">"{r.comment}"</p>
                </div>
                <p className="mt-4 text-sm font-semibold text-right">— {r.client_name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-line p-10 text-center text-mist">
            <p>Client testimonials will be appearing here shortly.</p>
          </div>
        )}
      </section>

      {/* CONTACT / FOOTER */}
      <footer
        id="contact"
        className="mx-auto max-w-6xl px-6 py-16 text-center text-sm text-mist scroll-mt-20"
      >
        <div className="section-divider mx-auto mb-8 max-w-xs" />
        <h2 className="font-display text-xl font-bold text-white mb-6">Get In Touch</h2>
        <address className="not-italic space-y-4">
          <p>
            <span className="block font-semibold text-mist mb-1">WhatsApp / Phone</span>
            <a
              href="https://wa.me/94763022689"
              className="text-signalBright hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded px-1 text-lg font-medium"
            >
              +94 76 302 2689
            </a>
          </p>
          <p>
            <span className="block font-semibold text-mist mb-1">Email</span>
            <a
              href="mailto:hello@ayubowandijital.com"
              className="text-signalBright hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded px-1"
            >
              hello@ayubowandijital.com
            </a>
          </p>
          <div className="pt-4 mt-6 border-t border-line max-w-xs mx-auto">
            <p>
              <a href="https://facebook.com/AyubowanDiJital" target="_blank" rel="noopener noreferrer" className="hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded px-1">
                Facebook
              </a>
              {" • "}
              <a href="/" className="hover:text-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signalBright rounded px-1">
                Website
              </a>
            </p>
            <p className="mt-6 text-xs text-line">© {new Date().getFullYear()} AyubowanDiJital. All rights reserved.</p>
          </div>
        </address>
      </footer>
    </main>
  );
}
