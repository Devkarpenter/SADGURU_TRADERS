import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { activities } from '../data/siteContent.js'

function ServicesPage() {
  return (
    <section className="section services-section">
      <div className="container">
        <Reveal className="section-heading section-heading--light">
          <div>
            <div className="eyebrow eyebrow--light"><span className="eyebrow__line" /> What we do</div>
            <h1 className="home-heading">Supply that supports<br /><em>the bigger picture.</em></h1>
          </div>
          <p>
            From essential building materials to community infrastructure, we help keep
            development work moving.
          </p>
        </Reveal>
        <div className="service-grid">
          {activities.map(({ icon: Icon, number, title, description }, index) => (
            <Reveal key={title} className="service-card" delay={index * 0.07}>
              <div className="service-card__top">
                <span className="service-card__icon"><Icon size={20} strokeWidth={1.6} /></span>
                <span className="service-card__number">{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="service-card__rule" />
            </Reveal>
          ))}
        </div>
        <div className="services-note">
          <span className="services-note__dot" />
          <span>Including material supply for rural development works</span>
          <ArrowUpRight size={15} />
        </div>
      </div>
    </section>
  )
}

export default ServicesPage
