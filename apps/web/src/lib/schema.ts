// Schema.org 结构化数据生成器

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  contactPoint: {
    telephone: string;
    contactType: string;
    email: string;
    availableLanguage: string[];
  };
  sameAs?: string[];
}

export function generateOrganizationSchema(data: OrganizationSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data.name,
    "url": data.url,
    "logo": {
      "@type": "ImageObject",
      "url": data.logo
    },
    "description": data.description,
    "address": {
      "@type": "PostalAddress",
      ...data.address
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": data.contactPoint.telephone,
      "contactType": data.contactPoint.contactType,
      "email": data.contactPoint.email,
      "availableLanguage": data.contactPoint.availableLanguage
    },
    "sameAs": data.sameAs || []
  };
}

export interface ProductSchema {
  name: string;
  description: string;
  image: string[];
  brand: string;
  model: string;
  category: string;
  sku?: string;
  mpn?: string;
}

export function generateProductSchema(data: ProductSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.name,
    "description": data.description,
    "image": data.image,
    "brand": {
      "@type": "Brand",
      "name": data.brand
    },
    "model": data.model,
    "category": data.category,
    "sku": data.sku,
    "mpn": data.mpn,
    "manufacturer": {
      "@type": "Organization",
      "name": "ECH-ST Electrics"
    }
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export interface LocalBusinessSchema {
  name: string;
  image: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo: {
    latitude: string;
    longitude: string;
  };
  openingHours?: string;
  priceRange?: string;
}

export function generateLocalBusinessSchema(data: LocalBusinessSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": data.url,
    "name": data.name,
    "image": data.image,
    "url": data.url,
    "telephone": data.telephone,
    "email": data.email,
    "address": {
      "@type": "PostalAddress",
      ...data.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": data.geo.latitude,
      "longitude": data.geo.longitude
    },
    "openingHours": data.openingHours || "Mo-Fr 08:00-18:00",
    "priceRange": data.priceRange || "$$"
  };
}

export interface ArticleSchema {
  headline: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher: {
    name: string;
    logo: string;
  };
  description: string;
}

export function generateArticleSchema(data: ArticleSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "image": data.image,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "author": {
      "@type": "Organization",
      "name": data.author
    },
    "publisher": {
      "@type": "Organization",
      "name": data.publisher.name,
      "logo": {
        "@type": "ImageObject",
        "url": data.publisher.logo
      }
    },
    "description": data.description
  };
}

// 生成完整的网站Schema
export function generateWebSiteSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ECH-ST Electrics",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}