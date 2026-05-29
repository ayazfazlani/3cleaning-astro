import type { APIRoute } from 'astro';

const pages = [
  { path: '/',         changefreq: 'weekly',  priority: '1.0' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/pricing',  changefreq: 'monthly', priority: '0.9' },
  { path: '/areas',    changefreq: 'monthly', priority: '0.8' },
  { path: '/gallery',  changefreq: 'monthly', priority: '0.7' },
  { path: '/faq',      changefreq: 'monthly', priority: '0.7' },
  { path: '/blog',     changefreq: 'weekly',  priority: '0.7' },
  { path: '/about',    changefreq: 'monthly', priority: '0.6' },
  { path: '/contact',  changefreq: 'monthly', priority: '0.8' },
  { path: '/terms',    changefreq: 'yearly',  priority: '0.3' },
  { path: '/privacy',  changefreq: 'yearly',  priority: '0.3' },
];

export const GET: APIRoute = () => {
  const siteUrl = (import.meta.env.APP_URL ?? 'https://h3cleaningservice.com').replace(/\/$/, '');
  const today = new Date().toISOString().split('T')[0];

  const urls = pages
    .map(
      ({ path, changefreq, priority }) => `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
