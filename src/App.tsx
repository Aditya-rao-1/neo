import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowDownRight, ArrowUpRight, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, Instagram, MapPin, Menu, Minus, MoveUpRight, Phone, Plus, Scissors, Sparkles, Star, X } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
const phone = '9380248044';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=2nd%20Floor%2C%20Shiribeedu%20Towers%2C%20Grassland%20Commercial%2C%20near%20Service%20Bus%20Stand%2C%20opposite%20Tourist%20Complex%2C%20Moodanidambur%20Village%2C%20Udupi%2C%20Karnataka%20576101';

const services = {
  Hair: [
    ['Precision cut', 'Shape, movement, and a cut that grows out beautifully.'],
    ['Colour studio', 'Dimensional colour, gloss, and considered transformations.'],
    ['Blow dry ritual', 'A polished finish for the days that deserve one.'],
    ['Texture + styling', 'Editorial waves, sleek finishes, and event-ready work.'],
  ],
  Nails: [
    ['Neo manicure', 'Clean, detailed, quietly exact.'],
    ['Gel colour', 'High-shine colour with a precise finish.'],
    ['Nail art', 'Graphic details, micro art, and custom sets.'],
    ['Extensions', 'Length and structure designed around your hands.'],
  ],
  Grooming: [
    ['Signature grooming', 'Hair, beard, and finish — all in one rhythm.'],
    ['Classic shave', 'Warm towel, clean lines, considered pace.'],
    ['Men’s cuts', 'Modern shapes for work, weekends, and everywhere between.'],
    ['Skin rituals', 'A reset for skin that has places to be.'],
  ],
  Bridal: [
    ['Bride direction', 'A complete beauty direction for your day.'],
    ['Groom direction', 'Sharp, calm, and photographed from every angle.'],
    ['Couple prep', 'A shared appointment, shaped around your timeline.'],
    ['Jewellery rental', 'Statement finishing pieces for the moment.'],
  ],
} as const;

const gallery = [
  { src: '/images/hero.jpg', tag: 'Hair', title: 'The new silhouette' },
  { src: '/images/nails.jpg', tag: 'Nails', title: 'A little graphic' },
  { src: '/images/grooming.jpg', tag: 'Grooming', title: 'Clean confidence' },
  { src: '/images/bridal.jpg', tag: 'Bridal', title: 'The quiet entrance' },
  { src: '/images/still-life.jpg', tag: 'Studio', title: 'Objects of beauty' },
  { src: '/images/hero.jpg', tag: 'Hair', title: 'Light / movement' },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header({ onMenu }: { onMenu: () => void }) {
  const [, setLocation] = useLocation();
  return (
    <header className="neo-header">
      <button className="neo-mark" onClick={() => setLocation('/')} aria-label="Back to NEO home" data-testid="button-logo">
        <span>NEO</span><i />
      </button>
      <nav className="neo-nav" aria-label="Primary navigation">
        <a href="#services" data-testid="link-services">Services</a>
        <a href="#studio" data-testid="link-studio">The studio</a>
        <a href="#gallery" data-testid="link-gallery">Journal</a>
        <a href="#visit" data-testid="link-visit">Visit</a>
      </nav>
      <a href="#appointment" className="neo-header-cta" data-testid="link-book-header">Request an appointment <ArrowUpRight size={15} /></a>
      <button className="neo-menu-button" onClick={onMenu} aria-label="Open menu" data-testid="button-menu"><Menu size={23} /></button>
    </header>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
    <div className="mobile-menu-top"><span className="watermark-small">NEO</span><button onClick={onClose} aria-label="Close menu" data-testid="button-close-menu"><X /></button></div>
    <nav>
      {['Services', 'The studio', 'Journal', 'Visit'].map((item) => <a key={item} href={`#${item === 'The studio' ? 'studio' : item.toLowerCase()}`} onClick={onClose} data-testid={`link-mobile-${item.toLowerCase().replace(' ', '-')}`}>{item}</a>)}
      <a href="#appointment" className="menu-appointment" onClick={onClose} data-testid="link-mobile-appointment">Request an appointment <ArrowUpRight size={20} /></a>
    </nav>
    <p>Unisex salon / nails studio<br />Udupi, Karnataka</p>
  </div>;
}

function Hero() {
  return <section className="hero" id="home">
    <div className="hero-watermark" aria-hidden="true">NEO</div>
    <div className="hero-copy" data-reveal>
      <div className="eyebrow"><span className="green-dot" /> Unisex salon / nails studio <span className="eyebrow-line" /> Udupi</div>
      <h1>Beauty,<br /><em>with a point</em><span>.</span></h1>
      <p className="hero-intro">A contemporary beauty studio for hair, nails, grooming, and the people who make their own rules.</p>
      <a className="neo-button" href="#appointment" data-testid="link-book-hero">Start with a conversation <ArrowUpRight size={17} /></a>
    </div>
    <div className="hero-image-wrap" data-reveal>
      <img src="/images/hero.jpg" alt="Editorial portrait showing a sculptural modern haircut in the NEO studio" />
      <div className="image-caption"><span>01 / NEO, Udupi</span><span>New energy, daily</span></div>
    </div>
    <a className="scroll-cue" href="#manifesto" aria-label="Scroll to explore" data-testid="link-scroll"><span>Scroll to explore</span><ArrowDownRight size={18} /></a>
  </section>;
}

function Manifesto() {
  return <section className="manifesto section-dark" id="manifesto">
    <div className="section-kicker"><span>02</span><span className="rule" /><span>Our point of view</span></div>
    <div className="manifesto-layout" data-reveal>
      <p className="display-quote">Not a makeover.<br /><em>A mark of you.</em></p>
      <div className="manifesto-body"><p>NEO is a salon for the in-between — where a clean cut meets a little chaos, where getting ready becomes part of the day you’re making.</p><p>Come as you are. Leave more like yourself.</p><a href="#studio" className="text-link">Meet the studio <ArrowDownRight size={16} /></a></div>
    </div>
    <div className="manifesto-stats"><div><strong>4.7</strong><span>Google rating <Star size={13} fill="currentColor" /></span></div><div><strong>U</strong><span>Unisex, always</span></div><div><strong>01</strong><span>Studio in Udupi</span></div></div>
  </section>;
}

function ServiceExplorer() {
  const [category, setCategory] = useState<keyof typeof services>('Hair');
  useEffect(() => {
    // Service rows are replaced when a tab changes, so the page-level reveal
    // observer cannot see the newly mounted elements. Reveal the active menu
    // after its next paint so every category has visible content.
    const frame = window.requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLElement>('.service-list [data-reveal]')
        .forEach((node) => node.classList.add('is-visible'));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [category]);

  return <section className="services-section" id="services">
    <div className="section-kicker"><span>03</span><span className="rule" /><span>The menu</span></div>
    <div className="services-heading" data-reveal><h2>Find your<br /><em>next move.</em></h2><p>From a quick reset to the full transformation. Tell us where you’re headed, we’ll help shape the way there.</p></div>
    <div className="service-explorer">
      <div className="service-tabs" role="tablist" aria-label="Service categories">
        {(Object.keys(services) as Array<keyof typeof services>).map((item, i) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} role="tab" aria-selected={category === item} data-testid={`tab-service-${item.toLowerCase()}`}><span>0{i + 1}</span>{item}<ArrowUpRight size={15} /></button>)}
      </div>
      <div className="service-list" key={category}>
        {services[category].map(([name, desc], i) => <div className="service-row" key={name} data-reveal><span className="row-index">0{i + 1}</span><div><h3>{name}</h3><p>{desc}</p></div><ArrowUpRight size={18} /></div>)}
        <a href="#appointment" className="text-link service-link" data-testid="link-service-request">Request the full menu <ArrowUpRight size={16} /></a>
      </div>
    </div>
  </section>;
}

function FeatureStrip() {
  return <section className="feature-strip" id="studio">
    <div className="feature-image"><img src="/images/nails.jpg" alt="Close-up of graphic electric green and black nail art" /><span className="vertical-label">NAIL / DETAIL / FORM</span></div>
    <div className="feature-copy" data-reveal><div className="section-kicker"><span>04</span><span className="rule" /><span>Small details</span></div><h2>Hands say<br /><em>everything.</em></h2><p>Our nail studio is a space for precision and play. Clean shapes, graphic colour, tiny details that change the whole composition.</p><a href="#appointment" className="neo-button dark-button" data-testid="link-book-nails">Explore nails <ArrowUpRight size={17} /></a></div>
  </section>;
}

function SplitEditorial() {
  return <section className="split-editorial">
    <div className="editorial-copy" data-reveal><div className="section-kicker"><span>05</span><span className="rule" /><span>All in the edit</span></div><h2>One studio.<br /><em>Every version.</em></h2><p>Hair that moves. A beard that holds its line. Nails that start a conversation. Bridal and groom direction for a day you’ll replay forever.</p><div className="mini-links"><a href="#appointment">For couples <ArrowUpRight size={14} /></a><a href="#appointment">Jewellery rental <ArrowUpRight size={14} /></a></div></div>
    <div className="editorial-image"><img src="/images/grooming.jpg" alt="Stylish man with a contemporary textured haircut in graphite light" /><div className="editorial-image-caption">Grooming / NEO studio</div></div>
  </section>;
}

function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = useMemo(() => filter === 'All' ? gallery : gallery.filter((item) => item.tag === filter), [filter]);
  return <section className="gallery-section section-dark" id="gallery">
    <div className="section-kicker"><span>06</span><span className="rule" /><span>From the journal</span></div>
    <div className="gallery-top" data-reveal><h2>Seen at<br /><em>NEO.</em></h2><div><p>Hair, hands, faces, light. A living archive of the studio and the people who pass through it.</p><a className="insta-link" href="https://www.instagram.com/neounisexsalonudupi" target="_blank" rel="noreferrer" data-testid="link-instagram-top"><Instagram size={16} /> @neounisexsalonudupi</a></div></div>
    <div className="gallery-filters">{['All', 'Hair', 'Nails', 'Grooming', 'Bridal', 'Studio'].map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)} data-testid={`button-filter-${item.toLowerCase()}`}>{item}</button>)}</div>
    <div className="gallery-grid">{filtered.map((item, i) => <button className={`gallery-item gallery-${i + 1}`} key={`${item.title}-${i}`} onClick={() => setSelected(gallery.indexOf(item))} data-testid={`button-gallery-${i}`}><img src={item.src} alt={`${item.title}, ${item.tag} editorial at NEO salon`} /><span><small>{item.tag}</small>{item.title}<MoveUpRight size={15} /></span></button>)}</div>
    {selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setSelected(null)}><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close image viewer" data-testid="button-close-lightbox"><X /></button><button className="lightbox-arrow prev" onClick={(e) => { e.stopPropagation(); setSelected((selected + gallery.length - 1) % gallery.length); }} aria-label="Previous image" data-testid="button-gallery-previous"><ChevronLeft /></button><img src={gallery[selected].src} alt={`${gallery[selected].title}, ${gallery[selected].tag} editorial at NEO salon`} onClick={(e) => e.stopPropagation()} /><button className="lightbox-arrow next" onClick={(e) => { e.stopPropagation(); setSelected((selected + 1) % gallery.length); }} aria-label="Next image" data-testid="button-gallery-next"><ChevronRight /></button></div>}
  </section>;
}

function WhyNeo() {
  return <section className="why-section">
    <div className="section-kicker"><span>07</span><span className="rule" /><span>Why NEO</span></div>
    <div className="why-layout"><div className="why-title" data-reveal><span className="watermark-outline">WHY</span><h2>Good beauty<br /><em>has a feeling.</em></h2></div><div className="why-list">{[['01', 'Taste, not templates', 'We listen for what feels like you — not what’s trending on a moodboard.'], ['02', 'Room for everyone', 'Women, men, brides, grooms, students, couples. Bring your whole self.'], ['03', 'The finish matters', 'The tiny decisions are the big decisions. We’re here for the last 10%.']].map(([n, title, text]) => <div className="why-item" key={n} data-reveal><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><Plus size={19} /></div>)}</div></div>
  </section>;
}

function Appointment() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', preference: 'Hair', note: '' });
  const update = (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [key]: e.target.value });
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return <section className="appointment-section section-dark" id="appointment">
    <div className="section-kicker"><span>08</span><span className="rule" /><span>Make a plan</span></div>
    <div className="appointment-layout"><div className="appointment-title" data-reveal><h2>Let’s make<br /><em>an appointment.</em></h2><p>Tell us a little. We’ll get back to you to find the right time and direction.</p><div className="appointment-contact"><span>Prefer a direct line?</span><a href={`tel:${phone}`} data-testid="link-appointment-phone"><Phone size={15} /> {phone}</a></div></div>
      <div className="form-wrap">{sent ? <div className="success-state" data-testid="status-request-received"><div className="success-icon"><Check /></div><span className="eyebrow">Request received</span><h3>We’ve got your note.</h3><p>Thank you, {form.name || 'we’ll be in touch'}. This is a request, not a confirmation — our team will connect with you at {form.contact || 'your preferred contact'} to find a time.</p><button className="text-link" onClick={() => setSent(false)} data-testid="button-send-another">Send another note <ArrowUpRight size={15} /></button></div> : <form onSubmit={submit} className="appointment-form"><label>Your name<input required value={form.name} onChange={update('name')} placeholder="How should we call you?" data-testid="input-name" /></label><label>Phone or Instagram<input required value={form.contact} onChange={update('contact')} placeholder="Where can we reach you?" data-testid="input-contact" /></label><label>I'm thinking about<select value={form.preference} onChange={update('preference')} data-testid="select-preference"><option>Hair</option><option>Nails</option><option>Grooming</option><option>Bridal / groom</option><option>Jewellery rental</option><option>Not sure yet</option></select></label><label>Anything we should know?<textarea value={form.note} onChange={update('note')} placeholder="An event, an idea, a reference..." rows={3} data-testid="input-note" /></label><button className="neo-button light-button" type="submit" data-testid="button-submit-appointment">Send request <ArrowUpRight size={17} /></button><small>We’ll respond to your request directly. Appointment times are confirmed by our team.</small></form>}</div>
    </div>
  </section>;
}

function Visit() {
  return <section className="visit-section" id="visit"><div className="visit-stamp">NEO<br /><span>UDUPI</span></div><div className="section-kicker"><span>09</span><span className="rule" /><span>Come by</span></div><div className="visit-layout" data-reveal><div><h2>Find us<br /><em>in the city.</em></h2><address>2nd Floor, Shiribeedu Towers,<br />Grassland Commercial, near Service Bus Stand,<br />opposite Tourist Complex,<br />Moodanidambur Village, Udupi,<br />Karnataka 576101</address><a className="neo-button" href={mapsUrl} target="_blank" rel="noreferrer" data-testid="link-directions">Get directions <ArrowUpRight size={17} /></a></div><div className="visit-side"><p>Have a question, a date to get ready for, or just want to say hello?</p><a href={`tel:${phone}`} className="contact-row" data-testid="link-phone"><Phone size={18} /> {phone}</a><a href={`https://wa.me/91${phone}`} target="_blank" rel="noreferrer" className="contact-row" data-testid="link-whatsapp">WhatsApp us <ArrowUpRight size={17} /></a><a href="https://www.instagram.com/neounisexsalonudupi" target="_blank" rel="noreferrer" className="contact-row" data-testid="link-instagram"><Instagram size={18} /> @neounisexsalonudupi</a></div></div></section>;
}

function Footer() {
  return <footer className="neo-footer"><div className="footer-brand"><span>NEO</span><p>Unisex salon / nails studio<br />Udupi, Karnataka</p></div><div className="footer-links"><a href="#services">Services</a><a href="#gallery">Journal</a><a href="#appointment">Appointments</a><a href="#visit">Contact</a></div><div className="footer-note">A little more like you.<br /><small>© NEO Unisex Salon / Nails Studio</small></div></footer>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  useEffect(() => { document.title = 'NEO — Unisex Salon / Nails Studio | Udupi'; const description = 'NEO is a contemporary unisex salon and nails studio in Udupi for hair, grooming, nails, bridal and groom beauty direction.'; let meta = document.querySelector('meta[name="description"]'); if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); } meta.setAttribute('content', description); }, []);
  return <main><Header onMenu={() => setMenuOpen(true)} /><MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} /><Hero /><Manifesto /><ServiceExplorer /><FeatureStrip /><SplitEditorial /><Gallery /><WhyNeo /><Appointment /><Visit /><Footer /><div className="mobile-actions"><a href={`tel:${phone}`} aria-label="Call NEO" data-testid="mobile-call"><Phone size={17} /> Call</a><a href="#appointment" aria-label="Request an appointment" data-testid="mobile-appointment"><CalendarDays size={17} /> Request</a><a href={`https://wa.me/91${phone}`} aria-label="WhatsApp NEO" data-testid="mobile-whatsapp">WhatsApp</a></div></main>;
}

function Router() { return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>; }
function App() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>; }
export default App;