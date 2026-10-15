import type { Service, SiteConfig } from "../config/site";
import copy from "../content/copy";
import { buildOpeningHoursSpecification } from "./hours";

export interface SchemaImages {
  /** Absolute URL to the default/OG image (also used as a fallback business photo). */
  ogImageUrl: string;
  /** Absolute URL to the logo. */
  logoUrl: string;
  /** Absolute URLs to additional business photos (hero/gallery), most representative first. */
  photoUrls: string[];
}

/** Drops keys whose value is undefined/empty so no empty fields reach the JSON-LD output. */
function prune<T extends Record<string, unknown>>(obj: T): T {
  const out = {} as T;
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    (out as Record<string, unknown>)[key] = value;
  }
  return out;
}

export function buildStructuredData(site: SiteConfig, images: SchemaImages) {
  const businessId = `${site.siteUrl}#business`;
  const websiteId = `${site.siteUrl}#website`;

  const address = prune({
    "@type": "PostalAddress",
    streetAddress: site.address.showFullAddress
      ? [site.address.street, site.address.number, site.address.complement]
          .filter(Boolean)
          .join(", ")
      : undefined,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  });

  // "a partir de" prices become a minPrice; services priced after an
  // evaluation (no `price`) are listed without any price at all.
  const toOffer = (service: Service) => {
    const hasPrice = site.services.showPrices && service.price !== undefined;
    return prune({
      "@type": "Offer",
      itemOffered: prune({
        "@type": "Service",
        name: service.name,
        description: service.description,
      }),
      price: hasPrice && !service.priceFrom ? service.price : undefined,
      priceCurrency: hasPrice && !service.priceFrom ? site.currency : undefined,
      priceSpecification:
        hasPrice && service.priceFrom
          ? {
              "@type": "PriceSpecification",
              minPrice: service.price,
              priceCurrency: site.currency,
            }
          : undefined,
    });
  };

  const categories = site.services.categories.filter((category) => category.items.length > 0);
  const catalogName = `${copy.services.heading} — ${site.business.name}`;
  // One untitled category = a flat list; otherwise one sub-catalog per category.
  const offerCatalog =
    categories.length === 0
      ? undefined
      : categories.length === 1 && !categories[0].title
        ? {
            "@type": "OfferCatalog",
            name: catalogName,
            itemListElement: categories[0].items.map(toOffer),
          }
        : {
            "@type": "OfferCatalog",
            name: catalogName,
            itemListElement: categories.map((category) => ({
              "@type": "OfferCatalog",
              name: category.title ?? catalogName,
              itemListElement: category.items.map(toOffer),
            })),
          };

  const sameAs = [
    site.social.instagram,
    site.social.facebook,
    site.social.tiktok,
    site.social.googleBusinessProfileUrl,
  ].filter((url): url is string => Boolean(url));

  const business = prune({
    "@type": site.business.schemaType,
    "@id": businessId,
    name: site.business.name,
    description: site.business.longDescription,
    url: site.siteUrl,
    telephone: site.contact.phoneE164,
    email: site.contact.email,
    image: [images.ogImageUrl, ...images.photoUrls],
    logo: images.logoUrl,
    priceRange: site.business.priceRange,
    address,
    geo: site.address.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: site.address.geo.lat,
          longitude: site.address.geo.lng,
        }
      : undefined,
    openingHoursSpecification: buildOpeningHoursSpecification(site.hours.days),
    hasMap: site.address.googleMapsUrl,
    sameAs,
    areaServed: site.address.city,
    paymentAccepted: site.paymentMethods.join(", "),
    currenciesAccepted: site.currency,
    foundingDate: site.business.foundingYear ? String(site.business.foundingYear) : undefined,
    hasOfferCatalog: offerCatalog,
  });

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.siteUrl,
    name: site.business.name,
    inLanguage: site.locale,
    publisher: { "@id": businessId },
  };

  // Same rule as the FAQ section: drafted questions with no answer stay out.
  const faq = site.faq.filter((item) => item.answer.trim() !== "");
  const faqPage =
    faq.length > 0
      ? {
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [business, website, faqPage].filter(Boolean),
  };
}
