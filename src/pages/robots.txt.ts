import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.APP_URL ?? 'https://h3cleaningservice.com';

  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
