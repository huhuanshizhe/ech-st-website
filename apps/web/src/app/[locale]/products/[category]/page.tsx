import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import CategoryPage from './CategoryPage';

const categoryData: Record<string, {
  en: { name: string; description: string; keywords: string[] };
  zh: { name: string; description: string; keywords: string[] };
}> = {
  'mccb': {
    en: {
      name: 'MCCB - Molded Case Circuit Breakers',
      description: 'Explore ECH-ST MCCB product series including thermomagnetic, electronic, and intelligent circuit breakers. Frame sizes from 125A to 1250A with breaking capacity up to 85kA.',
      keywords: ['MCCB', 'molded case circuit breaker', 'thermomagnetic MCCB', 'electronic MCCB', 'DC circuit breaker', 'IoT circuit breaker']
    },
    zh: {
      name: '塑壳断路器',
      description: '浏览ECH-ST塑壳断路器产品系列，包括热磁式、电子式和智能断路器。框架等级125A-1250A，分断能力高达85kA。',
      keywords: ['塑壳断路器', 'MCCB', '热磁式断路器', '电子式断路器', '直流断路器', '物联网断路器']
    }
  },
  'mcb': {
    en: {
      name: 'MCB - Miniature Circuit Breakers',
      description: 'ECH-ST MCB product series for residential and commercial applications. RCBO and RCCB options available with comprehensive protection.',
      keywords: ['MCB', 'miniature circuit breaker', 'RCBO', 'RCCB', 'residual current device', 'earth leakage protection']
    },
    zh: {
      name: '小型断路器',
      description: 'ECH-ST小型断路器产品系列，适用于住宅和商业应用。提供RCBO和RCCB选项，全面保护。',
      keywords: ['小型断路器', 'MCB', '漏电断路器', 'RCCB', 'RCBO', '漏电保护']
    }
  },
  'circuit-protection': {
    en: {
      name: 'Circuit Protection Devices - SPD & MOV',
      description: 'ECH-ST circuit protection products including Surge Protective Devices (SPD) and Metal Oxide Varistors (MOV) for comprehensive electrical system protection.',
      keywords: ['SPD', 'surge protection', 'MOV', 'varistor', 'surge protective device', 'lightning protection']
    },
    zh: {
      name: '电路保护器件',
      description: 'ECH-ST电路保护产品，包括浪涌保护器（SPD）和压敏电阻（MOV），为电气系统提供全面保护。',
      keywords: ['浪涌保护器', 'SPD', '压敏电阻', 'MOV', '防雷保护', '过压保护']
    }
  },
  'energy-storage': {
    en: {
      name: 'Energy Storage Solutions',
      description: 'ECH-ST energy storage systems for commercial and industrial applications. All-in-one solutions with integrated PCS, BMU, and EMS.',
      keywords: ['energy storage', 'ESS', 'battery storage', 'solar storage', 'commercial energy storage', 'industrial ESS']
    },
    zh: {
      name: '储能系统',
      description: 'ECH-ST储能系统，适用于工商业应用。一体化解决方案，集成PCS、BMU和EMS。',
      keywords: ['储能系统', 'ESS', '电池储能', '光伏储能', '工商业储能', '微电网']
    }
  },
  'intelligent-devices': {
    en: {
      name: 'Intelligent Devices - Smart Grid Equipment',
      description: 'ECH-ST intelligent devices including smart circuit breakers, IoT-enabled equipment, and smart grid solutions for modern power distribution.',
      keywords: ['smart circuit breaker', 'IoT device', 'intelligent grid', 'smart grid', 'remote monitoring', 'smart fuse']
    },
    zh: {
      name: '智能设备',
      description: 'ECH-ST智能设备，包括智能断路器、物联网设备和智能电网解决方案，服务于现代配电。',
      keywords: ['智能断路器', '物联网设备', '智能电网', '远程监控', '智能熔断器', '配电自动化']
    }
  },
};

export async function generateMetadata({
  params: { locale, category },
}: {
  params: { locale: string; category: string };
}): Promise<Metadata> {
  const data = categoryData[category];
  const isZh = locale === 'zh';
  
  const title = data ? (isZh ? data.zh.name : data.en.name) : category;
  const description = data ? (isZh ? data.zh.description : data.en.description) : '';
  const keywords = data ? (isZh ? data.zh.keywords : data.en.keywords) : [];
  
  const baseUrl = 'https://ech-st.com';
  const url = `${baseUrl}/${locale}/products/${category}`;
  
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${baseUrl}/en/products/${category}`,
        'zh-CN': `${baseUrl}/zh/products/${category}`,
      },
    },
    openGraph: {
      title: `${title} | ECH-ST Electrics`,
      description,
      url,
      type: 'website',
      images: [
        {
          url: `/images/products/${category}/og.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ECH-ST Electrics`,
      description,
    },
  };
}

export default async function ProductCategoryPage({
  params: { locale, category },
}: {
  params: { locale: string; category: string };
}) {
  setRequestLocale(locale);
  return <CategoryPage locale={locale} categorySlug={category} />;
}