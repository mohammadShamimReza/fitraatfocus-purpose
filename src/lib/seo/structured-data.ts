import { APP_CONFIG, APP_LINKS } from "@/config/app-config";
import { en, type MessageKey } from "@/lib/i18n/messages/en";
import type { CreatorProfile } from "@/types/profile";
import type { CatalogTemplate, PublicTemplateDetail } from "@/types/template";

import { absoluteImageUrl, absoluteUrl, httpUrl, isoDateTime, metaDescription } from "./site";

type FaqEntry = { question: MessageKey; answer: MessageKey };

export function landingJsonLd(faqs: FaqEntry[]) {
  const home = absoluteUrl("/");
  const organizationId = `${home}#organization`;
  const websiteId = `${home}#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: APP_CONFIG.name,
        url: home,
        description: APP_CONFIG.meta.description,
        sameAs: [APP_LINKS.site, APP_LINKS.webApp, APP_LINKS.playStore],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: APP_CONFIG.name,
        url: home,
        description: APP_CONFIG.meta.description,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "SoftwareApplication",
        name: APP_CONFIG.name,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Android, iOS, Web",
        url: APP_LINKS.webApp,
        downloadUrl: APP_LINKS.playStore,
        publisher: { "@id": organizationId },
        description: APP_CONFIG.meta.description,
      },
      {
        "@type": "FAQPage",
        "@id": `${home}#faq`,
        url: `${home}#faq`,
        isPartOf: { "@id": websiteId },
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: en[item.question],
          acceptedAnswer: {
            "@type": "Answer",
            text: en[item.answer],
          },
        })),
      },
    ],
  };
}

export function collectionPageJsonLd(templates: CatalogTemplate[]) {
  const listed = templates.filter((item) => item.id && item.title.trim()).slice(0, 100);

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: en["landing.catalog.title"],
    description: en["landing.catalog.body"],
    url: absoluteUrl("/systems"),
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: APP_CONFIG.name, url: absoluteUrl("/") },
    ...(listed.length === 0
      ? {}
      : {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: listed.length,
            itemListElement: listed.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: absoluteUrl(`/systems/${encodeURIComponent(item.id)}`),
            })),
          },
        }),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function purposeJsonLd(template: PublicTemplateDetail) {
  const url = absoluteUrl(`/systems/${encodeURIComponent(template.id)}`);
  const image = absoluteImageUrl(template.imageUrl);
  const sections = [...template.sections].sort((left, right) => left.order - right.order);
  const tasks = [...template.tasks].sort((left, right) => left.order - right.order);
  const steps = sections
    .map((section) => {
      const sectionTasks = tasks.filter((task) => task.sectionId === section.id && task.title.trim());
      if (sectionTasks.length === 0) {
        return null;
      }

      return {
        "@type": "HowToSection",
        name: section.title,
        ...(section.description.trim() ? { description: section.description.trim() } : {}),
        itemListElement: sectionTasks.map((task) => ({
          "@type": "HowToStep",
          name: task.title,
          text: task.notes.trim() || task.title,
          ...(task.estimatedMinutes ? { performTime: `PT${Math.round(task.estimatedMinutes)}M` } : {}),
        })),
      };
    })
    .filter((section) => section !== null);

  const minutes = tasks.reduce((total, task) => total + (task.estimatedMinutes ?? 0), 0);
  const reviewCount = template.completionReviewCount;
  const rating = template.completionRatingAverage;
  const description = metaDescription(template.purpose || template.description);
  const author = {
    "@type": "Person",
    name: template.creator.displayName,
    url: absoluteUrl(`/creators/${encodeURIComponent(template.creator.uid)}`),
  };
  const ratingData =
    reviewCount > 0 && rating > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating,
            reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {};

  if (steps.length === 0) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: template.title,
      description,
      url,
      inLanguage: "en",
      image,
      datePublished: isoDateTime(template.createdAt),
      dateModified: isoDateTime(template.updatedAt),
      author,
      ...ratingData,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: template.title,
    description,
    url,
    inLanguage: "en",
    image,
    datePublished: isoDateTime(template.createdAt),
    dateModified: isoDateTime(template.updatedAt),
    ...(minutes > 0 ? { totalTime: `PT${Math.round(minutes)}M` } : {}),
    author,
    step: steps,
    ...ratingData,
  };
}

export function creatorJsonLd(profile: CreatorProfile, templates: CatalogTemplate[]) {
  const url = absoluteUrl(`/creators/${encodeURIComponent(profile.uid)}`);
  const image = absoluteImageUrl(profile.avatarUrl);
  const website = httpUrl(profile.website);
  const description = metaDescription(profile.headline || profile.bio, `${profile.displayName} on Fitraat Focus.`);
  const listed = templates.filter((item) => item.id && item.title.trim()).slice(0, 20);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    name: profile.displayName,
    description,
    dateModified: isoDateTime(profile.updatedAt),
    mainEntity: {
      "@type": "Person",
      name: profile.displayName,
      url,
      description,
      image,
      ...(profile.headline.trim() ? { jobTitle: profile.headline.trim() } : {}),
      ...(profile.location.trim() ? { homeLocation: { "@type": "Place", name: profile.location.trim() } } : {}),
      ...(website ? { sameAs: [website] } : {}),
    },
    ...(listed.length === 0
      ? {}
      : {
          hasPart: {
            "@type": "ItemList",
            itemListElement: listed.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: absoluteUrl(`/systems/${encodeURIComponent(item.id)}`),
            })),
          },
        }),
  };
}
