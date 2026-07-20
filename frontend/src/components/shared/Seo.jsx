import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logo from "../../assets/logo.png";
import { LOCALES, DEFAULT_LOCALE } from "../../routesConfig";

const SITE_NAME = "Liefro";
// Fixed on purpose (not window.location.origin) — OG tags are baked into static
// HTML at build time by scripts/prerender.mjs, which runs against a local
// preview server (http://localhost:4173). Using window.location.origin there
// would bake "localhost:4173" into the deployed OG/canonical URLs.
const SITE_URL = "https://www.liefro.com";
const DEFAULT_TITLE = "Liefro — All-in-One Restaurant Operating System";
const DEFAULT_DESCRIPTION =
  "Manage orders, POS, delivery, marketing, and analytics from one powerful platform built for modern restaurants.";
const OG_LOCALE = { de: "de_DE", en: "en_US" };

/**
 * Sets the document title plus Open Graph / Twitter meta tags for a page.
 * `path` should be the unprefixed route (e.g. "/menu-management") — the
 * current locale segment (from the URL's `:lng` param) is prepended here to
 * build the canonical/og:url and the hreflang alternates.
 */
export default function Seo({ title, description, path = "", image, noIndex = false }) {
  const { lng: rawLng } = useParams();
  const lng = LOCALES.includes(rawLng) ? rawLng : DEFAULT_LOCALE;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const localizedPath = path === "/" ? "" : path;
  const url = `${SITE_URL}/${lng}${localizedPath}`;
  const ogImage = `${SITE_URL}${image || logo}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />
      {LOCALES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${SITE_URL}/${l}${localizedPath}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/${DEFAULT_LOCALE}${localizedPath}`} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={OG_LOCALE[lng]} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
