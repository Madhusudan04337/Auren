import { Article } from '../types';
import { HERO_IMAGE, NOIR_FRAGRANCE_IMAGE, CLOUD_BARRIER_IMAGE, SKIN_TINT_IMAGE, MORNING_RITUAL_IMAGE } from './products';

export const ARTICLES: Article[] = [
  {
    id: 'journal-01',
    slug: 'anatomy-of-the-lipid-barrier',
    title: 'The Anatomy of the Lipid Barrier: Why Reconstruction Precedes All Glow',
    category: 'Skin Science',
    readTime: '4 min read',
    date: 'October 2026',
    author: 'Dr. Camille Laurent',
    authorRole: 'Head of Dermal Biochemistry',
    excerpt: 'Over-exfoliation and aggressive surfactants have created a generation of sensitized skins. Here is why bio-identical ceramides and free fatty acids are irreplaceable.',
    content: [
      'The stratum corneum is often envisioned as a brick wall: corneocytes are the cellular bricks, and lipid bilayers are the mortar. When this mortar is compromised by seasonal shifts, harsh foaming agents, or aggressive chemical peels, transepidermal water loss accelerates exponentially.',
      'Our research at AUREN focuses on recreating the golden physiological 3:1:1 lipid ratio: 3 parts ceramides, 1 part cholesterol, and 1 part essential free fatty acids. Without this precise molecular architecture, topical hydration simply evaporates within hours.',
      'To restore balance: cease stripping foams, favor lipid-replenishing oil-to-milk formulas, and seal vulnerable zones with a biomimetic barrier cream before introducing active acids.'
    ],
    featuredImage: CLOUD_BARRIER_IMAGE,
    relatedProductIds: ['auren-01', 'auren-04']
  },
  {
    id: 'journal-02',
    slug: 'understanding-fragrance-pyramids',
    title: 'The Architecture of Scent: Deciphering Sillage, Volatility & Base Notes',
    category: 'Haute Parfumerie',
    readTime: '5 min read',
    date: 'September 2026',
    author: 'Antoine Vasseur',
    authorRole: 'Master Perfumer & Olfactory Formulator',
    excerpt: 'Fragrance is an unfolding chronologic composition. Discover how temperature, molecular weight, and natural absolutes dictate how a scent evolves throughout your day.',
    content: [
      'Top notes are volatile poetry: crisp bergamot, green fig leaves, and crushed peppercorns that disperse rapidly within 15 to 30 minutes, creating the initial greeting of a fragrance.',
      'The heart or heart chord reveals the true emotional character—rare Florentine orris root, Moroccan neroli, and damask rose that settle over the next two to four hours.',
      'The foundation rests upon dense macromolecules: cedarwood resins, amber accords, and plant musk that cling to keratin fibers for up to 14 hours. When applying perfume, never crush the wrists together; friction generates heat that tears fragile volatile head notes before they can blossom.'
    ],
    featuredImage: NOIR_FRAGRANCE_IMAGE,
    relatedProductIds: ['auren-02', 'auren-06']
  },
  {
    id: 'journal-03',
    slug: 'complexion-realism-finding-undertones',
    title: 'Complexion Realism: Working With Undertones Rather Than Masking Them',
    category: 'Couture Complexion',
    readTime: '3 min read',
    date: 'August 2026',
    author: 'Maya Sorel',
    authorRole: 'Global Editorial Makeup Director',
    excerpt: 'True luxury complexion care should never feel like a painted mask. How micro-encapsulated mineral pigments celebrate individual skin nuance.',
    content: [
      'The modern approach to foundation has evolved from full-coverage camouflage into radiant skin enhancement. The goal is no longer to erase skin texture, but to harmonize tonal irregularities while preserving natural freckles and living radiance.',
      'When determining your undertone, examine the veins on your inner wrist under natural daylight: blue or violet tones indicate cool undertones, olive or greenish hues suggest warm golden tones, and a mix indicates neutral undertones.',
      'By utilizing breathable hyaluronic fluid bases infused with encapsulated minerals, pigments adapt organically to your surface temperature upon light blending.'
    ],
    featuredImage: SKIN_TINT_IMAGE,
    relatedProductIds: ['auren-03', 'auren-01']
  },
  {
    id: 'journal-04',
    slug: 'frictionless-grooming-rituals',
    title: 'Clean Lines: The Art of Frictionless Daily Grooming',
    category: 'Grooming Philosophy',
    readTime: '4 min read',
    date: 'July 2026',
    author: 'Julian Vance',
    authorRole: 'Grooming Specialist',
    excerpt: 'A considered guide to razor glide, hair softening, and preventing post-shave inflammatory flare-ups.',
    content: [
      'Shaving is technically a micro-exfoliation event. When a sharp steel blade passes over facial skin, it removes not only keratinized whiskers, but also a fraction of the protective hydrolipidic film.',
      'Pre-shave preparation is non-negotiable: warm water and cold-pressed botanical oils soften coarse keratin fibers by up to 60%, drastically reducing the shear force required to slice the follicle.',
      'Post-shave care should never burn with astringent alcohol. Look for centella asiatica and cypress extract that soothe vascular dilation and calm razor burn immediately.'
    ],
    featuredImage: HERO_IMAGE,
    relatedProductIds: ['auren-05', 'auren-04']
  }
];
