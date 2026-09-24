/**
 * Content for the secondary case studies (rendered by src/pages/work/[slug].astro).
 * Copy is transcribed from screenshots of the current Framer site. Parts the screenshots cut off
 * are left as `todo` so they show as placeholders; don't fill them in by guessing.
 */
// Rendered as "<strong>lead.</strong> text". An item can instead be an inline image (`image`),
// or a placeholder slot for one (`shot`), so images can sit between paragraphs.
export interface Item {
  lead?: string;
  text?: string;
  image?: Img;
  shot?: string;
}

export interface Section {
  items?: Item[];
  todo?: string[];
}

export interface Img {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type SectionKey = 'problem' | 'outcome' | 'research' | 'team' | 'design' | 'validation' | 'reflection';

export interface CaseStudy {
  hero?: Img;
  // Section order, titles and images for this page. Without it the default flow is used.
  // `images` is a list of rows shown after the section text; a row of two sits side by side.
  // `shot` shows a placeholder slot instead when there is no image yet.
  flow?: { key: SectionKey; title: string; shot?: string; images?: Img[][] }[];
  headline?: string;
  subhead?: string;
  meta: { label: string; value: string }[];
  metrics?: { value: string; label: string }[];
  problem: Section;
  // Optional when the metrics say it all.
  outcome?: Section;
  research: Section;
  team?: Section;
  design: Section;
  validation?: Section;
  reflection: Section;
}

export const caseStudies: Record<string, CaseStudy> = {
  // Follows the flow of the Framer case study: challenges, result, research, solutions, key takeaways.
  'chatalog-ai': {
    hero: {
      src: '/images/chatalog/hero.webp',
      alt: 'chatalog.ai dashboard screens, centred on "Create new bot for this IG post" with rules, labels and bot properties',
      width: 1600,
      height: 800,
    },
    flow: [
      { key: 'problem', title: 'Challenges' },
      {
        key: 'outcome',
        title: 'Result',
        images: [
          [
            {
              src: '/images/chatalog/contact-overview.webp',
              alt: 'Contact Overview: a contacts table with channel filters, labels, membership and bulk actions',
              width: 1400,
              height: 868,
            },
          ],
        ],
      },
      { key: 'research', title: 'Research' },
      {
        key: 'design',
        title: 'Solutions',
        images: [
          [
            {
              src: '/images/chatalog/broadcast-setting.webp',
              alt: 'Broadcast Setting with separate Carousel, Single Image and Single Message options',
              width: 1400,
              height: 868,
            },
          ],
          [
            {
              src: '/images/chatalog/label-field.webp',
              alt: 'Label / Custom Field panel: adding a label, with the label dropdown open',
              width: 888,
              height: 647,
            },
            {
              src: '/images/chatalog/custom-field.webp',
              alt: 'Label / Custom Field panel on the Custom Field tab, with field name and value inputs',
              width: 487,
              height: 487,
            },
          ],
        ],
      },
      { key: 'reflection', title: 'Key takeaways' },
    ],
    headline: 'Simplified chatbot creation, reducing user confusion and inquiries.',
    subhead: 'Enhancing the user experience for a B2B chatbot platform.',
    meta: [
      { label: 'Responsibilities', value: 'Market research, competitor analysis, UI redesign, product enhancement' },
      { label: 'Team size', value: '7 people' },
      { label: 'Duration', value: '12 weeks' },
    ],
    metrics: [
      { value: '35%', label: 'Reduction in learning curve: users create and manage chatbots more efficiently' },
      { value: '40%', label: 'Decrease in customer support calls about chatbot setup' },
      { value: '25%', label: 'Faster chatbot setup' },
    ],
    problem: {
      items: [
        {
          lead: 'Tracking active chatbot rules',
          text: 'Users had difficulty identifying which chatbot rules were applied after setup, leading to confusion.',
        },
        {
          lead: 'Media upload confusion',
          text: 'When uploading media in the message creation process, it often replaced text unintentionally, causing frustration.',
        },
        {
          lead: 'Widget installation failure',
          text: 'Users frequently missed the domain URL input during web chat widget setup, leading to installation failures and a complex user experience.',
        },
      ],
    },
    outcome: {
      items: [
        { text: 'Enhanced user journey and UI changes resulted in smoother rule-tracking workflows.' },
        { text: 'Noticeable boost in overall user satisfaction and platform adoption.' },
      ],
    },
    research: {
      items: [
        {
          text: 'I conducted a comprehensive UX audit of the product, methodically identifying usability challenges and design opportunities. Through collaborative sessions with key stakeholders, I prioritized critical issues and developed an actionable roadmap for improvements.',
        },
        {
          text: 'Then I did user interviews and analyzed interview data to uncover core pain points and user needs. This insight-driven approach helped identify high-impact features for development, ensuring our efforts would deliver maximum value to users.',
        },
      ],
    },
    design: {
      items: [
        {
          lead: 'Improved rule visibility',
          text: 'Displayed applied rules prominently above the rule creation section, making it easier for users to identify active chatbot rules.',
        },
        {
          lead: 'Clearer media upload options',
          text: 'Introduced separate tabs for "Single Image" and "Single Message" to differentiate upload options, reducing confusion and errors.',
        },
        {
          lead: 'Simplified widget installation',
          text: 'The layout was reorganized to group settings logically, ensuring the domain URL input was placed above the Save button. A pop-up reminder was also added to prevent missed steps during installation.',
        },
      ],
    },
    reflection: {
      items: [
        {
          lead: 'Receiving feedback and giving feedback',
          text: 'I have come to understand that some of my proposals may be rejected due to technical constraints, but I now recognize that this is an integral part of the process of creating a better product. I have learned the importance of asking questions and engaging in discussions with team members, especially during the ideation and testing stages.',
        },
        {
          lead: 'Public speaking & storytelling',
          text: 'In the initial stages, I dedicated a substantial amount of time to conducting market and user research for the company, seeking out opportunities for product enhancement. As a result, I have learned how to effectively communicate my work, captivating the audience through storytelling rather than simply presenting a series of individual tasks or actions.',
        },
      ],
    },
  },

  // Follows the flow of the Framer case study. Transcribed from a low-resolution screenshot: proofread.
  flavorbyte: {
    hero: {
      src: '/images/flavorbyte/hero.webp',
      alt: 'FlavorByte app screens on a yellow background: restaurant detail, home with Near Me and Popular, and sushi search results',
      width: 1600,
      height: 851,
    },
    flow: [
      { key: 'problem', title: 'Challenges' },
      { key: 'outcome', title: 'Results' },
      { key: 'research', title: 'Discovery phase' },
      { key: 'design', title: 'Design and development' },
      { key: 'reflection', title: 'Conclusion' },
    ],
    headline: 'Personalized dining experiences with faster restaurant discovery.',
    meta: [
      {
        label: 'Responsibilities',
        value: 'Affinity mapping, user journey mapping, sketches, wireframes, prototypes, final app mock-up',
      },
      { label: 'Team size', value: 'Individual project' },
      { label: 'Duration', value: '12 weeks' },
    ],
    metrics: [
      { value: '30%', label: 'Less time spent searching for options' },
      { value: '40%', label: 'More accurate restaurant recommendations' },
    ],
    problem: {
      items: [
        {
          lead: 'Decision fatigue',
          text: 'Addressing the "paradox of choice" where an overwhelming number of restaurant options leads to user frustration and drop-off.',
        },
        {
          lead: 'Group coordination',
          text: 'Streamlining the friction-filled process of collective decision-making, where varying dietary preferences and schedules often lead to "decision paralysis."',
        },
        {
          lead: 'Trust in AI',
          text: 'Designing an AI-driven recommendation interface that feels personal and reliable rather than robotic, ensuring users feel confident in the suggestions provided.',
        },
      ],
    },
    outcome: {
      items: [
        {
          text: 'The final app design helped users find restaurants more efficiently and make collective decisions faster. The AI-driven features reduced the time spent searching for options by 30% and improved the accuracy of restaurant recommendations by 40%, leading to a better overall user experience.',
        },
        { image: { src: '/images/flavorbyte/bytey-chat.webp', alt: "Asking Bytey, FlavorByte's AI assistant: from 'Help me decide' to sushi recommendations in four chat screens", width: 1024, height: 560 } },
        { image: { src: '/images/flavorbyte/restaurant-reviews.webp', alt: 'Sushi Ron restaurant page with a Best Match tag, and its Reviews tab with rating breakdown and tags', width: 1024, height: 908 } },
      ],
    },
    research: {
      items: [
        {
          lead: 'Competitor analysis',
          text: 'Conducted in-depth research on leading restaurant search apps like Yelp, OpenTable, and Google Maps to understand key features, identify market gaps, and recognize areas for potential enhancement.',
        },
        {
          lead: 'Quantitative survey & user interviews',
          text: "Launched an online survey with 10 participants and held four one-on-one interviews. This provided valuable insights into users' needs, challenges, and opinions about AI's role in restaurant search. The main pain points identified were the overwhelming number of restaurant options, the challenge of making group decisions, and the desire for personalized recommendations.",
        },
        { image: { src: '/images/flavorbyte/competitor-analysis.webp', alt: 'Competitor analysis: Yelp for user-generated reviews and ratings, OpenTable for restaurant reservations, Google Maps for mapping and navigation', width: 1560, height: 790 } },
      ],
    },
    design: {
      items: [
        {
          lead: 'Affinity mapping & user journey mapping',
          text: 'Analyzed user data using affinity mapping, identifying common themes such as the paradox of choice and decision fatigue. The user journey map highlighted key pain points, which informed the design strategy.',
        },
        { image: { src: '/images/flavorbyte/affinity-map.webp', alt: 'Affinity map of interview notes grouped into themes such as outdated info, price, too many or too few options, reviews and personal preferences', width: 1600, height: 659 } },
        { image: { src: '/images/flavorbyte/user-journey-map.webp', alt: "User journey map for Olivia, finding a Friday-night restaurant with friends: stages Search, Browse, Consider and Decide, with actions, thoughts, feelings, pain points and opportunities", width: 1490, height: 1382 } },
        {
          lead: 'AI-driven recommendations',
          text: "Designed AI-powered features to deliver personalized restaurant recommendations based on users' past preferences, making the search process faster and more accurate.",
        },
        { image: { src: '/images/flavorbyte/best-match.webp', alt: "Sushi search results with a 'Best Match' tag on the top restaurant", width: 1024, height: 726 } },
        {
          lead: 'Collective decision-making features',
          text: 'Developed functionality to streamline group decision-making by allowing users to easily share restaurant options and vote, reducing the time and effort required to finalize decisions.',
        },
        { image: { src: '/images/flavorbyte/share-with-friends.webp', alt: 'Share sheet for picking restaurants to send to friends: Sushi Ron, Sushi Ninja and KAI Sushi', width: 1024, height: 712 } },
        {
          lead: 'Wireframes & prototyping',
          text: 'Created wireframes and prototypes that incorporated AI chatbot recommendations and a user-friendly interface. The design included map integration for easy navigation and restaurant discovery.',
        },
        { image: { src: '/images/flavorbyte/wireframes.webp', alt: 'Low-fidelity wireframes: home, map search, results list, restaurant page, and the Bytey chat flow through to sharing picks with friends', width: 1230, height: 1290 } },
      ],
    },
    reflection: {
      items: [
        {
          text: 'This solo project taught me the iterative nature of the design process. Initially, I overlooked Google Maps as a competitor, only discovering its importance during user research. I learned that successful design is not just about being unique but about addressing user needs and creating solutions that help them achieve their goals effectively.',
        },
      ],
    },
  },
  // Transcribed from a low-resolution screenshot: proofread before launch.
  'toronto-zoo': {
    meta: [
      {
        label: 'Responsibilities',
        value: 'Card sorting, information architecture, user task flow, sketches, wireframes, prototypes, final UI redesign',
      },
      { label: 'Team size', value: '5 people' },
      { label: 'Duration', value: '8 weeks' },
    ],
    metrics: [
      { value: '70%', label: 'Increase in ticket purchase flow completion' },
      { value: '40%', label: 'Fewer clicks to complete a ticket purchase' },
      { value: '56', label: 'Options removed from the purchase page, streamlining decisions' },
    ],
    problem: {
      todo: ['[The first problem(s) were cut off in the screenshot. Paste them here.]'],
      items: [
        {
          lead: 'Outdated website design',
          text: 'The old website lacked an intuitive flow and the navigation was confusing, leading to a negative user experience and difficulty finding key sections.',
        },
      ],
    },
    research: {
      items: [
        {
          text: "I began with an in-depth analysis of both business and user goals, revealing that ticket purchases were the primary focus for users, directly impacting zoo revenue. Through individual and group card sorting exercises, I reorganized the website's information architecture to ensure users could navigate to key sections within three clicks, with login options readily accessible.",
        },
        {
          text: 'I then mapped out the streamlined ticket purchasing task flow, allowing users to save their personal and payment information in accounts for quicker future transactions.',
        },
      ],
    },
    team: {
      items: [{ text: 'UI Designer on a team of 5, over 8 weeks.' }],
      todo: ['[Who else was on the team, and what you owned vs. contributed to.]'],
    },
    design: {
      todo: ['[The part of this section between the task flow and the style guide was cut off. Paste it here.]'],
      items: [
        {
          text: "The UI style guide focused on improving accessibility and creating a fresh, cohesive design that aligns with the zoo's goals.",
        },
      ],
    },
    validation: {
      todo: ['[What the usability testing covered, who took part, and what changed as a result.]'],
    },
    reflection: {
      items: [
        {
          text: 'Usability testing is essential in uncovering user pain points that may not have been initially anticipated. By implementing guest checkout and making the navigation easier, we significantly improved the user experience. Testing early and often allows us to refine the design for real-world application.',
        },
      ],
    },
  },
};
