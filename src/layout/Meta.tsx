import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { faqData } from '../components/FAQ';
import { reviewData } from '../components/Reviews';
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
    props.canonical ||
    `${AppConfig.canonical_url.replace(/\/$/, '')}${router.asPath}`;
  const ogImageUrl = props.ogImage || AppConfig.og_image;

  // 动态获取当前域名和协议
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}`;
    }
    return AppConfig.canonical_url; // 服务端渲染时的fallback
  };

  const baseUrl = getBaseUrl();

  // 计算真实的平均评分
  const averageRating =
    reviewData.reduce((sum, review) => sum + review.rating, 0) /
    reviewData.length;
  const formattedAverageRating = averageRating.toFixed(1);

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
          content={`${baseUrl}${ogImageUrl}`}
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

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PicPic',
              url: baseUrl,
              logo: `${baseUrl}/assets/images/logo.png`,
              description: AppConfig.description,
              foundingDate: '2024',
              sameAs: [
                'https://github.com/picpic-ai',
                'https://twitter.com/picpic_ai',
              ],
            }),
          }}
          key="organization-schema"
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: AppConfig.site_name,
              url: baseUrl,
              description: AppConfig.description,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${baseUrl}?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
          key="website-schema"
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: AppConfig.canonical_url,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'AI Image Analysis Tool',
                  item: `${AppConfig.canonical_url.replace(/\/$/, '')}/#features`,
                },
              ],
            }),
          }}
          key="breadcrumb-schema"
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqData.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
          key="faq-schema"
        />

        {/* Review Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: AppConfig.site_name,
              description: props.description,
              url: currentUrl,
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: formattedAverageRating,
                reviewCount: reviewData.length.toString(),
                bestRating: '5',
                worstRating: '1',
              },
              review: reviewData.map((review) => ({
                '@type': 'Review',
                '@id': `${currentUrl}#review-${review.id}`,
                author: {
                  '@type': 'Person',
                  name: review.author,
                  image: review.avatar,
                },
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: review.rating.toString(),
                  bestRating: '5',
                  worstRating: '1',
                },
                reviewBody: review.reviewBody,
                name: review.title,
                datePublished: review.datePublished,
              })),
            }),
          }}
          key="review-schema"
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
              url: `${baseUrl}${ogImageUrl}`,
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
