export const site = {
  name: 'Megan Cheng',
  shortName: 'Megan.',
  title: 'Megan Cheng: Product Designer',
  description:
    'Product designer who ships measurable business impact inside real technical constraints. Retail, banking, and AI product.',
  location: 'Toronto, ON',
  email: '6meganc@gmail.com',
  linkedin: 'https://www.linkedin.com/in/6meganc',
  // TODO: host the résumé PDF (e.g. public/megan-cheng-resume.pdf) and set the path here.
  resume: '',
  openToYear: '2027',
  copyrightYear: 2026,
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/#work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/playground', label: 'AI Playground' },
];

// All case studies, in display order. The first is the featured one on the homepage.
// Each slug maps to /work/<slug>.
export interface Project {
  slug: string;
  name: string;
  role: string;
}

export const projects: Project[] = [
  { slug: 'canadian-tire', name: 'Canadian Tire', role: 'Lead UI Designer' },
  { slug: 'chatalog-ai', name: 'chatalog.ai', role: 'UX/UI Designer' },
  { slug: 'flavorbyte', name: 'FlavorByte', role: 'Product Designer' },
  { slug: 'toronto-zoo', name: 'Toronto Zoo', role: 'UI Designer' },
];
