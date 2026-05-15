"use client";
import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/Section";
import Card from "@/components/Card";
import CTASection from "@/components/CTASection";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import TeamCard from "@/components/TeamCard";
import { useSiteData } from "@/context/SiteDataContext";
import { values, partnerBadges } from "@/data/site";

export default function About() {
  const { team } = useSiteData();
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-soft-grid opacity-[0.02]" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-brand-purple/10 animate-float-slow" />
        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full border border-brand-navy/10 animate-float" />
        <div className="absolute top-40 right-1/4 w-32 h-32 rounded-full border border-brand-purple/10 animate-float-slow" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-glow-purple opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-glow-navy opacity-20" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-brand-purple/40" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-purple">
                  About Us
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-tight mb-6">
                We Build Technology That{" "}
                <span className="text-brand-purple">Moves Business Forward.</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                Intravent Technologies is an enterprise technology company
                dedicated to helping organizations design, build, and scale
                digital products that deliver real business impact.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Section variant="secondary">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-brand-purple/40" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-purple">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy tracking-tight mb-8">
                A Decade of Digital Excellence
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Founded in 2015, Intravent Technologies began with a simple
                  mission: to bridge the gap between complex technology and
                  business value. What started as a small team of passionate
                  engineers has grown into a full-service enterprise technology
                  company serving clients across North America, Europe, and Asia.
                </p>
                <p>
                  Over the years, we have delivered hundreds of projects ranging
                  from enterprise SaaS platforms to mobile applications used by
                  millions. Our team has grown to include experts in software
                  engineering, product design, cloud architecture, and project
                  management.
                </p>
                <p>
                  Today, we partner with Fortune 500 companies, high-growth
                  startups, and public sector organizations to build digital
                  solutions that stand the test of time.
                </p>
              </div>
            </div>
            <Card className="p-10">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-brand-purple mb-1">
                    5+
                  </div>
                  <p className="text-sm text-text-secondary">Years</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-brand-purple mb-1">
                    50+
                  </div>
                  <p className="text-sm text-text-secondary">Clients</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-brand-navy mb-1">
                    99%
                  </div>
                  <p className="text-sm text-text-secondary">Satisfaction</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-border-light grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm font-semibold text-brand-navy">Fortune 500</div>
                  <div className="text-xs text-text-tertiary">Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-brand-navy">Global</div>
                  <div className="text-xs text-text-tertiary">Reach</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-brand-navy">Award-Winning</div>
                  <div className="text-xs text-text-tertiary">Team</div>
                </div>
              </div>
            </Card>
          </div>
        </AnimatedSection>
      </Section>

      <Section>
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-brand-purple/40" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-purple">
                  Vision
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">
                Our Vision
              </h3>
              <p className="text-text-secondary leading-relaxed">
                To be the most trusted technology partner for enterprises
                worldwide, setting the standard for quality, innovation, and
                impact in digital product development.
              </p>
            </Card>
            <Card className="p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-brand-purple/40" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-purple">
                  Mission
                </span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">
                Our Mission
              </h3>
              <p className="text-text-secondary leading-relaxed">
                To empower organizations with technology that drives meaningful
                progress. We believe in building solutions that are not just
                technically excellent, but that create lasting value for businesses
                and the people they serve.
              </p>
            </Card>
          </div>
        </AnimatedSection>
      </Section>

      <Section variant="secondary">
        <SectionHeader
          label="Our Values"
          title="What We Stand For"
          description="These core principles guide every decision we make and every project we deliver."
        />
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <Card className="p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-purple/10 to-brand-purple/5 flex items-center justify-center mx-auto mb-5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-purple to-brand-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-brand-navy mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader
            label="Leadership"
            title="Meet Our Team"
            description="The people driving our vision and delivering excellence every day."
          />
          <div className="max-w-6xl mx-auto">
            {team.filter((m) => m.role === "Group Chairman").map((m) => (
              <TeamCard key={m.id} member={m} featured />
            ))}
            {team.filter((m) => m.role !== "Group Chairman").length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {team.filter((m) => m.role !== "Group Chairman").map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <TeamCard member={m} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      </Section>

      <Section variant="secondary">
        <SectionHeader
          label="Recognition"
          title="Awards & Partnerships"
          description="We are proud to be recognized by industry leaders and certified for our commitment to quality and security."
        />
        <StaggerContainer className="grid md:grid-cols-4 gap-6">
          {partnerBadges.map((badge) => (
            <StaggerItem key={badge.name}>
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple/10 to-brand-purple/5 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="font-semibold text-brand-navy text-sm mb-1">
                  {badge.name}
                </div>
                <div className="text-xs text-text-tertiary">
                  {badge.tier}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <CTASection />
    </>
  );
}
