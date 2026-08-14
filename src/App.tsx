import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Menu,
  X,
  Sparkles,
  Heart,
  Users,
  GraduationCap,
  Phone,
  MapPin,
  Clock,
  Globe,
  ChevronDown,
} from 'lucide-react';
import type { Language } from '@/data/translations';

const SERVICE_ICONS = [Sparkles, Heart, Users, GraduationCap];
const LANG_LABELS: Record<Language, string> = { de: 'DE', en: 'EN', es: 'ES' };

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: t.nav.home, id: 'hero' },
    { label: t.nav.services, id: 'services' },
    { label: t.nav.about, id: 'about' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <div className="font-serif text-stone-800 bg-stone-50">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 h-16">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="hidden sm:block text-sm font-medium tracking-wide text-stone-700">
              Erika Natural Healing
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-stone-600 hover:text-teal-700 transition-colors"
              >
                {l.label}
              </button>
            ))}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 transition-colors"
              >
                <Globe size={14} />
                {LANG_LABELS[language]}
                <ChevronDown size={12} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-stone-200 py-1 min-w-[80px]">
                  {(['de', 'en', 'es'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLanguage(l);
                        setLangOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === l
                          ? 'text-teal-700 bg-teal-50'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {LANG_LABELS[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-stone-600">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200 pb-4">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="block w-full text-left px-6 py-3 text-sm text-stone-600 hover:bg-stone-50"
              >
                {l.label}
              </button>
            ))}
            <div className="flex gap-3 px-6 pt-2">
              {(['de', 'en', 'es'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLanguage(l);
                    setMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded text-sm ${
                    language === l
                      ? 'bg-teal-700 text-white'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-16">
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt="Nature"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/50 to-stone-900/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-700/80 text-teal-50 text-xs tracking-widest uppercase mb-6">
            {t.hero.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-3">
            {t.hero.title}{' '}
            <span className="block text-teal-300 font-normal">{t.hero.highlight}</span>
          </h1>
          <p className="max-w-lg text-stone-300 text-lg leading-relaxed mt-6 mb-10">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-sm tracking-wide transition-colors"
            >
              {t.hero.cta}
            </button>
            <button
              onClick={() => scrollTo('services')}
              className="px-6 py-3 border border-white/30 hover:border-white/60 text-white rounded-lg text-sm tracking-wide transition-colors"
            >
              {t.hero.secondary}
            </button>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl font-light text-center mb-14">
            <span className="text-teal-700">{t.services.title}</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.services.items.map((item, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <div
                  key={i}
                  className="group p-6 rounded-xl border border-stone-200 hover:border-teal-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                    <Icon size={20} className="text-teal-700" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/erika-portrait.jpg"
                alt="Erika"
                className="rounded-2xl object-cover w-full aspect-[3/4] shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-teal-700/10 -z-10" />
            </div>
            <div>
              <h2 className="text-3xl font-light mb-6">
                <span className="text-teal-700">{t.about.title}</span>
              </h2>
              <p className="text-lg text-stone-700 font-medium mb-4">{t.about.intro}</p>
              <p className="text-stone-600 leading-relaxed mb-4">{t.about.text}</p>
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                {t.about.philosophy}
              </p>
              <blockquote className="border-l-2 border-teal-700 pl-4 text-stone-500 text-sm leading-relaxed italic">
                "{t.about.closing}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery Strip ── */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-3 gap-4">
          <img
            src="/healing-moment.jpg"
            alt="Healing"
            className="rounded-xl object-cover w-full aspect-square"
          />
          <img
            src="/services-bg.jpg"
            alt="Practice"
            className="rounded-xl object-cover w-full aspect-square"
          />
          <img
            src="/hero.jpg"
            alt="Nature"
            className="rounded-xl object-cover w-full aspect-square hidden md:block"
          />
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl font-light text-center mb-3">
            <span className="text-teal-700">{t.contact.title}</span>
          </h2>
          <p className="text-center text-stone-500 mb-14">{t.contact.subtitle}</p>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-white border border-stone-200">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <Phone size={18} className="text-teal-700" />
              </div>
              <h3 className="font-medium mb-2">{t.contact.phone}</h3>
              <p className="text-stone-500 text-sm">+49 (0) 176 123 456 78</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white border border-stone-200">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <MapPin size={18} className="text-teal-700" />
              </div>
              <h3 className="font-medium mb-2">{t.contact.location}</h3>
              {t.contact.address.map((line, i) => (
                <p key={i} className="text-stone-500 text-sm">
                  {line}
                </p>
              ))}
            </div>

            <div className="text-center p-6 rounded-xl bg-white border border-stone-200">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <Clock size={18} className="text-teal-700" />
              </div>
              <h3 className="font-medium mb-2">{t.contact.hours}</h3>
              {t.contact.schedule.map((line, i) => (
                <p key={i} className="text-stone-500 text-sm">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="https://wa.me/4917612345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-sm tracking-wide transition-colors"
            >
              {t.contact.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-14 w-14 rounded-full object-cover mx-auto mb-4"
          />
          <p className="text-white font-medium text-lg mb-1">Erika Natural Healing</p>
          <p className="text-stone-500 text-sm mb-6">{t.footer.tagline}</p>
          <div className="flex justify-center gap-6 mb-8">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-xs text-stone-500 hover:text-teal-400 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="border-t border-stone-800 pt-6">
            <p className="text-xs text-stone-600">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
