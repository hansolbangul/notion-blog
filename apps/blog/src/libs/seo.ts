import type { Metadata } from "next";
import type { TPost } from "@blog/notions/types";
import CONFIG from "@blog/notions/site.config";

const siteUrl = CONFIG.url.replace(/\/$/, "");
const defaultOgImage = `${siteUrl}/main_img.png`;
const siteName = CONFIG.blog.title;
const siteTitle = "데굴데굴 블로그 | 프론트엔드 개발 아카이브";
const defaultDescription =
  "프론트엔드 개발 기록과 실험, Notion 기반 아카이브를 정리하는 데굴데굴 블로그입니다. React, TypeScript, Next.js, CSS, 브라우저와 개발 생산성에 관한 글을 다룹니다.";
const creatorName = CONFIG.user.name || "hansolbangul";
const creatorProfile = CONFIG.user.profile || siteUrl;
const defaultSocialImage = getAbsoluteUrl("/api/og");

type SeoMetadataOptions = {
  title?: Metadata["title"];
  description?: string;
  pathname?: string;
  keywords?: string[];
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  noIndex?: boolean;
};

type SocialImageOptions = {
  kind?: "home" | "post" | "page" | "library" | "tool";
  slug?: string;
  title?: string;
  eyebrow?: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

const publisher = {
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: defaultOgImage,
  },
};

function resolveTitle(title?: Metadata["title"]) {
  if (!title) return siteName;
  if (typeof title === "string") return title;
  if ("absolute" in title && title.absolute) return title.absolute;
  if ("default" in title && title.default) return title.default;
  return siteName;
}

function normalizeText(value?: string) {
  if (!value) return "";
  return value.replace(/\s+/g, " ").trim();
}

function shortenDescription(value?: string) {
  const description = normalizeText(value) || defaultDescription;
  if (description.length <= 170) return description;
  return `${description.slice(0, 167).trimEnd()}...`;
}

export function getAbsoluteUrl(pathname: string = "/") {
  return new URL(pathname, siteUrl).toString();
}

export function getAbsoluteImageUrl(image?: string) {
  if (!image) return defaultOgImage;
  if (/^https?:\/\//.test(image)) return image;
  if (image.startsWith("/")) return getAbsoluteUrl(image);
  return getAbsoluteUrl(`/${image}`);
}

export function getSocialImageUrl({
  kind = "tool",
  slug,
  title,
  eyebrow,
}: SocialImageOptions = {}) {
  const searchParams = new URLSearchParams();

  searchParams.set("kind", kind);

  if (slug) {
    searchParams.set("slug", slug);
  }

  if (title) {
    searchParams.set("title", title);
  }

  if (eyebrow) {
    searchParams.set("eyebrow", eyebrow);
  }

  const queryString = searchParams.toString();
  if (!queryString) return defaultSocialImage;

  return getAbsoluteUrl(`/api/og?${queryString}`);
}

export function getPostPath(post: TPost) {
  const type = post.type?.[0];
  if (type === "Page") return `/page/${post.slug}`;
  if (type === "Library") return `/library/${post.slug}`;
  return `/post/${post.slug}`;
}

export function getPostUrl(post: TPost) {
  return getAbsoluteUrl(getPostPath(post));
}

export function getPostImage(post: TPost) {
  return getAbsoluteImageUrl(post.thumbnail);
}

export function getPostSocialImage(post: TPost) {
  const type = post.type?.[0];
  const kind =
    type === "Page" ? "page" : type === "Library" ? "library" : "post";
  return getAbsoluteUrl(
    `/share-image/${encodeURIComponent(kind)}/${encodeURIComponent(post.slug)}`,
  );
}

export function toIsoDate(value?: string) {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

export function getPublishedDate(post: TPost) {
  return toIsoDate(post.date?.start_date || post.createdTime);
}

export function getModifiedDate(post: TPost) {
  return toIsoDate(post.lastEditedTime || post.createdTime);
}

export function createSeoMetadata({
  title,
  description,
  pathname = "/",
  keywords = [],
  image,
  imageWidth,
  imageHeight,
  imageType,
  type = "website",
  publishedTime,
  modifiedTime,
  authors = [],
  section,
  noIndex = false,
}: SeoMetadataOptions): Metadata {
  const seoDescription = shortenDescription(description);
  const canonical = getAbsoluteUrl(pathname);
  const ogImage = getAbsoluteImageUrl(image);
  const resolvedTitle = resolveTitle(title);
  const ogImageDescriptor = {
    url: ogImage,
    alt: resolvedTitle,
    ...(imageWidth ? { width: imageWidth } : {}),
    ...(imageHeight ? { height: imageHeight } : {}),
    ...(imageType ? { type: imageType } : {}),
  };
  const resolvedAuthors = authors.length
    ? authors.map((name) => ({
        name,
      }))
    : [
        {
          name: creatorName,
          url: creatorProfile,
        },
      ];

  return {
    title,
    description: seoDescription,
    alternates: {
      canonical,
    },
    keywords,
    authors: resolvedAuthors,
    creator: creatorName,
    publisher: siteName,
    category: "technology",
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      locale: "ko_KR",
      url: canonical,
      siteName,
      title: resolvedTitle,
      description: seoDescription,
      images: [ogImageDescriptor],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
            section,
            tags: keywords,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: seoDescription,
      images: [ogImage],
    },
  };
}

export function createSiteMetadata(): Metadata {
  const baseMetadata = createSeoMetadata({
    title: {
      absolute: siteTitle,
    },
    description: defaultDescription,
    pathname: "/",
    keywords: [
      "프론트엔드 블로그",
      "프론트엔드 개발",
      "React",
      "Next.js",
      "TypeScript",
      "CSS",
      "Notion 블로그",
    ],
    image: defaultOgImage,
    imageWidth: 1024,
    imageHeight: 1024,
    imageType: "image/png",
    type: "website",
  });

  return {
    ...baseMetadata,
    metadataBase: new URL(siteUrl),
    title: {
      default: siteTitle,
      template: `%s | ${siteName}`,
    },
    applicationName: siteName,
    description: defaultDescription,
    alternates: {
      canonical: siteUrl,
    },
    referrer: "origin-when-cross-origin",
    verification: CONFIG.searchManager.google
      ? {
          google: CONFIG.searchManager.google,
        }
      : undefined,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
  };
}

export function createHomeMetadata(): Metadata {
  return createSeoMetadata({
    title: {
      absolute: siteTitle,
    },
    description: defaultDescription,
    pathname: "/",
    keywords: [
      "프론트엔드 블로그",
      "프론트엔드 개발 기록",
      "React",
      "Next.js",
      "TypeScript",
      "웹 개발",
      "Notion 블로그",
    ],
    image: defaultOgImage,
    imageWidth: 1024,
    imageHeight: 1024,
    imageType: "image/png",
    type: "website",
  });
}

export function createToolMetadata({
  title,
  description,
  pathname,
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  pathname: string;
  keywords: string[];
  noIndex?: boolean;
}) {
  return createSeoMetadata({
    title,
    description,
    pathname,
    keywords,
    image: getSocialImageUrl({
      kind: "tool",
      title,
      eyebrow: "Frontend Tool",
    }),
    imageWidth: 1200,
    imageHeight: 630,
    imageType: "image/png",
    type: "website",
    noIndex,
  });
}

export function createPostMetadata(post: TPost) {
  const authors =
    post.author?.map((author) => author.name).filter(Boolean) || [];
  const description = post.summary || post.title;
  const section = post.category?.[0] || post.type?.[0] || "Post";

  return createSeoMetadata({
    title: post.title,
    description,
    pathname: getPostPath(post),
    keywords: [...(post.tags || []), ...(post.category || [])],
    image: getPostSocialImage(post),
    type: "article",
    publishedTime: getPublishedDate(post),
    modifiedTime: getModifiedDate(post),
    authors,
    section,
  });
}

export function createHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: defaultDescription,
        inLanguage: "ko-KR",
      },
      {
        "@type": "Blog",
        "@id": `${siteUrl}/#blog`,
        url: siteUrl,
        name: siteName,
        description: defaultDescription,
        inLanguage: "ko-KR",
        publisher,
        image: defaultOgImage,
      },
    ],
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function createPostJsonLd(post: TPost) {
  const authors =
    post.author?.map((author) => author.name).filter(Boolean) || [creatorName];

  return {
    "@context": "https://schema.org",
    "@type": post.type?.[0] === "Post" ? "BlogPosting" : "Article",
    headline: post.title,
    description: shortenDescription(post.summary || post.title),
    url: getPostUrl(post),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getPostUrl(post),
    },
    image: [getPostSocialImage(post)],
    datePublished: getPublishedDate(post),
    dateModified: getModifiedDate(post),
    articleSection: post.category?.[0] || post.type?.[0] || "Frontend",
    keywords: [...(post.tags || []), ...(post.category || [])].join(", "),
    author: authors.map((name) => ({
      "@type": "Person",
      name,
    })),
    publisher,
  };
}

export const SEO_DEFAULTS = {
  creatorName,
  defaultOgImage,
  defaultDescription,
  siteName,
  siteTitle,
  siteUrl,
};
