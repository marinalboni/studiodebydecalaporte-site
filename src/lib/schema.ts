import type { SiteConfig } from "../config/site";
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

  const offers =
    site.services.showPrices && site.services.items.length > 0
      ? {
          "@type": "OfferCatalog",
          name: `Serviços — ${site.business.name}`,
          itemListElement: site.services.items.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
            },
            price: service.price,
            priceCurrency: site.currency,
          })),
        }
      : undefined;

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
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    openingHoursSpecification: buildOpeningHoursSpecification(site.hours.days),
    hasMap: site.address.googleMapsUrl,
    sameAs,
    areaServed: site.address.city,
    paymentAccepted: site.paymentMethods.join(", "),
    currenciesAccepted: site.currency,
    foundingDate: String(site.business.foundingYear),
    makesOffer: offers,
  });

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.siteUrl,
    name: site.business.name,
    inLanguage: site.locale,
    publisher: { "@id": businessId },
  };

  const faqPage =
    site.faq.length > 0
      ? {
          "@type": "FAQPage",
          mainEntity: site.faq.map((item) => ({
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
