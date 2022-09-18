import NextHead from 'next/head';

// Default and fallback site information
const siteOptions = {
    language: "en_US",
    type: "website",
    site_title: "Next Sanity Boilerplate",
    favicon: "/favicon.ico",
    description: "Default site description",
    author: "John Doe",
    og_image: "/og-image.jpg",
    theme_color: "#161a19",
    url: "https://example.com/",
    site_name: "example.com",
}

export default function Head({
    page, 
    description=siteOptions.description, 
    author=siteOptions.author, 
    ogimage=siteOptions.og_image 
}) {
        
    return (<NextHead>

        <title>{`${siteOptions.site_title} - ${page}`}</title>

        <meta name="author" content={author} />
        <meta name="description" content={description} />
        <meta name="theme-color" content={siteOptions.themeColor}/>

        <meta property="og:locale" content={siteOptions.language} />
        <meta property="og:type" content={siteOptions.type} />
        <meta property="og:url" content={siteOptions.url} />
        <meta property="og:site_name" content={siteOptions.site_name} />
        <meta property="og:title" content={`${siteOptions.site_title} - ${page}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogimage} />

        <link rel="icon" href={siteOptions.favicon} />

      </NextHead>)
}