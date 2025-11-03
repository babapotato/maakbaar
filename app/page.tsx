"use client";

import { useEffect } from "react";
import BackgroundCanvas from "@/components/ui/background-canvas";

export default function Page() {
  useEffect(() => {
    // Drag-to-scroll for gallery
    const el = document.getElementById("gallery");
    if (el) {
      let isDown = false, startX = 0, scrollLeft = 0;
      const start = (x: number) => { isDown = true; startX = x - el.offsetLeft; scrollLeft = el.scrollLeft; (el as HTMLElement).style.cursor = "grabbing"; };
      const move = (x: number) => { if(!isDown) return; const walk = (x - el.offsetLeft - startX); el.scrollLeft = scrollLeft - walk; };
      const end = () => { isDown = false; (el as HTMLElement).style.cursor = ""; };
      const md = (e: MouseEvent) => start(e.pageX);
      const mm = (e: MouseEvent) => move(e.pageX);
      const mu = () => end();
      const ml = () => end();
      const ts = (e: TouchEvent) => start(e.touches[0].pageX);
      const tm = (e: TouchEvent) => move(e.touches[0].pageX);
      const te = () => end();
      el.addEventListener("mousedown", md);
      el.addEventListener("mousemove", mm);
      el.addEventListener("mouseup", mu);
      el.addEventListener("mouseleave", ml);
      el.addEventListener("touchstart", ts, { passive: true });
      el.addEventListener("touchmove", tm, { passive: true });
      el.addEventListener("touchend", te);
      return () => {
        el.removeEventListener("mousedown", md);
        el.removeEventListener("mousemove", mm);
        el.removeEventListener("mouseup", mu);
        el.removeEventListener("mouseleave", ml);
        el.removeEventListener("touchstart", ts);
        el.removeEventListener("touchmove", tm);
        el.removeEventListener("touchend", te);
      };
    }
  }, []);

  useEffect(() => {
    // Reveal-on-scroll animations
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // Active nav highlight on section
    const sections = Array.from(document.querySelectorAll("section"));
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("#main-menu .nav-link"));
    const byId = (id: string) => links.find(a => a.getAttribute("href") === `#${id}`);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = (entry.target as HTMLElement).id;
        links.forEach(l => l.classList.remove("active"));
        const active = byId(id);
        if (active) active.classList.add("active");
      });
    }, { threshold: 0.55 });
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // Footer year
    const el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }, []);

  return (
    <>
      <BackgroundCanvas />

      {/* Fixed pill navigation (always visible) */}
      <div className="nav-wrap" aria-hidden="false">
        <div className="nav-inner">
          <nav id="main-menu" className="nav-menu" role="navigation" aria-label="Primary">
            <a className="nav-link" href="#home">Home</a>
            <a className="nav-link" href="#portfolio">Portfolio</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#contact">Contact</a>
          </nav>
        </div>
      </div>

      {/* Hero / Value Proposition */}
      <section id="home" className="container">
        <div className="section-card hero reveal">
          <h1>Design & Photography that feels like you</h1>
          <p className="lead">We are Marie & Max — crafting clean visuals and thoughtful stories. Explore selected work and get in touch for collaborations.</p>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="container">
        <div className="section-card reveal">
          <p className="lead">Swipe or drag to browse. Optimized for fast, responsive viewing.</p>
          <div className="gallery-wrap">
            <div className="gallery" id="gallery">
              <figure className="gallery-item"><img loading="lazy" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" alt="Project 1" /><figcaption className="caption">Editorial shoot</figcaption></figure>
              <figure className="gallery-item"><img loading="lazy" src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop" alt="Project 2" /><figcaption className="caption">Brand identity</figcaption></figure>
              <figure className="gallery-item"><img loading="lazy" src="https://images.unsplash.com/photo-1520974944082-7c0a2a7a6596?q=80&w=1600&auto=format&fit=crop" alt="Project 3" /><figcaption className="caption">Lookbook</figcaption></figure>
              <figure className="gallery-item"><img loading="lazy" src="https://images.unsplash.com/photo-1517817748496-58ffb0a67e16?q=80&w=1600&auto=format&fit=crop" alt="Project 4" /><figcaption className="caption">Product set</figcaption></figure>
              <figure className="gallery-item"><img loading="lazy" src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?q=80&w=1600&auto=format&fit=crop" alt="Project 5" /><figcaption className="caption">Studio series</figcaption></figure>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="container">
        <div className="section-card reveal">
          <p className="lead">Two people, one studio. We combine design clarity with human warmth.</p>
          <div className="about-grid">
            <article className="bio">
              <img loading="lazy" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" alt="Portrait of Marie" />
              <div>
                <h3>Marie</h3>
                <p>Designer focused on clean systems, typography, and brand experiences. Believes in less but better.</p>
              </div>
            </article>
            <article className="bio">
              <img loading="lazy" src="https://images.unsplash.com/photo-1544005310-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" alt="Portrait of Max" />
              <div>
                <h3>Max</h3>
                <p>Photographer and retoucher. Tells stories with light and subtle color—always people-first.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container">
        <div className="section-card reveal">
          <p className="lead">We'd love to hear from you. Reach out directly or use the form.</p>
          <div className="contact-grid">
            <div>
              <ul className="list">
                <li><strong>Email:</strong> <a href="mailto:hello@example.com">hello@example.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a></li>
                <li><strong>LinkedIn (Marie):</strong> <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/">View profile</a></li>
                <li><strong>LinkedIn (Max):</strong> <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/">View profile</a></li>
                <li><strong>Instagram:</strong> <a target="_blank" rel="noreferrer" href="https://www.instagram.com/">@studiohandle</a></li>
              </ul>
            </div>
            <div>
              <form action="https://formspree.io/f/your-id" method="POST">
                <input type="hidden" name="_subject" value="New inquiry from portfolio" />
                <label>
                  <span style={{display:"block",margin:"0 0 6px 2px",color:"var(--muted)",fontWeight:600}}>Name</span>
                  <input type="text" name="name" placeholder="Your name" required />
                </label>
                <label>
                  <span style={{display:"block",margin:"0 0 6px 2px",color:"var(--muted)",fontWeight:600}}>Email</span>
                  <input type="email" name="email" placeholder="you@example.com" required />
                </label>
                <label>
                  <span style={{display:"block",margin:"0 0 6px 2px",color:"var(--muted)",fontWeight:600}}>Message</span>
                  <textarea name="message" placeholder="Tell us about your project" required />
                </label>
                <button className="btn" type="submit">Send message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="container">
        <small>© <span id="year"></span> Marie & Max. All rights reserved.</small>
      </footer>
    </>
  );
}


