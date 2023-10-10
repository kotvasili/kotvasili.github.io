import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.evaapp.ai/',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://www.evaapp.ai/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://www.evaapp.ai/brandbook',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://www.evaapp.ai/pp',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://www.evaapp.ai/terms',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.65,
        },
        {
            url: 'https://www.evaapp.ai/support',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
    ]
}
