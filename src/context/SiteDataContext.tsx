"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  services as fallbackServices,
  engagementModels,
  testimonials,
  portfolioProjects as fallbackPortfolio,
  blogPosts as fallbackBlog,
  partnerBadges,
  contactInfo,
  trustedCompanies as fallbackClients,
  teamMembers as fallbackTeam,
} from "@/data/site";

export interface SiteData {
  services: typeof fallbackServices;
  clients: typeof fallbackClients;
  portfolio: typeof fallbackPortfolio;
  blog: typeof fallbackBlog;
  team: typeof fallbackTeam;
  engagementModels: typeof engagementModels;
  testimonials: typeof testimonials;
  partnerBadges: typeof partnerBadges;
  contactInfo: typeof contactInfo;
}

const defaultData: SiteData = {
  services: fallbackServices,
  clients: fallbackClients,
  portfolio: fallbackPortfolio,
  blog: fallbackBlog,
  team: fallbackTeam,
  engagementModels,
  testimonials,
  partnerBadges,
  contactInfo,
};

const SiteDataContext = createContext<SiteData>(defaultData);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultData);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((json) => {
        setData((prev) => ({
          ...prev,
          services: json.services ?? prev.services,
          clients: json.clients ?? prev.clients,
          portfolio: json.portfolio ?? prev.portfolio,
          blog: json.blog ?? prev.blog,
          team: json.team ?? prev.team,
        }));
      })
      .catch(() => {});
  }, []);

  return (
    <SiteDataContext.Provider value={data}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
