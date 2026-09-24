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

// Secondary projects shown after the featured Canadian Tire case study.
// Set `href` once a case study page exists; until then the card reads "Case study coming soon".
export const projects: { name: string; role: string; href?: string }[] = [
  { name: 'chatalog.ai', role: 'UX/UI Designer' },
  { name: 'FlavorByte', role: 'Product Designer' },
  { name: 'Toronto Zoo', role: 'UI Designer' },
];
