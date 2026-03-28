import { PortfolioPage } from "@/components/portfolio-page";

export default function Home() {
  const personId = "https://jakebknowles.com/#person";
  const websiteId = "https://jakebknowles.com/#website";
  const profileId = "https://jakebknowles.com/#profile";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId,
      name: "Jakeb Knowles",
      url: "https://jakebknowles.com",
      image: "https://jakebknowles.com/opengraph-image",
      jobTitle: "Software Engineer",
      description:
        "Brisbane, Australia software engineer building end-to-end products across web, mobile, APIs, AI-assisted workflows, and platform modernisation.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brisbane",
        addressRegion: "QLD",
        addressCountry: "AU",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Griffith University",
      },
      worksFor: {
        "@type": "Organization",
        name: "Simpro",
      },
      sameAs: [
        "https://jakebknowles.com",
        "https://www.linkedin.com/in/jakeb-knowles-software-dev/",
        "https://github.com/jakeb-k",
      ],
      knowsAbout: [
        "Software engineering",
        "Product engineering",
        "Full-stack development",
        "Mobile app development",
        "Web development",
        "React",
        "React Native",
        "Laravel",
        "TypeScript",
        "API design",
        "AI-assisted workflows",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      url: "https://jakebknowles.com",
      name: "Jakeb Knowles",
      description:
        "Portfolio site for Jakeb Knowles, a Brisbane software engineer building end-to-end products across web, mobile, APIs, and AI-assisted workflows.",
      publisher: {
        "@id": personId,
      },
      inLanguage: "en-AU",
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": profileId,
      url: "https://jakebknowles.com",
      name: "Jakeb Knowles | Brisbane Software Engineer and Product-Focused Builder",
      description:
        "Jakeb Knowles is a Brisbane software engineer and product-focused builder creating end-to-end software across web, mobile, APIs, and AI-assisted workflows.",
      isPartOf: {
        "@id": websiteId,
      },
      mainEntity: {
        "@id": personId,
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioPage />
    </>
  );
}
