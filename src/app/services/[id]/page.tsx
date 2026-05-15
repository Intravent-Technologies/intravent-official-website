"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSiteData } from "@/context/SiteDataContext";

const techServiceIds = ["web-development", "software-development", "mobile-app-development", "cybersecurity", "product-design", "java-development"];

interface ServiceDetail {
  stats: { value: string; label: string }[];
  features: string[];
  whyUs: { title: string; desc: string }[];
  technologies: string[];
  deliverables: string[];
  process: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaDesc: string;
}

const serviceDetails: Record<string, ServiceDetail> = {
  "web-development": {
    stats: [
      { value: "50+", label: "Websites Delivered" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "3x", label: "Avg. Traffic Increase" },
      { value: "8+", label: "Years Experience" },
    ],
    features: [
      "Custom website and web application development",
      "Responsive, mobile-first designs",
      "SEO-optimized architecture",
      "CMS integration (WordPress, Sanity, Contentful)",
      "E-commerce platforms and payment integration",
      "Performance optimization and Core Web Vitals",
      "Third-party API integrations",
      "Ongoing maintenance and support",
    ],
    whyUs: [
      { title: "Performance-First Engineering", desc: "Every site we build scores 90+ on PageSpeed, with optimized Core Web Vitals, lazy loading, CDN integration, and image optimization out of the box." },
      { title: "SEO-Optimized Architecture", desc: "Our web solutions are built with semantic HTML, structured data, proper heading hierarchies, and server-side rendering to dominate search rankings." },
      { title: "End-to-End Ownership", desc: "From design to deployment to ongoing maintenance, we handle every aspect so you can focus on growing your business." },
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "GraphQL", "PostgreSQL", "Vercel"],
    deliverables: [
      "Fully functional website or web application",
      "Source code repository with documentation",
      "Admin dashboard or CMS access",
      "Performance and security audit report",
      "Deployment and hosting setup",
      "30-day post-launch support",
    ],
    process: [
      { step: "01", title: "Discovery & Strategy", desc: "We analyze your business goals, target audience, and competitive landscape to define the project scope, tech stack, and roadmap." },
      { step: "02", title: "Design & Prototyping", desc: "Our designers create wireframes and high-fidelity mockups, which we refine with your feedback before moving to development." },
      { step: "03", title: "Development & Testing", desc: "We build your solution in agile sprints with continuous testing, code reviews, and performance optimization at every stage." },
      { step: "04", title: "Deployment & Growth", desc: "We deploy to production, configure monitoring and analytics, and provide ongoing support to ensure your platform scales." },
    ],
    faqs: [
      { question: "How long does it take to build a website?", answer: "Timelines vary by complexity. A standard corporate site takes 4-6 weeks, while complex web applications or e-commerce platforms typically take 8-12 weeks." },
      { question: "Do you provide hosting and domain services?", answer: "Yes. We recommend and configure optimal hosting solutions (Vercel, AWS, or dedicated servers) and can assist with domain registration and DNS management." },
      { question: "Will my website be mobile-friendly?", answer: "Absolutely. Every site we build is mobile-first, ensuring a seamless experience across all devices and screen sizes." },
    ],
    ctaTitle: "Ready to Build Your Web Platform?",
    ctaDesc: "Let's discuss your project and build a web solution that drives real business results.",
  },
  "software-development": {
    stats: [
      { value: "30+", label: "Enterprise Systems" },
      { value: "99.9%", label: "Uptime Achieved" },
      { value: "5x", label: "Avg. Efficiency Gain" },
      { value: "12+", label: "Industries Served" },
    ],
    features: [
      "Custom enterprise software development",
      "SaaS platform engineering",
      "Legacy system modernization",
      "Cloud-native application architecture",
      "Workflow automation and integration",
      "Scalable microservices and APIs",
      "Data engineering and analytics platforms",
      "DevOps and CI/CD pipeline setup",
    ],
    whyUs: [
      { title: "Architecture-First Approach", desc: "We design systems for scale from day one — microservices, event-driven architecture, and clean separation of concerns ensure your software grows with you." },
      { title: "Full DevOps Integration", desc: "CI/CD pipelines, infrastructure as code, automated testing, and monitoring are built into every project, not bolted on after." },
      { title: "Battle-Tested Tech Stack", desc: "Python, Go, Java, Node.js, and React — we choose the right tool for each job, backed by years of production experience across industries." },
    ],
    technologies: ["Python", "Go", "Java", "Node.js", "React", "Docker", "Kubernetes", "AWS", "GCP", "PostgreSQL"],
    deliverables: [
      "Fully tested, production-ready software",
      "Architecture documentation and diagrams",
      "CI/CD pipeline and infrastructure-as-code",
      "API documentation (OpenAPI / Swagger)",
      "Deployment playbook and runbooks",
      "Post-launch monitoring and support",
    ],
    process: [
      { step: "01", title: "Requirements & Architecture", desc: "We define functional requirements, system architecture, data models, and integration points with your team." },
      { step: "02", title: "Agile Development", desc: "Development proceeds in iterative sprints with regular demos, code reviews, and automated testing to maintain quality." },
      { step: "03", title: "Integration & QA", desc: "We integrate with your existing systems, perform end-to-end testing, and optimize for performance and security." },
      { step: "04", title: "Deployment & Scale", desc: "We deploy to production environments, set up monitoring, and provide ongoing support as your user base grows." },
    ],
    faqs: [
      { question: "What's your development methodology?", answer: "We follow agile/scrum with 2-week sprints, daily standups, sprint reviews, and continuous stakeholder communication throughout the project." },
      { question: "Can you integrate with our existing systems?", answer: "Yes. We specialize in system integration — connecting new software with your existing ERP, CRM, accounting, or legacy systems via APIs and middleware." },
      { question: "How do you ensure software quality?", answer: "Quality is baked into our process: automated testing (unit, integration, e2e), peer code reviews, security scanning, and staging environments mirror production." },
    ],
    ctaTitle: "Build Software That Scales Your Business",
    ctaDesc: "From idea to production — partner with us to build enterprise-grade software tailored to your needs.",
  },
  "mobile-app-development": {
    stats: [
      { value: "20+", label: "Apps Launched" },
      { value: "4.7+", label: "Avg. App Store Rating" },
      { value: "500k+", label: "Total Downloads" },
      { value: "iOS + Android", label: "Both Platforms" },
    ],
    features: [
      "Native iOS and Android app development",
      "Cross-platform apps (React Native, Flutter)",
      "UI/UX design for mobile experiences",
      "App store deployment and management",
      "Push notifications and real-time features",
      "Offline-first architecture",
      "Analytics and performance monitoring",
      "Ongoing maintenance and updates",
    ],
    whyUs: [
      { title: "Platform Expertise", desc: "We build natively on iOS (Swift) and Android (Kotlin) or cross-platform with React Native and Flutter — choosing the best approach for your use case." },
      { title: "Full App Store Management", desc: "From App Store Connect to Google Play Console, we handle submission, screenshots, descriptions, ratings management, and update cycles." },
      { title: "Performance Obsession", desc: "Smooth 60fps animations, minimal app size, optimized network calls, and offline-first architecture ensure your app feels premium." },
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL", "App Store Connect", "Google Play Console"],
    deliverables: [
      "Polished, production-ready mobile app",
      "App Store and Google Play listing assets",
      "Source code and documentation",
      "Admin dashboard and analytics setup",
      "Crash reporting and monitoring",
      "Post-launch support and update cycles",
    ],
    process: [
      { step: "01", title: "Concept & Strategy", desc: "We define the app concept, target users, core features, and technical approach aligned with your business goals." },
      { step: "02", title: "Design & Prototype", desc: "Our designers craft intuitive mobile interfaces and interactive prototypes, tested and refined before development." },
      { step: "03", title: "Build & Test", desc: "We develop your app using agile methodology with continuous integration, automated testing, and regular builds." },
      { step: "04", title: "Launch & Iterate", desc: "We manage app store submission, monitor performance, and release regular updates based on user feedback." },
    ],
    faqs: [
      { question: "How long does mobile app development take?", answer: "A standard MVP takes 8-12 weeks. Feature-rich applications typically range from 12-20 weeks depending on complexity." },
      { question: "Can you update an existing app?", answer: "Yes. We can take over existing codebases, add features, redesign UIs, fix performance issues, and manage ongoing updates." },
      { question: "Do you handle app store optimization?", answer: "Yes. We optimize your app store listing with keyword-rich descriptions, compelling screenshots, and A/B tested icons to maximize visibility." },
    ],
    ctaTitle: "Turn Your App Idea Into Reality",
    ctaDesc: "From concept to app store — let's build a mobile experience your users will love.",
  },
  "cybersecurity": {
    stats: [
      { value: "100+", label: "Security Audits" },
      { value: "0", label: "Post-Engagement Breaches" },
      { value: "95%", label: "Vulnerability Fix Rate" },
      { value: "24/7", label: "Monitoring Available" },
    ],
    features: [
      "Vulnerability assessments and penetration testing",
      "Security audits and compliance reviews",
      "SOC 2, ISO 27001, and regulatory compliance",
      "Incident response planning and tabletop exercises",
      "Security architecture review",
      "Employee security awareness training",
      "Managed security services",
      "Cloud security posture management",
    ],
    whyUs: [
      { title: "Certified Professionals", desc: "Our team holds CISSP, CEH, OSCP, and CISM certifications, bringing deep expertise across network, application, and cloud security domains." },
      { title: "Actionable Reports", desc: "We don't just find vulnerabilities — we provide clear, prioritized remediation roadmaps with step-by-step guidance for your engineering team." },
      { title: "Continuous Protection", desc: "Security is not a one-time event. We offer managed security services with continuous monitoring, regular scans, and proactive threat intelligence." },
    ],
    technologies: ["Burp Suite", "Metasploit", "Wireshark", "Nessus", "AWS Security Hub", "Cloudflare", "SIEM tools", "EDR solutions"],
    deliverables: [
      "Detailed security assessment report",
      "Remediation roadmap with prioritization",
      "Security policy and procedure documentation",
      "Incident response playbook",
      "Compliance gap analysis",
      "Quarterly security review and updates",
    ],
    process: [
      { step: "01", title: "Assessment & Scoping", desc: "We identify your attack surface, critical assets, and compliance requirements to define the engagement scope." },
      { step: "02", title: "Testing & Analysis", desc: "Our security engineers conduct thorough testing including vulnerability scanning, penetration testing, and code review." },
      { step: "03", title: "Reporting & Prioritization", desc: "We deliver a clear report with findings ranked by severity and a practical remediation plan." },
      { step: "04", title: "Remediation & Monitoring", desc: "We help implement fixes, validate controls, and set up continuous monitoring for ongoing protection." },
    ],
    faqs: [
      { question: "How often should we perform security assessments?", answer: "We recommend at least annually, or quarterly for high-compliance environments. Additionally after major infrastructure changes." },
      { question: "Do you offer compliance certification support?", answer: "Yes. We help organizations achieve and maintain SOC 2, ISO 27001, PCI DSS, and industry-specific compliance frameworks." },
      { question: "Can you test mobile and web applications?", answer: "Yes. Our testing covers web applications, mobile apps, APIs, cloud infrastructure, network devices, and physical security assessments." },
    ],
    ctaTitle: "Secure Your Digital Infrastructure",
    ctaDesc: "Don't wait for a breach. Let's assess your security posture and build a defense strategy that protects your business.",
  },
  "product-design": {
    stats: [
      { value: "40+", label: "Products Designed" },
      { value: "3x", label: "Avg. UX Improvement" },
      { value: "85%", label: "Faster Time-to-Market" },
      { value: "92%", label: "Client Retention" },
    ],
    features: [
      "UX research and user testing",
      "Information architecture and sitemaps",
      "Wireframing and interactive prototyping",
      "Visual design and design systems",
      "Product strategy and roadmap planning",
      "Usability audits and heuristic evaluation",
      "Design-to-development handoff",
      "DesignOps and design system management",
    ],
    whyUs: [
      { title: "Research-Driven Design", desc: "Every design decision is backed by user research — interviews, usability testing, analytics, and behavioral data — not just intuition." },
      { title: "Design Systems at Scale", desc: "We build comprehensive design systems with reusable components, style guides, and documentation that keep your product consistent across every touchpoint." },
      { title: "Seamless Developer Handoff", desc: "Our designs come with complete specs, assets, redlines, and interactive prototypes that make implementation smooth and pixel-perfect." },
    ],
    technologies: ["Figma", "Sketch", "Adobe XD", "Framer", "Protopie", "Maze", "Hotjar", "UserTesting"],
    deliverables: [
      "User research report with insights",
      "Interactive prototypes for testing",
      "Visual design mockups and asset library",
      "Design system documentation",
      "Product roadmap and feature prioritization",
      "Developer handoff with specs and assets",
    ],
    process: [
      { step: "01", title: "Research & Discovery", desc: "We conduct user interviews, competitive analysis, and stakeholder workshops to uncover real needs and opportunities." },
      { step: "02", title: "Design & Validate", desc: "We iterate on wireframes and prototypes, testing with real users to validate assumptions before building." },
      { step: "03", title: "Visual Design & System", desc: "Our designers craft polished interfaces and build a scalable design system for consistent product experiences." },
      { step: "04", title: "Handoff & Iterate", desc: "We deliver complete specs, assets, and documentation to developers and continue iterating based on user feedback." },
    ],
    faqs: [
      { question: "Do you design for both web and mobile?", answer: "Yes. We design responsive web experiences and native mobile interfaces, ensuring consistency across all platforms." },
      { question: "What's the difference between UX and UI design?", answer: "UX focuses on the overall experience and usability (research, information architecture, prototyping), while UI focuses on visual aesthetics and interactions. We do both." },
      { question: "Can you redesign an existing product?", answer: "Absolutely. We conduct a usability audit, identify pain points, and redesign with minimal disruption to your users." },
    ],
    ctaTitle: "Design Products People Love",
    ctaDesc: "Great products start with great design. Let's work together to create an experience that delights your users.",
  },
  "java-development": {
    stats: [
      { value: "25+", label: "Java Projects" },
      { value: "99.9%", label: "System Uptime" },
      { value: "1B+", label: "Transactions Processed" },
      { value: "15+", label: "Enterprise Clients" },
    ],
    features: [
      "Enterprise Java application development (Spring Boot, Jakarta EE)",
      "Microservices architecture and API design",
      "Cloud-native Java on AWS, Azure, GCP",
      "Legacy system migration and modernization",
      "RESTful and GraphQL API development",
      "Database integration (JPA, Hibernate, PostgreSQL, MongoDB)",
      "CI/CD pipeline setup with Maven/Gradle",
      "Performance tuning and security hardening",
    ],
    whyUs: [
      { title: "Deep Java Expertise", desc: "Our engineers have 10+ years of Java experience across Spring Boot, Jakarta EE, and modern Java 21+ with records, pattern matching, and virtual threads." },
      { title: "Cloud-Native by Default", desc: "Every application is designed for the cloud from day one — containerized with Docker, orchestrated with Kubernetes, and deployed on AWS or Azure." },
      { title: "Performance Obsession", desc: "We tune garbage collection, optimize connection pools, implement caching strategies, and benchmark every endpoint to ensure your Java apps perform under load." },
    ],
    technologies: ["Java 21+", "Spring Boot", "Spring Cloud", "Jakarta EE", "Hibernate", "Maven", "Gradle", "Docker", "Kubernetes", "PostgreSQL", "Kafka", "AWS"],
    deliverables: [
      "Production-ready Java application",
      "API documentation (OpenAPI / Swagger)",
      "Dockerized deployment configuration",
      "CI/CD pipeline and infrastructure code",
      "Performance benchmark and optimization report",
      "Source code with comprehensive tests",
    ],
    process: [
      { step: "01", title: "Architecture & Design", desc: "We define system architecture, select the right Java frameworks, and design scalable data models aligned with your business requirements." },
      { step: "02", title: "Development & Testing", desc: "Our engineers build modular, test-driven Java code with continuous integration, automated testing, and peer reviews." },
      { step: "03", title: "Integration & Deployment", desc: "We containerize applications, set up orchestration, and deploy to cloud or on-premise environments with full monitoring." },
      { step: "04", title: "Optimization & Support", desc: "We monitor performance, apply security patches, and continuously optimize for scale as your user base grows." },
    ],
    faqs: [
      { question: "Do you work with legacy Java systems?", answer: "Yes. We specialize in modernizing legacy Java applications — migrating from older frameworks, upgrading Java versions, and refactoring monolithic architectures to microservices." },
      { question: "Which Java version do you recommend?", answer: "We recommend Java 21 LTS or newer for new projects, leveraging features like virtual threads, pattern matching, and sealed classes for cleaner code." },
      { question: "Can you integrate Java apps with non-Java systems?", answer: "Yes. We build RESTful and GraphQL APIs that integrate with systems written in Python, Node.js, Go, or any modern language." },
    ],
    ctaTitle: "Build Enterprise-Grade Java Solutions",
    ctaDesc: "From microservices to monoliths — let's build a Java platform that scales with your business.",
  },
  "solar-installation": {
    stats: [
      { value: "200+", label: "Systems Installed" },
      { value: "98%", label: "Customer Satisfaction" },
      { value: "40%", label: "Avg. Energy Savings" },
      { value: "25yr", label: "Panel Warranty" },
    ],
    features: [
      "Residential and commercial solar system design",
      "Site assessment and energy audit",
      "Solar panel installation and commissioning",
      "Battery storage and backup systems",
      "Grid-tied and off-grid solutions",
      "Inverter and charge controller setup",
      "System monitoring and remote management",
      "Maintenance, cleaning, and support",
    ],
    whyUs: [
      { title: "Certified Installers", desc: "Our NABCEP-certified technicians follow strict safety standards and industry best practices for every installation, residential or commercial." },
      { title: "Premium Equipment Only", desc: "We use Tier-1 solar panels, lithium-ion batteries, and high-efficiency inverters from leading manufacturers with comprehensive warranties." },
      { title: "End-to-End Service", desc: "From site assessment and system design to permitting, installation, and ongoing monitoring — we handle everything." },
    ],
    technologies: ["Monocrystalline Panels", "Polycrystalline Panels", "Lithium-ion Batteries", "Lead-acid Batteries", "String Inverters", "Microinverters", "Charge Controllers", "Solar Monitoring Platforms"],
    deliverables: [
      "Custom solar system design and blueprint",
      "Energy savings and ROI analysis",
      "Fully installed and commissioned system",
      "Monitoring dashboard and mobile access",
      "Warranty documentation and certifications",
      "Ongoing maintenance and support plan",
    ],
    process: [
      { step: "01", title: "Assessment & Design", desc: "We assess your property, analyze energy consumption, and design a solar solution optimized for your needs and budget." },
      { step: "02", title: "Permitting & Procurement", desc: "We handle all permits, approvals, and source high-quality panels, inverters, and batteries from trusted manufacturers." },
      { step: "03", title: "Installation & Commissioning", desc: "Our certified technicians install the system safely and efficiently, followed by thorough testing and commissioning." },
      { step: "04", title: "Monitoring & Maintenance", desc: "We set up real-time monitoring and provide ongoing maintenance to ensure peak performance and longevity." },
    ],
    faqs: [
      { question: "How much can I save on electricity bills?", answer: "Savings vary based on your energy consumption and system size. Most clients see 30-50% reduction in electricity costs from day one." },
      { question: "How long does installation take?", answer: "Residential installations typically take 1-3 days. Commercial installations range from 1-3 weeks depending on system size and complexity." },
      { question: "What happens on cloudy days or at night?", answer: "With battery storage, you can use stored energy during outages or at night. Grid-tied systems draw from the grid when solar production is low." },
    ],
    ctaTitle: "Switch to Solar Energy Today",
    ctaDesc: "Reduce your energy costs and carbon footprint. Let's design a solar solution tailored to your property.",
  },
  "professional-training": {
    stats: [
      { value: "500+", label: "Professionals Trained" },
      { value: "92%", label: "Pass Rate" },
      { value: "5+", label: "Certification Tracks" },
      { value: "4.8/5", label: "Participant Rating" },
    ],
    features: [
      "PMP certification training (PMBOK 7th Edition)",
      "SCRUM Master and Product Owner certification",
      "ITIL, PRINCE2, and Agile certification programs",
      "Custom corporate training workshops",
      "Exam preparation and mock tests",
      "Virtual instructor-led and in-person sessions",
      "Training materials and study guides",
      "Post-certification support and resources",
    ],
    whyUs: [
      { title: "Certified Instructors", desc: "Our trainers hold PMP, SCRUM, ITIL, and PRINCE2 certifications with 10+ years of industry experience and proven teaching track records." },
      { title: "Proven Pass Rates", desc: "92% of our participants pass their certification exams on the first attempt, thanks to our structured curriculum and mock exam program." },
      { title: "Flexible Delivery", desc: "Choose from virtual instructor-led, in-person, or blended learning formats designed to fit your schedule and learning style." },
    ],
    technologies: ["PMBOK Guide", "SCRUM Guide", "Jira", "Confluence", "Microsoft Project", "Trello", "Slack", "Zoom"],
    deliverables: [
      "Certification exam preparation and coaching",
      "Official training materials and workbooks",
      "Mock exams with performance analytics",
      "Certificate of completion",
      "Post-training mentorship session",
      "Access to alumni community and resources",
    ],
    process: [
      { step: "01", title: "Needs Assessment", desc: "We evaluate your career goals, current skill level, and certification targets to recommend the right program." },
      { step: "02", title: "Structured Learning", desc: "Our certified instructors deliver comprehensive training through interactive sessions, real-world case studies, and hands-on exercises." },
      { step: "03", title: "Exam Readiness", desc: "We provide mock exams, targeted review sessions, and proven strategies to ensure you're fully prepared for certification." },
      { step: "04", title: "Certification & Beyond", desc: "After certification, we offer ongoing resources, mentorship, and community access to support your professional growth." },
    ],
    faqs: [
      { question: "Are your courses accredited?", answer: "Yes. Our PMP, SCRUM, ITIL, and PRINCE2 courses are accredited by their respective governing bodies and qualify for PDUs/CEUs." },
      { question: "What if I don't pass the exam?", answer: "We offer free exam retake preparation and additional coaching sessions to help you pass on your next attempt." },
      { question: "Do you offer corporate group training?", answer: "Yes. We provide customized corporate training programs with flexible scheduling, on-site or virtual, for teams of any size." },
    ],
    ctaTitle: "Advance Your Career with Certification",
    ctaDesc: "Get industry-recognized credentials. Let's prepare you for PMP, SCRUM, and other professional certifications.",
  },
};

export default function ServiceDetail() {
  const params = useParams();
  const { services, portfolio: projects } = useSiteData();
  const service = services.find((s) => s.id === params.id);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  if (!service) {
    return (
      <section className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-brand-navy">Service not found</h1>
        <Link href="/services" className="text-brand-purple mt-4 inline-block underline">Back to services</Link>
      </section>
    );
  }

  const isTech = techServiceIds.includes(service.id);
  const details = serviceDetails[service.id];
  const stats = details?.stats ?? [];
  const features = details?.features ?? [];
  const whyUs = details?.whyUs ?? [];
  const technologies = details?.technologies ?? [];
  const deliverables = details?.deliverables ?? [];
  const process = details?.process ?? [];
  const faqs = details?.faqs ?? [];
  const category = isTech || service.id === "solar-installation" || service.id === "professional-training" ? service.title : undefined;
  const related = projects.filter((p) => p.category === service.title || p.tags?.includes(service.title)).slice(0, 3);

  const sections = [
    { id: "overview", label: "Overview" },
    ...(features.length > 0 ? [{ id: "capabilities", label: "Capabilities" }] : []),
    ...(process.length > 0 ? [{ id: "process", label: "Process" }] : []),
    ...(technologies.length > 0 ? [{ id: "technologies", label: "Technologies" }] : []),
    ...(deliverables.length > 0 ? [{ id: "deliverables", label: "Deliverables" }] : []),
    ...(related.length > 0 ? [{ id: "case-studies", label: "Case Studies" }] : []),
    ...(faqs.length > 0 ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <>
      <section ref={heroRef} className="relative pt-32 pb-28 md:pt-44 md:pb-40 overflow-hidden bg-brand-navy">
        {service.icon && (
          <motion.div style={{ y: heroParallaxY, backgroundImage: `url(${service.icon})` }} className="absolute inset-0 bg-cover bg-center" />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/90 to-brand-purple/50" />
        <motion.div style={{ opacity: heroOpacity }} className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-brand-purple-300 hover:text-white transition-colors mb-8 group">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {isTech ? "Tech Services" : "Consulting"}
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-brand-purple-300/50" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple-300">{isTech ? "Tech" : "Consulting"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.04] tracking-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-6 max-w-2xl">
              {service.shortDesc}
            </p>
            <div className="flex flex-wrap gap-3 mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-purple to-accent-blue text-white font-semibold text-sm hover:shadow-xl hover:shadow-brand-purple/25 hover:-translate-y-0.5 transition-all"
              >
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href={`#overview`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/80 font-medium text-sm hover:bg-white/5 hover:text-white transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {stats.length > 0 && (
        <section className="relative z-10 -mt-14 pb-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative p-5 rounded-xl bg-white border border-border-light shadow-sm"
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-brand-purple to-accent-blue bg-clip-text text-transparent">{s.value}</div>
                  <div className="text-xs text-text-tertiary mt-1 font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="overview" className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Overview</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">What We Deliver</h2>
                <p className="text-text-secondary leading-relaxed text-lg">{service.description}</p>
              </motion.div>

              {whyUs.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Why Choose Us</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">Why Intravent for {service.title}</h2>
                  <div className="space-y-5">
                    {whyUs.map((w, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="flex gap-4 p-6 rounded-xl bg-bg-secondary border border-border-light"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple/10 to-accent-blue/10 flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-brand-navy mb-1">{w.title}</h3>
                          <p className="text-sm text-text-secondary leading-relaxed">{w.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="lg:sticky lg:top-28 space-y-6">
                {sections.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="p-6 rounded-2xl bg-bg-secondary border border-border-light hidden lg:block"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">On This Page</span>
                    </div>
                    <nav className="space-y-1">
                      {sections.map((s) => (
                        <a key={s.id} href={`#${s.id}`} className="block px-3 py-2 text-sm text-text-secondary hover:text-brand-purple hover:bg-brand-purple/5 rounded-lg transition-colors">{s.label}</a>
                      ))}
                    </nav>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-brand-purple/5 to-accent-blue/5 border border-brand-purple/10"
                >
                  <h3 className="text-lg font-bold text-brand-navy mb-3">Ready to Get Started?</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">Book a free consultation to discuss your project and learn how we can help.</p>
                  <Link href="/contact" className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-to-br from-brand-purple to-accent-blue text-white text-sm font-semibold hover:shadow-lg hover:shadow-brand-purple/20 hover:-translate-y-0.5 transition-all">
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section id="capabilities" className="py-20 md:py-28 bg-bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(111,79,232,0.03),transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Capabilities</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3">Key Features &amp; Capabilities</h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto">Everything you need delivered under one roof.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="p-5 rounded-xl bg-white border border-border-light hover:border-brand-purple/20 hover:shadow-md hover:shadow-brand-purple/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-brand-navy">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {process.length > 0 && (
        <section id="process" className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(111,79,232,0.04),transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Our Process</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3">How We Deliver</h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto">A proven 4-step approach that ensures quality, transparency, and results.</p>
            </motion.div>
            <div className="max-w-3xl mx-auto space-y-0">
              {process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-5 group"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold transition-colors ${
                      i === process.length - 1
                        ? "bg-gradient-to-br from-brand-purple to-accent-blue text-white"
                        : "bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple/20"
                    }`}>
                      {step.step}
                    </div>
                    {i < process.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-brand-purple/20 to-transparent min-h-[32px]" />
                    )}
                  </div>
                  <div className="pb-10 flex-1">
                    <h3 className="text-lg font-bold text-brand-navy mb-2">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {technologies.length > 0 && (
        <section id="technologies" className="py-20 md:py-28 bg-bg-secondary relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Stack</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3">Technologies &amp; Tools</h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto">The modern tools and frameworks powering our solutions.</p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {technologies.map((t) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-semibold px-4 py-2 rounded-full bg-white border border-border-light text-text-secondary hover:border-brand-purple/30 hover:text-brand-purple hover:shadow-sm transition-all"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {deliverables.length > 0 && (
        <section id="deliverables" className="py-20 md:py-28 relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Output</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3">What You Get</h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto">Every engagement includes these deliverables, guaranteed.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {deliverables.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-3 p-5 rounded-xl bg-white border border-border-light hover:border-emerald-200 hover:shadow-md transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-brand-navy">{d}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section id="case-studies" className="py-20 md:py-28 bg-bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(111,79,232,0.03),transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Case Studies</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3">Related Success Stories</h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto">Real projects where we delivered measurable results in {service.title}.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link href={`/portfolio/${p.id}`} className="group block h-full">
                    <div className="rounded-2xl overflow-hidden border border-border-light bg-white hover:shadow-xl hover:shadow-brand-purple/5 transition-all duration-300 h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden shrink-0">
                        <img src={p.image || p.gallery?.[0]} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20 font-medium">{p.category}</span>
                          {p.timeline && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20 font-medium">{p.timeline}</span>
                          )}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-base font-bold text-brand-navy group-hover:text-brand-purple transition-colors">{p.title}</h3>
                        <p className="text-sm text-text-tertiary mt-1.5 line-clamp-2">{p.description}</p>
                        {p.gallery && p.gallery.length > 1 && (
                          <div className="flex gap-1.5 mt-4">
                            {p.gallery.slice(0, 3).map((g, gi) => (
                              <div key={gi} className="w-full h-16 rounded-lg overflow-hidden bg-bg-secondary">
                                <img src={g} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                        {p.results && p.results.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-light mt-auto">
                            {p.results.slice(0, 3).map((r, ri) => (
                              <span
                                key={ri}
                                className="text-[11px] font-semibold px-2 py-1 rounded-md"
                                style={{ backgroundColor: (p.color || "#6F4FE8") + "12", color: p.color || "#6F4FE8" }}
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-purple group-hover:gap-2.5 transition-all">
                          View Case Study
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section id="faq" className="py-20 md:py-28 relative overflow-hidden">
          <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3">Frequently Asked Questions</h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto">Everything you need to know about our {service.title.toLowerCase()} services.</p>
            </motion.div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group rounded-xl bg-bg-secondary border border-border-light open:border-brand-purple/20 open:shadow-sm transition-all overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-sm font-semibold text-brand-navy hover:text-brand-purple transition-colors list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <svg className="w-4 h-4 text-text-tertiary shrink-0 ml-4 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 md:py-32 bg-brand-navy relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.icon})`, opacity: 0.06 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,79,232,0.15),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple-300">Let&apos;s Work Together</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.1] mt-4 mb-6">
              {details?.ctaTitle ?? "Ready to Get Started?"}
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              {details?.ctaDesc ?? "Let's discuss how we can help bring your vision to life."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-purple to-accent-blue text-white font-semibold text-sm hover:shadow-xl hover:shadow-brand-purple/25 hover:-translate-y-0.5 transition-all"
            >
              Start Your Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
