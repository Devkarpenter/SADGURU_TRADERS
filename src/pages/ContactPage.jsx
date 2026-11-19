import { useState } from 'react'
import { ArrowRight, Download, MapPin, FileCheck2 } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { products } from '../data/siteContent.js'

export default function ContactPage() {
  const selectedMaterial = new URLSearchParams(window.location.hash.split('?')[1]).get('material') || ''
  const [prepared, setPrepared] = useState(false)
  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const content = ['SADGURU TRADERS - PROJECT ENQUIRY', '', ...Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`), '', 'This enquiry has been prepared locally and has not been sent.'].join('\n')
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'sadguru-project-enquiry.txt'
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setPrepared(true)
  }
  return <section className="contact-section"><div className="container contact-layout">
    <Reveal className="contact-copy"><div className="eyebrow eyebrow--light"><span className="eyebrow__line" /> PLAN YOUR MATERIAL SUPPLY</div><h1 className="mt-5 font-display text-5xl leading-tight font-semibold tracking-tight md:text-6xl">Tell us about<br />your next build.</h1><p className="mt-6">Gather your requirements in one place. Include quantities, specifications and your site location to help plan a useful supply discussion.</p><div className="contact-detail"><span className="contact-detail__icon"><MapPin size={20} /></span><span><small>OUR BASE</small><strong>Chhattisgarh, India</strong></span></div><div className="mt-8 flex items-start gap-3 text-sm leading-relaxed text-white/75"><FileCheck2 size={22} className="shrink-0" /><span>Government departments, Panchayats, contractors and private project enquiries.</span></div></Reveal>
    <Reveal className="contact-panel" delay={0.06}><div className="contact-panel__top"><span>PREPARE A PROJECT ENQUIRY</span></div><p className="mt-4 text-sm leading-relaxed text-forest/70">Download your enquiry to share with the team. Online submission is not connected yet.</p><form className="contact-form" onSubmit={handleSubmit}>
      <label>Your name<input autoComplete="name" name="Name" placeholder="Full name" required maxLength={120} /></label>
      <div className="grid gap-4 sm:grid-cols-2"><label>Email<input type="email" autoComplete="email" name="Email" placeholder="you@company.com" required /></label><label>Phone (optional)<input type="tel" autoComplete="tel" name="Phone" placeholder="Your contact number" /></label></div>
      <label>Material required<select name="Material" defaultValue={products.some(p => p.name === selectedMaterial) ? selectedMaterial : ''} required><option value="" disabled>Select a material</option>{products.map(p => <option key={p.name}>{p.name}</option>)}<option>Multiple materials / Other</option></select></label>
      <label>Project / delivery location<input name="Location" placeholder="Town, district or project site" required maxLength={200} /></label>
      <label>Requirements<textarea name="Requirements" rows={3} placeholder="Quantity, grade, specifications and preferred delivery date..." required maxLength={4000} /></label>
      <button className="button button--copper contact-form__submit" type="submit">Download enquiry <Download size={17} /></button><p className="contact-form__note">Your details stay in your browser and the downloaded file. No enquiry is sent or stored online.</p>
      {prepared && <div role="status" className="rounded-md border border-forest/20 bg-forest/5 p-4 text-sm leading-relaxed">Your enquiry file is ready. Share it with your Sadguru Traders contact to discuss availability and pricing.<button type="button" onClick={() => setPrepared(false)} className="mt-3 flex items-center gap-2 font-semibold">Continue editing <ArrowRight size={15} /></button></div>}
    </form></Reveal>
  </div></section>
}
