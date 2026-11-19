import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, MapPin, Menu, X } from 'lucide-react'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import MaterialsPage from './pages/MaterialsPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'

const currentYear = new Date().getFullYear()

const navigation = [
  { label: 'Home', path: '/', href: '#/' },
  { label: 'About us', path: '/about', href: '#/about' },
  { label: 'What we do', path: '/services', href: '#/services' },
  { label: 'Materials', path: '/materials', href: '#/materials' },
  { label: 'Contact', path: '/contact', href: '#/contact' },
]

const pages = {
  '/': HomePage,
  '/about': AboutPage,
  '/services': ServicesPage,
  '/materials': MaterialsPage,
  '/contact': ContactPage,
}

function getCurrentRoute() {
  const requestedRoute = window.location.hash.slice(1).split('?')[0]
  return Object.hasOwn(pages, requestedRoute) ? requestedRoute : '/'
}

function Brand() {
  return (
    <a className="brand" href="#/" aria-label="Sadguru Traders home">
      <img className="brand__mark" src={`${import.meta.env.BASE_URL}sadguru-mark.svg`} width="44" height="44" alt="" />
      <span className="brand__words" aria-hidden="true">
        <strong>SADGURU</strong>
        <span>TRADERS</span>
      </span>
    </a>
  )
}

function App() {
  const [route, setRoute] = useState(getCurrentRoute)
  const [menuOpen, setMenuOpen] = useState(false)
  const Page = pages[route]

  useEffect(() => {
    function handleRouteChange() {
      if (window.location.hash === '#main-content') {
        document.getElementById('main-content')?.focus()
        return
      }
      setRoute(getCurrentRoute())
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('hashchange', handleRouteChange)
    return () => window.removeEventListener('hashchange', handleRouteChange)
  }, [])

  useEffect(() => {
    document.title = `Sadguru Traders | ${navigation.find(item => item.path === route)?.label || 'Home'}`
    function handleKey(event) { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [route])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <MotionConfig reducedMotion="user"><div className="site-shell min-h-screen">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="topline">
        <div className="container topline__inner">
          <span>
            <MapPin size={14} strokeWidth={1.8} />
            Chhattisgarh, India
          </span>
          <span className="topline__note">Supporting infrastructure. Strengthening communities.</span>
          <a href="#/contact">
            Government &amp; private project supply <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="container header__inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                key={item.path}
                href={item.href}
                aria-current={route === item.path ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#/contact" className="button button--copper header-quote">Project enquiry <ArrowUpRight size={16} /></a>
          <button
            className="menu-toggle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation" className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24 }}
            >
              {navigation.map((item) => (
                <a key={item.path} href={item.href} onClick={closeMenu} aria-current={route === item.path ? "page" : undefined}>
                  {item.label} <ArrowUpRight size={15} />
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={route}
          id="main-content"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Page />
        </motion.main>
      </AnimatePresence>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Brand />
            <p>Building Trust, Supplying Quality,<br />Supporting Development.</p>
          </div>
          <div className="footer-links">
            <span>EXPLORE</span>
            {navigation.map((item) => <a key={item.path} href={item.href}>{item.label}</a>)}
          </div>
          <div className="footer-business">
            <span>BUSINESS DETAILS</span>
            <p>Proprietorship firm<br />Proprietor: Sunil Kumar<br />Chhattisgarh, India</p>
            <div><BadgeCheck size={15} /> GST &amp; Udyam registered</div>
          </div>
          <a className="back-top" href="#/" aria-label="Back to home"><ArrowUpRight size={19} /></a>
        </div>
        <div className="container footer-bottom">
          <span>© {currentYear} Sadguru Traders. All rights reserved.</span>
          <span>Infrastructure supply with integrity.</span>
        </div>
      </footer>
    </div></MotionConfig>
  )
}

export default App
