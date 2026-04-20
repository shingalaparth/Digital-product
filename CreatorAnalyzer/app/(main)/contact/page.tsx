"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

const channels = [
 { icon: MessageCircle, title:"WhatsApp (Fastest)", detail:"+91-XXXXX-XXXXX", response:"15–60 min", best:"Quick questions, billing, onboarding"},
 { icon: Mail, title:"Email Support", detail:"hello@labhook.com", response:"4–24 hours", best:"Detailed issues, feature requests, partnerships"},
 { icon: Phone, title:"Sales & Demos", detail:"sales@labhook.com", response:"Same day", best:"Custom pricing, demos, enterprise inquiries"},
];

const responseTimes = [
 { channel:"WhatsApp", type:"Feature question", time:"15–60 min"},
 { channel:"WhatsApp", type:"Billing issue", time:"30–90 min"},
 { channel:"WhatsApp", type:"Technical bug", time:"1–4 hours"},
 { channel:"Email", type:"General inquiry", time:"4–24 hours"},
 { channel:"Email", type:"Technical issue", time:"8–24 hours"},
 { channel:"Email", type:"Partnership inquiry", time:"24–48 hours"},
];

export default function ContactPage() {
 const [formData, setFormData] = useState({
 name:"",
 email:"",
 company:"",
 subject:"General Inquiry",
 message:"",
 });

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 // Placeholder — would connect to backend
 alert("Thank you for your message! We'll get back to you shortly.");
 };

 return (
 <div className="relative overflow-x-hidden  text-body">
 <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]"/>

 {/* Hero Section containing Breadcrumbs for unified background */}
 <section className="relative overflow-hidden pt-20 pb-12 sm:pt-32 sm:pb-16">
 <div className="hero-section absolute inset-0 opacity-60"/>
 <div className="relative z-10 px-4">
 <Breadcrumbs items={[{ label:"Contact", href:"/contact"}]} />
 </div>
 <div className="section-shell relative z-10 mt-8 text-center sm:mt-12">
 <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90 sm:text-xs">
 GET IN TOUCH
 </p>
 <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-headline sm:text-4xl lg:text-5xl">
 Contact labhook
 </h1>
 <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-body sm:text-lg">
 We love hearing from our users. Reach out via WhatsApp, email, or the form below —
 we&apos;ll get back to you quickly.
 </p>
 </div>
 </section>

 {/* Contact channels */}
 <section className="py-10 sm:py-16">
 <div className="section-shell">
 <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
 {channels.map((ch) => {
 const Icon = ch.icon;
 return (
 <article
 key={ch.title}
 className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 sm:p-6"
 >
 <Icon className="h-6 w-6 text-primary"/>
 <h2 className="mt-3 text-lg font-bold text-headline">{ch.title}</h2>
 <p className="mt-1 text-sm font-medium text-primary">{ch.detail}</p>
 <p className="mt-2 text-xs text-muted">
 Response time: <span className="text-body">{ch.response}</span>
 </p>
 <p className="mt-1 text-xs text-muted">
 Best for: <span className="text-body">{ch.best}</span>
 </p>
 </article>
 );
 })}
 </div>
 </div>
 </section>

 {/* Contact form + info */}
 <section className="border-y border-border py-16 sm:py-24">
 <div className="section-shell">
 <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
 {/* Form */}
 <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
 <h2 className="text-xl font-bold text-headline sm:text-2xl">Send Us a Message</h2>
 <form onSubmit={handleSubmit} className="mt-6 space-y-4">
 <div className="grid gap-4 sm:grid-cols-2">
 <div>
 <label className="mb-1.5 block text-sm font-medium text-muted">Your Name</label>
 <input
 type="text"
 required
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-headline placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
 placeholder="John Doe"
 />
 </div>
 <div>
 <label className="mb-1.5 block text-sm font-medium text-muted">Email</label>
 <input
 type="email"
 required
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-headline placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
 placeholder="you@company.com"
 />
 </div>
 </div>
 <div>
 <label className="mb-1.5 block text-sm font-medium text-muted">Company / Brand</label>
 <input
 type="text"
 value={formData.company}
 onChange={(e) => setFormData({ ...formData, company: e.target.value })}
 className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-headline placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
 placeholder="Your Brand (optional)"
 />
 </div>
 <div>
 <label className="mb-1.5 block text-sm font-medium text-muted">Subject</label>
 <select
 value={formData.subject}
 onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
 className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-headline focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
 >
 <option>General Inquiry</option>
 <option>Sales Question</option>
 <option>Technical Support</option>
 <option>Feature Request</option>
 <option>Partnership Opportunity</option>
 <option>Feedback</option>
 </select>
 </div>
 <div>
 <label className="mb-1.5 block text-sm font-medium text-muted">Message</label>
 <textarea
 required
 rows={5}
 value={formData.message}
 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
 className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-headline placeholder:text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
 placeholder="Tell us what's on your mind..."
 />
 </div>
 <button
 type="submit"
 className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-bg transition hover:bg-primary-dark"
 >
 Send Message <ArrowRight className="h-4 w-4"/>
 </button>
 </form>
 </div>

 {/* Info */}
 <div className="space-y-6">
 <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
 <div className="flex items-center gap-2">
 <Clock className="h-5 w-5 text-primary"/>
 <h3 className="font-bold text-headline">Business Hours</h3>
 </div>
 <p className="mt-2 text-sm text-body">Monday – Friday: 10:00 AM – 6:00 PM IST</p>
 <p className="text-sm text-muted">
 Saturday & Sunday: Limited support (email responses next business day)
 </p>
 </div>

 <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
 <div className="flex items-center gap-2">
 <MapPin className="h-5 w-5 text-primary"/>
 <h3 className="font-bold text-headline">Office</h3>
 </div>
 <p className="mt-2 text-sm text-body">
 labhook HQ — India
 </p>
 <p className="text-sm text-muted">By appointment only</p>
 </div>

 {/* Response times table */}
 <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
 <h3 className="font-bold text-headline">Expected Response Times</h3>
 <div className="mt-3 overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-border text-left text-xs text-muted">
 <th className="pb-2 font-medium">Channel</th>
 <th className="pb-2 font-medium">Type</th>
 <th className="pb-2 font-medium">Time</th>
 </tr>
 </thead>
 <tbody>
 {responseTimes.map((r, i) => (
 <tr key={i} className="border-b border-border/50">
 <td className="py-2 font-medium text-headline">{r.channel}</td>
 <td className="py-2 text-body">{r.type}</td>
 <td className="py-2 text-primary">{r.time}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <p className="mt-2 text-[11px] text-muted italic">
 During business hours (Mon–Fri, 10am–6pm IST)
 </p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CTA */}
 <section className="relative overflow-hidden py-16 sm:py-24">
 <div className="hero-section absolute inset-0 opacity-40"/>
 <div className="section-shell relative z-10">
 <div className="rounded-3xl border border-primary/30 bg-card p-5 text-center sm:p-10">
 <h2 className="text-3xl font-bold text-headline sm:text-4xl">
 Prefer to Try First?
 </h2>
 <p className="mx-auto mt-3 max-w-xl text-base text-body">
 Sometimes the best way to learn is to test it yourself.
 </p>
 <div className="mt-6 flex justify-center">
 <Link
 href="/pricing"
 className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-base font-bold text-bg transition hover:bg-primary-dark"
 >
 Start Free 7-Day Trial <ArrowRight className="h-4 w-4"/>
 </Link>
 </div>
 </div>
 </div>
 </section>
 </div>
 );
}
