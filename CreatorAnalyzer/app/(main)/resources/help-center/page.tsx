import type { Metadata } from "next";
import Link from "next/link";
import { Search, BookOpen, CreditCard, Zap, LifeBuoy, Terminal, MessageSquare, Mail, ArrowRight, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";

export const metadata: Metadata = {
 title:"Help Center & Documentation | labhook Support",
 description:
"labhook help center with guides for getting started, billing, features, troubleshooting, and API docs. Search for answers or contact support.",
};

const categories = [
 {
 title:"Getting Started",
 icon: <Zap className="h-6 w-6"/>,
 description:"Start here if you're new to labhook. Account setup and first tracking guides.",
 articles: ["What is labhook? ","Sign Up & Create Account","Add Your First Competitor","Dashboard Tour"],
 },
 {
 title:"Account & Billing",
 icon: <CreditCard className="h-6 w-6"/>,
 description:"Everything about your subscription, invoices, and team management.",
 articles: ["Update Profile & Password","Billing FAQ","Change Subscription Plan","Team Permissions"],
 },
 {
 title:"Features Guide",
 icon: <BookOpen className="h-6 w-6"/>,
 description:"Deep dives into how to use labhook's core intelligence features.",
 articles: ["Competitor Snapshot","Real-Time Alerts","Growth Analytics","Exporting Reports"],
 },
 {
 title:"Troubleshooting",
 icon: <LifeBuoy className="h-6 w-6"/>,
 description:"Solve common issues with data syncing, authentication, and notifications.",
 articles: ["Data Not Updating? ","Fix Auth Errors","WhatsApp Opt-in Help","Dashboard Speed Tips"],
 },
 {
 title:"API Documentation",
 icon: <Terminal className="h-6 w-6"/>,
 description:"For developers integrating labhook into custom agency workflows.",
 articles: ["API Overview","Authentication","Endpoints Reference","Rate Limits & Quotas"],
 },
];

const popularArticles = [
"How to connect Instagram accounts",
"Why engagement metrics differ across tools",
"How to export reports for clients",
"WhatsApp notification setup",
"API authentication setup",
];

export default function HelpCenterPage() {
 return (
 <div className="relative overflow-x-hidden  text-body">
 <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]"/>

 {/* Hero with Search */}
 <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
 <div className="hero-section absolute inset-0 opacity-60"/>
 <div className="relative z-10 px-4">
 <Breadcrumbs items={[{ label:"Resources", href:"#"}, { label:"Help Center", href:"/resources/help-center"}]} />
 </div>
 <div className="section-shell relative z-10 mt-8 text-center sm:mt-12">
 <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-headline sm:text-4xl lg:text-5xl">
 How can we help?
 </h1>
 <div className="mx-auto mt-8 max-w-2xl">
 <div className="relative">
 <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"/>
 <input
 type="text"
 placeholder="Search for articles, features, or troubleshooting..."
 className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 sm:text-base"
 />
 </div>
 <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-muted sm:text-sm">
 <span>Popular:</span>
 {["Billing","API docs","WhatsApp alerts","Instagram setup"].map((tag) => (
 <button key={tag} className="hover:text-primary transition-colors">
 {tag}
 </button>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* Category Grid */}
 <section className="py-12 sm:py-20">
 <div className="section-shell">
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {categories.map((cat) => (
 <div key={cat.title} className="group rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-soft">
 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-bg">
 {cat.icon}
 </div>
 <h3 className="text-xl font-bold text-headline">{cat.title}</h3>
 <p className="mt-2 text-sm leading-relaxed text-muted">
 {cat.description}
 </p>
 <ul className="mt-6 space-y-3">
 {cat.articles.map((article) => (
 <li key={article}>
 <Link href="#"className="flex items-center gap-2 text-sm text-body hover:text-primary transition-colors">
 <ArrowRight className="h-3 w-3"/>
 {article}
 </Link>
 </li>
 ))}
 </ul>
 <div className="mt-6 pt-6 border-t border-border">
 <Link href="#"className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1 group">
 View all {cat.title} articles <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1"/>
 </Link>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Popular Articles & Stats */}
 <section className="border-t border-border py-16 sm:py-24 bg-surface/30">
 <div className="section-shell">
 <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
 <div>
 <h2 className="text-2xl font-bold text-headline mb-8">Popular Help Articles</h2>
 <div className="grid gap-4 sm:grid-cols-2">
 {popularArticles.map(article => (
 <Link key={article} href="#"className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50 group">
 <span className="text-sm font-medium">{article}</span>
 <ExternalLink className="h-4 w-4 text-muted group-hover:text-primary transition-colors"/>
 </Link>
 ))}
 </div>
 </div>
 
 <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
 <h2 className="text-xl font-bold text-headline mb-6">Support Stats</h2>
 <div className="space-y-6">
 <div>
 <p className="text-3xl font-bold text-primary">120+</p>
 <p className="text-xs font-semibold uppercase tracking-wider text-muted mt-1">Total Articles</p>
 </div>
 <div>
 <p className="text-3xl font-bold text-primary">96%</p>
 <p className="text-xs font-semibold uppercase tracking-wider text-muted mt-1">Satisfaction Rating</p>
 </div>
 <div>
 <p className="text-3xl font-bold text-primary">2-4 hrs</p>
 <p className="text-xs font-semibold uppercase tracking-wider text-muted mt-1">Avg WhatsApp Response</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Contact Section */}
 <section className="py-16 sm:py-24">
 <div className="section-shell text-center">
 <h2 className="text-3xl font-bold text-headline mb-4">Still need help?</h2>
 <p className="text-lg text-muted mb-12 max-w-2xl mx-auto">
 Our support team is available Monday-Friday, 10am-6pm IST to help you with any issues.
 </p>
 
 <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
 <div className="rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 group">
 <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-headline transition-all">
 <MessageSquare className="h-6 w-6"/>
 </div>
 <h3 className="text-xl font-bold text-headline">WhatsApp Support</h3>
 <p className="mt-2 text-sm text-muted mb-6">Fastest response times for technical and account issues.</p>
 <button className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-headline transition hover:bg-green-700">
 Chat on WhatsApp <ArrowRight className="h-4 w-4"/>
 </button>
 </div>
 
 <div className="rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 group">
 <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-bg transition-all">
 <Mail className="h-6 w-6"/>
 </div>
 <h3 className="text-xl font-bold text-headline">Email Support</h3>
 <p className="mt-2 text-sm text-muted mb-6">For detailed inquiries, billing issues, and API support.</p>
 <button className="inline-flex items-center gap-2 rounded-xl border border-primary px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary/10">
 Send an Email <ArrowRight className="h-4 w-4"/>
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* Bottom CTA */}
 <section className="relative overflow-hidden py-16 sm:py-24 border-t border-border">
 <div className="section-shell text-center">
 <h2 className="text-2xl font-bold text-headline mb-3">Ready to master competitor intelligence?</h2>
 <Link href="/pricing"className="text-primary font-bold hover:underline flex items-center justify-center gap-2">
 Start your 14-day free trial now <ArrowRight className="h-4 w-4"/>
 </Link>
 </div>
 </section>
 </div>
 );
}
