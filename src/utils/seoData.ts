export interface ScreenSEO {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

export const SEO_CONFIG: Record<string, ScreenSEO> = {
  home: {
    title: 'Mycodu Agency | AI Engineering & Full-Stack Digital Solutions',
    description: 'Mycodu Agency delivers high-impact software engineering, custom AI architectures, intelligent automation, mobile apps, and scalable web platforms.',
    keywords: 'software agency, web development, mobile app development, AI engineering, full stack development, technical SEO',
  },
  'web-dev': {
    title: 'Modern Web Development Services | Mycodu Agency',
    description: 'High-performance web applications built with modern frontend frameworks, serverless APIs, and lightning-fast loading speeds.',
    keywords: 'web development, React web development, frontend engineering, responsive web apps, TypeScript development',
  },
  'app-dev': {
    title: 'Cross-Platform & Native Mobile App Development | Mycodu Agency',
    description: 'Custom iOS and Android mobile app development engineered for high performance, smooth UX, and enterprise scalability.',
    keywords: 'mobile app development, iOS app developer, Android app, Flutter, React Native, mobile engineering',
  },
  'full-stack': {
    title: 'Full-Stack Software Architecture & Cloud Solutions | Mycodu Agency',
    description: 'End-to-end software engineering from database modeling and resilient microservices to high-converting user interfaces.',
    keywords: 'full-stack software engineering, cloud architecture, backend APIs, microservices, database design',
  },
  'ai-eng': {
    title: 'AI Engineering, Custom LLMs & Agentic Systems | Mycodu Agency',
    description: 'Harness state-of-the-art AI: customized LLM fine-tuning, RAG knowledge bases, computer vision, and autonomous agent workflows.',
    keywords: 'AI engineering, machine learning agency, custom LLM, RAG pipelines, generative AI solutions, AI integration',
  },
  'data-science': {
    title: 'Data Science & Predictive Analytics Consulting | Mycodu Agency',
    description: 'Transform raw enterprise data into strategic intelligence with predictive modeling, real-time analytics, and data pipeline pipelines.',
    keywords: 'data science, predictive analytics, big data engineering, business intelligence, data analytics agency',
  },
  'ai-auto': {
    title: 'AI Automation & Enterprise Workflow Optimization | Mycodu Agency',
    description: 'Eliminate repetitive manual operations with intelligent AI automation, RPA, API orchestrations, and autonomous agents.',
    keywords: 'AI automation, intelligent process automation, workflow automation, autonomous business agents',
  },
  'portfolio': {
    title: 'Portfolio & Client Case Studies | Mycodu Agency',
    description: 'Explore our track record of impactful software engineering projects, AI deployments, and client success stories.',
    keywords: 'software engineering portfolio, agency case studies, tech project showcases',
  },
  'process': {
    title: 'Our Engineering Process & Delivery Methodology | Mycodu Agency',
    description: 'Learn about our rigorous agile development lifecycle, engineering standards, testing frameworks, and delivery guarantees.',
    keywords: 'software development process, agile agency methodology, technical delivery cycle',
  },
  'seo': {
    title: 'Technical SEO & Search Dominance Strategies | Mycodu Agency',
    description: 'Data-driven technical SEO, Core Web Vitals optimization, and search engine dominance to drive qualified organic traffic.',
    keywords: 'technical SEO, search engine optimization, Core Web Vitals, organic growth, programmatic SEO',
  },
};

/**
 * Updates DOM head tags dynamically when the user transitions between screens
 */
export function updatePageSEO(screen: string) {
  const seo = SEO_CONFIG[screen] || SEO_CONFIG.home;

  // Document Title
  document.title = seo.title;

  // Standard Meta Tags
  updateMetaTag('name', 'title', seo.title);
  updateMetaTag('name', 'description', seo.description);
  if (seo.keywords) {
    updateMetaTag('name', 'keywords', seo.keywords);
  }

  // Open Graph
  updateMetaTag('property', 'og:title', seo.title);
  updateMetaTag('property', 'og:description', seo.description);

  // Twitter
  updateMetaTag('property', 'twitter:title', seo.title);
  updateMetaTag('property', 'twitter:description', seo.description);
}

function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
