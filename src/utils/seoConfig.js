/**
 * Global SEO Configuration for Ziffcode Technologies Limited
 * This file centralizes the tactical keywords and metadata used across the platform.
 */

export const SEO_CONFIG = {
    siteName: "Ziffcode Technologies",
    siteUrl: "https://ziffcode.com.ng",
    defaultTitle: "Ziffcode | Professional Software Development & Tech Academy",
    defaultDescription: "Ziffcode Technologies specialists in high-performance software development, mobile app building, managed software services, and tech outsourcing. We help organizations manage, maintain, and scale their digital infrastructure.",
    defaultKeywords: "Software Development Lagos, Managed Software Services, Application Management, Mobile App Development Nigeria, Software Outsourcing Africa, Tech Talent Outsourcing, Software Maintenance and Support, Coding Bootcamp Lagos, Ziffcode Academy, Enterprise Software Solutions",
    social: {
        twitter: "@ZiffcodeTech",
        facebook: "ZiffcodeTechnologies",
        linkedin: "ziffcode-technologies",
        instagram: "ziffcode_tech"
    },
    address: {
        street: "Suit 49, Kasam Plaza, 26 Ikotun-Idimu Road",
        city: "Ikotun",
        region: "Lagos",
        postalCode: "100265",
        country: "Nigeria"
    },
    contact: {
        phone: "+234 912 191 9898",
        email: "service@ziffcode.com.ng"
    }
};

/**
 * Returns the global Organization Schema (JSON-LD)
 */
export const getOrgSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SEO_CONFIG.siteName,
    "url": SEO_CONFIG.siteUrl,
    "logo": `${SEO_CONFIG.siteUrl}/ziffcodeLogo.png`,
    "alternateName": "Ziffcode",
    "sameAs": [
        `https://twitter.com/${SEO_CONFIG.social.twitter.replace('@', '')}`,
        `https://facebook.com/${SEO_CONFIG.social.facebook}`,
        `https://linkedin.com/company/${SEO_CONFIG.social.linkedin}`,
        `https://instagram.com/${SEO_CONFIG.social.instagram}`
    ],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": SEO_CONFIG.address.street,
        "addressLocality": SEO_CONFIG.address.city,
        "addressRegion": SEO_CONFIG.address.region,
        "postalCode": SEO_CONFIG.address.postalCode,
        "addressCountry": SEO_CONFIG.address.country
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": SEO_CONFIG.contact.phone,
        "contactType": "customer service",
        "email": SEO_CONFIG.contact.email,
        "areaServed": "Global",
        "availableLanguage": "English"
    }
});

/**
 * Returns the LocalBusiness Schema (JSON-LD)
 */
export const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": SEO_CONFIG.siteName,
    "image": `${SEO_CONFIG.siteUrl}/ziffcodeLogo.png`,
    "url": SEO_CONFIG.siteUrl,
    "telephone": SEO_CONFIG.contact.phone,
    "address": {
        "@type": "PostalAddress",
        "streetAddress": SEO_CONFIG.address.street,
        "addressLocality": SEO_CONFIG.address.city,
        "addressRegion": SEO_CONFIG.address.region,
        "postalCode": SEO_CONFIG.address.postalCode,
        "addressCountry": SEO_CONFIG.address.country
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 6.5444, // Approximate Lagos/Ikotun
        "longitude": 3.2625
    },
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
    }
});
