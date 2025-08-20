import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { AppConfig } from '../utils/AppConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  const currentUrl =
    props.canonical || `${AppConfig.canonical_url}${router.asPath}`;
  const ogImageUrl = props.ogImage || AppConfig.og_image;

  // 结构化数据 - 软件应用
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': AppConfig.schema_type,
    name: AppConfig.site_name,
    description: props.description,
    url: currentUrl,
    applicationCategory: AppConfig.application_category,
    operatingSystem: AppConfig.operating_system,
    offers: {
      '@type': 'Offer',
      price: AppConfig.offers_price,
      priceCurrency: AppConfig.offers_currency,
    },
    author: {
      '@type': 'Organization',
      name: AppConfig.author,
    },
    featureList: [
      'AI Image Metadata Extraction',
      'Stable Diffusion Support',
      'ComfyUI Support',
      'Auto-Tagging System',
      'Prompt Translation',
      'Reverse Engineering',
      'One-Click Export',
    ],
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <meta
          name="keywords"
          content={props.keywords || AppConfig.keywords}
          key="keywords"
        />
        <meta name="author" content={AppConfig.author} key="author" />
        <meta name="robots" content="index,follow" key="robots" />
        <meta name="googlebot" content="index,follow" key="googlebot" />
        <meta name="theme-color" content="#0f172a" key="theme-color" />

        {/* Twitter Card */}
        <meta
          name="twitter:card"
          content={AppConfig.twitter_card}
          key="twitter:card"
        />
        <meta
          name="twitter:site"
          content={AppConfig.twitter_site}
          key="twitter:site"
        />
        <meta name="twitter:title" content={props.title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={props.description}
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content={`${AppConfig.canonical_url}${ogImageUrl}`}
          key="twitter:image"
        />

        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
          key="structured-data"
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={currentUrl}
        openGraph={{
          title: props.title,
          description: props.description,
          url: currentUrl,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
          images: [
            {
              url: `${AppConfig.canonical_url}${ogImageUrl}`,
              width: 1200,
              height: 630,
              alt: props.title,
            },
          ],
          type: 'website',
        }}
        additionalMetaTags={[
          {
            name: 'application-name',
            content: AppConfig.site_name,
          },
          {
            name: 'apple-mobile-web-app-title',
            content: AppConfig.site_name,
          },
          {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black-translucent',
          },
        ]}
      />
    </>
  );
};

export { Meta };
