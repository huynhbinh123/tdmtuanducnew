import { defineSitemapEventHandler } from "#imports";
import type { SitemapUrl } from "#sitemap/types";

interface T {
  locale: string;
  slug: string;
  updated_at: string | Date;
}

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.appUrl;
  const locales = config.public.i18n.locales.map((locale) => locale.code);
  const apiQueries = locales.map((locale) =>
    $fetch<T[]>(`${config.public.apiUrl}/load-data-sitemap?locale=${locale}`)
  );

  const sitemaps = await Promise.all(apiQueries);

  return sitemaps.flat().map(
    (entry) =>
      ({
        // explicit sitemap mapping
        _sitemap: entry.locale,
        loc: `${baseUrl}${entry.slug}`,
        _i18nTransform: true,
        lastmod: entry.updated_at,
      } satisfies SitemapUrl)
  );
});
