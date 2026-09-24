import { metrics } from './metrics';

export const site = {
  name: 'Megan Cheng',
  shortName: 'Megan.',
  title: 'Megan Cheng: Product Designer',
  description:
    'Product designer who ships measurable business impact inside real technical constraints. Retail, banking, and AI product.',
  location: 'Toronto, ON',
  email: '6meganc@gmail.com',
  linkedin: 'https://www.linkedin.com/in/6meganc/',
  instagram: 'https://www.instagram.com/6rootie/',
  // TODO: host the résumé PDF (e.g. public/megan-cheng-resume.pdf) and set the path here.
  resume: '',
  copyrightYear: 2026,
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/#work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/playground', label: 'AI Playground' },
];

// All case studies, in display order. Each slug maps to /work/<slug>.
// `impact` is the one headline result shown on the card; `thumb` is a path under public/ (placeholder until set).
export interface Project {
  slug: string;
  name: string;
  title: string;
  role: string;
  impact: string;
  thumb?: string;
}

export const projects: Project[] = [
  {
    slug: 'canadian-tire',
    name: 'Canadian Tire',
    title: 'Boosting retail engagement through personalized deals',
    role: 'Product Designer (Lead UI)',
    // Unverified: see src/data/metrics.ts.
    impact: `${metrics.conversionLift.value} online conversion`,
  },
  {
    slug: 'chatalog-ai',
    name: 'chatalog.ai',
    title: 'Simplified chatbot creation for a B2B platform',
    role: 'UX/UI Designer',
    impact: '40% fewer support calls',
  },
  {
    slug: 'flavorbyte',
    name: 'FlavorByte',
    title: 'Personalized dining with faster restaurant discovery',
    role: 'Product Designer',
    impact: '30% less time searching',
    thumb: '/images/thumb-flavorbyte.webp',
  },
  {
    slug: 'toronto-zoo',
    name: 'Toronto Zoo',
    title: 'Redesigning the ticket purchase flow',
    role: 'UI Designer',
    impact: '70% more completed ticket purchases',
  },
];
