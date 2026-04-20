import type { Metadata } from "next";
import { SolutionPageTemplate, type SolutionPageData } from "../../../../components/SolutionPageTemplate";

export const metadata: Metadata = {
    title: "Competitor Analysis for Marketing Agencies | labhook",
    description:
        "White-label Reel analysis for agencies. Sell competitor reports for ₹50K. Your cost: ₹4,999/month. Win social clients. Enterprise plan for 5–20+ accounts.",
};

const data: SolutionPageData = {
    breadcrumbs: [
        { label: "Solutions", href: "#" },
        { label: "For Marketing Agencies", href: "/solutions/marketing-agencies" },
    ],
    eyebrow: "FOR MARKETING AGENCIES",
    title: "Sell Competitor Analysis for ₹50,000. Your Cost? ₹2,499/Month.",
    subtitle:
        "Agencies win clients with strategy, not just execution. labhook gives your team the data to back up recommendations with white-label reports you can sell at a 10x markup.",
    hook: "A competitor analysis service that costs you ₹2,499 to deliver but sells for ₹50K quarterly? That's ₹190K annual margin on top of your standard retainer.",
    painPoints: [
        "Social media is becoming a commodity. Everyone offers management, but few offer data-backed strategy.",
        "Your junior team spends 20+ hours/week manually researching competitors for each brand — expensive, low-impact labor.",
        "Clients ask for competitor updates and you provide opinions. They want data, and without it, your agency is vulnerable.",
        "You can't command ₹2–5L monthly retainers without a clearly differentiated, high-value strategic offering.",
        "Smaller agencies are beating you on price while larger agencies beat you on team resource capacity.",
    ],
    solutions: [
        {
            title: "White-Label Competitor Analysis Service",
            description:
                "Deliver professional competitor briefs with your company's logo and branding. Sell these as standalone strategic projects at ₹25–50K each.",
        },
        {
            title: "Save 20+ Hours of Billable Labor",
            description:
                "Stop assigning manual research. labhook monitors your client's niche 24/7. Your strategist spends 2 hours customizing the brief instead of 20 hours gathering data.",
        },
        {
            title: "Premium Positioning in Pitches",
            description:
                "Lead your next sales pitch with 'Ongoing Competitor Intelligence.' Turn a ₹40K retainer into a ₹65K package with zero additional execution burden.",
        },
        {
            title: "Scale Without Scaling Headcount",
            description:
                "Manage competitive intelligence for 5, 20, or 50+ accounts from a single dashboard. Scale your strategic value without hiring more researchers.",
        },
    ],
    roi: [
        { value: "₹3.3M+", label: "Annual Profit Potential" },
        { value: "20+ hrs", label: "Labor Saved per Client/Month" },
        { value: "₹47,750", label: "Margin per Quarterly Report" },
    ],
    testimonial: {
        quote:
            "We were commodity players. Three months after adding labhook, competitor analysis became 30% of our social revenue. We now pitch retainers at ₹75K instead of ₹45K because we have a real differentiator.",
        name: "Agency Director",
        role: "15-Person Team, ₹1.2 Cr Revenue",
    },
    faq: [
        {
            question: "Can we fully white-label and hide labhook's branding? ",
            answer:
                "Yes. Our Enterprise and Freelancer plans allow for full white-labeling. Add your logo, insights, and analyst name. Clients see your agency's work, not our tool.",
        },
        {
            question: "How many brands can we monitor simultaneously? ",
            answer:
                "Scale as you grow. Start with our Growth plan and upgrade to Enterprise as your client roster expands. There is no hard limit on the number of accounts you can monitor.",
        },
        {
            question: "Can we add our own POV on top of the AI insights? ",
            answer:
                "Absolutely. The automated brief is your starting point. Your strategist spends 1-2 hours layering on client-specific recommendations and action items.",
        },
        {
            question: "Will this also help in the sales/pitching process? ",
            answer:
                "Agencies using labhook during the pre-sales phase report a 2x higher close rate. Showing a potential client their competitor's gaps before you even sign them is a massive win.",
        },
    ],
};

export default function MarketingAgenciesPage() {
    return <SolutionPageTemplate data={data} />;
}
