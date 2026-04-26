import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
    title, 
    description, 
    keywords,
    name = "Ziffcode Technologies", 
    type = "website",
    image = "/ziffcodeLogo.png", // Default branded image
    schema = null
}) {
    const siteUrl = "https://ziffcode.com.ng"; // Base URL for canonicals
    const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            {keywords && <meta name='keywords' content={keywords} />}
            
            {/* Facebook/Open Graph tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content="Ziffcode Technologies" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={image} />
            
            {/* Twitter tags */}
            <meta name="twitter:creator" content="@ZiffcodeTech" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            
            {/* SEO specifics */}
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={currentUrl} />

            {/* JSON-LD Schema Markup */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
}
