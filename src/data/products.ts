import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_editorial_beauty_1791455299205.jpg';
export const CLOUD_BARRIER_IMAGE = '/src/assets/images/product_cloud_barrier_1791455311264.jpg';
export const NOIR_FRAGRANCE_IMAGE = '/src/assets/images/product_noir_fragrance_1791455322897.jpg';
export const SKIN_TINT_IMAGE = '/src/assets/images/product_skin_tint_1791455332361.jpg';
export const MORNING_RITUAL_IMAGE = '/src/assets/images/ritual_morning_reset_1791455342898.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'auren-01',
    slug: 'cloud-barrier-cream',
    name: 'Cloud Barrier Cream',
    subtitle: 'Lipid Replenishing Ceramide Emulsion',
    category: 'Skin',
    audience: ['Unisex', 'Women', 'Men'],
    type: 'Moisturizer',
    price: 1890,
    originalPrice: 2200,
    rating: 4.9,
    reviewCount: 342,
    badge: 'Bestseller',
    benefit: 'Intensive lipid matrix restoration for stressed, dehydrated, and sensitized skin barriers',
    description: 'An architectural formulation engineered with biomimetic ceramides (EOP, NP, AP), free fatty acids, and phytosterols in a golden 3:1:1 ratio. Cloud Barrier Cream wraps the stratum corneum in featherweight comfort, locking in 72-hour cellular hydration without residual weight.',
    concerns: ['Dryness', 'Sensitivity', 'Barrier', 'Redness'],
    skinTypes: ['Dry', 'Sensitive', 'Normal', 'Combination'],
    keyIngredients: [
      { name: 'Ceramide Tri-Complex', role: 'Barrier Rebuilder', description: 'Reconstructs intercellular cement to prevent transepidermal water loss.' },
      { name: 'Squalane (100% Sugarcane)', role: 'Emollient', description: 'Mimics natural skin sebum to soften and preserve cellular flexibility.' },
      { name: 'Colloidal Oat Beta-Glucan', role: 'Soothing Agent', description: 'Calms inflammatory pathways and reactivity within 15 minutes.' }
    ],
    inciIngredients: 'Aqua (Water), Squalane, Caprylic/Capric Triglyceride, Glycerin, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Avena Sativa (Oat) Kernel Extract, Niacinamide, Sodium Hyaluronate, Cetearyl Alcohol, Tocopherol.',
    sizes: [
      { size: '50 ml', price: 1890 },
      { size: '100 ml Grand Flacon', price: 2990 }
    ],
    images: [
      CLOUD_BARRIER_IMAGE,
      HERO_IMAGE,
      MORNING_RITUAL_IMAGE
    ],
    texture: 'Velvety cloud souffle that dissolves into a satin second-skin finish.',
    usageSteps: [
      'Warm a hazelnut-sized portion between fingertips.',
      'Gently press across face, neck, and decolletage following upward lymphatic contours.',
      'Use morning and evening as the sealing chapter of your skincare ritual.'
    ],
    inStock: true
  },
  {
    id: 'auren-02',
    slug: 'noir-03-eau-de-parfum',
    name: 'Noir 03 Eau de Parfum',
    subtitle: 'Haute Parfumerie · Resinous Cedar & Iris',
    category: 'Fragrance',
    audience: ['Unisex', 'Men', 'Women'],
    type: 'Eau de Parfum',
    price: 3690,
    rating: 4.9,
    reviewCount: 188,
    badge: 'Haute Exclusive',
    benefit: 'A magnetic, warm woody signature that lingers with intimate sillage and amber warmth',
    description: 'Noir 03 explores the quiet tension between sacred resin and crisp morning light. Bergamot and cracked pink pepper yield to an intoxicating heart of Florentine orris root and shadowed Turkish rose, anchored in deep Atlantic cedarwood and warm resinous amber.',
    concerns: ['Signature Scent', 'Evening Allure', 'Longevity'],
    skinTypes: ['All Skin Types'],
    keyIngredients: [
      { name: 'Florentine Orris', role: 'Heart Note', description: 'Rare aged iris butter providing powdery suede elegance.' },
      { name: 'Smoked Cedarwood', role: 'Base Note', description: 'Dry, architectural wood harvested through certified forestry.' },
      { name: 'Calabrian Bergamot', role: 'Top Note', description: 'Sun-drenched cold-pressed peel adding luminous sparkling friction.' }
    ],
    inciIngredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Alpha-Isomethyl Ionone, Coumarin, Citronellol, Geraniol, Citral.',
    sizes: [
      { size: '50 ml Flacon', price: 3690 },
      { size: '100 ml Flacon', price: 5490 },
      { size: '10 ml Travel Spray', price: 1250 }
    ],
    fragranceNotes: {
      top: ['Calabrian Bergamot', 'Pink Peppercorn', 'Cardamom Pod'],
      heart: ['Florentine Orris', 'Turkish Damask Rose', 'Smoked Incense'],
      base: ['Atlas Cedarwood', 'Warm Amber Resin', 'Tahitian Vanilla', 'Cashmere Musk'],
      intensity: 'Intense',
      sillage: 'Enveloping',
      family: 'Woody Amber'
    },
    images: [
      NOIR_FRAGRANCE_IMAGE,
      HERO_IMAGE
    ],
    texture: 'High-concentration pure parfum mist (22% essence oil).',
    usageSteps: [
      'Mist onto pulse points: throat, hollow of the clavicle, and inner wrists.',
      'Allow to settle on skin without friction to preserve delicate volatile top notes.',
      'Layer over Cloud Barrier Cream or body oil for unmatched 14-hour longevity.'
    ],
    inStock: true
  },
  {
    id: 'auren-03',
    slug: 'soft-focus-skin-tint',
    name: 'Soft Focus Skin Tint',
    subtitle: 'Luminous Micro-Pigment Complexion Fluid',
    category: 'Makeup',
    audience: ['Women', 'Unisex'],
    type: 'Complexion Fluid',
    price: 2190,
    rating: 4.8,
    reviewCount: 412,
    badge: 'Bestseller',
    benefit: 'Seamless breathable coverage that blurs texture while bathing skin in dewy light',
    description: 'Formulated to bridge high-performance skincare and couture beauty. Micro-encapsulated mineral pigments float in a base of hyaluronic acid and fermented camellia oil, evening tone and softening pores with zero cake or settling.',
    concerns: ['Uneven Tone', 'Dullness', 'Pore Refinement'],
    skinTypes: ['Normal', 'Dry', 'Combination', 'Oily'],
    keyIngredients: [
      { name: 'Encapsulated Mineral Pigments', role: 'Tone Harmony', description: 'Burst upon gentle contact to adjust to unique undertones.' },
      { name: 'Hyaluronic Acid Micro-Spheres', role: 'Hydration Cushion', description: 'Plumps fine dehydration lines throughout the day.' },
      { name: 'Fermented Camellia Japonica Oil', role: 'Radiance Infusion', description: 'Delivers a healthy, lit-from-within glow without greasiness.' }
    ],
    inciIngredients: 'Aqua, Isododecane, Dimethicone, Camellia Japonica Seed Oil, Glycerin, Titanium Dioxide, Sodium Hyaluronate, Polyglyceryl-4 Isostearate, Silica, Phenoxyethanol, Iron Oxides (CI 77491, CI 77492, CI 77499).',
    sizes: [
      { size: '30 ml Dropper', price: 2190 }
    ],
    shades: [
      { id: 'shade-01', name: '01 Porcelain Alabaster', hex: '#F3E5D8', undertone: 'Cool', description: 'Fair porcelain with gentle pink luminosity' },
      { id: 'shade-02', name: '02 Sand Bisque', hex: '#E6CFB7', undertone: 'Neutral', description: 'Light-medium with balanced neutral beige warmth' },
      { id: 'shade-03', name: '03 Warm Ochre', hex: '#D2A984', undertone: 'Warm', description: 'Medium with golden honey undertones' },
      { id: 'shade-04', name: '04 Amber Terracotta', hex: '#B88258', undertone: 'Warm', description: 'Tan with rich golden amber radiance' },
      { id: 'shade-05', name: '05 Deep Umber', hex: '#77472E', undertone: 'Neutral', description: 'Deep rich espresso with warm balanced base' }
    ],
    images: [
      SKIN_TINT_IMAGE,
      CLOUD_BARRIER_IMAGE
    ],
    texture: 'Fluid silk serum that blends effortlessly with fingertips or buffing brush.',
    usageSteps: [
      'Dispense 3-4 drops onto back of hand.',
      'Blend outwards from center of face using fingertips or flat foundation brush.',
      'Build coverage over areas needing extra calm or color correction.'
    ],
    finish: 'Satin Candlelight Glow',
    coverage: 'Light to Medium Buildable',
    inStock: true
  },
  {
    id: 'auren-04',
    slug: 'botanical-cleansing-elixir',
    name: 'Botanical Cleansing Elixir',
    subtitle: 'Nourishing Oil-to-Milk Facial Wash',
    category: 'Skin',
    audience: ['Unisex', 'Men', 'Women'],
    type: 'Cleanser',
    price: 1450,
    rating: 4.8,
    reviewCount: 220,
    badge: 'Award Winner',
    benefit: 'Melt away impurities and makeup while respecting delicate acid mantle pH (5.2)',
    description: 'A transformative botanical wash enriched with cold-pressed jojoba, sea buckthorn oil, and chamomile extract. On contact with water, it transforms into an ethereal milk, lifting environmental debris without stripping vital skin lipids.',
    concerns: ['Cleansing', 'Barrier', 'Sensitivity', 'Dullness'],
    skinTypes: ['All Skin Types', 'Sensitive', 'Dry'],
    keyIngredients: [
      { name: 'Cold-Pressed Jojoba', role: 'Lipid Cleanser', description: 'Dissolves stubborn sebum and pollution without clogging pores.' },
      { name: 'Sea Buckthorn Berry', role: 'Nutrient Glow', description: 'Packed with Omega 7 and Vitamin C for cellular renewal.' },
      { name: 'Roman Chamomile', role: 'Calming Essential', description: 'Comforts reactive skin and reduces visual flush.' }
    ],
    inciIngredients: 'Helianthus Annuus (Sunflower) Seed Oil, Glycerin, Caprylic/Capric Triglyceride, Aqua, Simmondsia Chinensis (Jojoba) Seed Oil, Hippophae Rhamnoides (Sea Buckthorn) Fruit Oil, Anthemis Nobilis Flower Oil, Tocopherol.',
    sizes: [
      { size: '150 ml Glass Pump', price: 1450 },
      { size: '300 ml Eco Refill', price: 2390 }
    ],
    images: [
      MORNING_RITUAL_IMAGE,
      CLOUD_BARRIER_IMAGE
    ],
    texture: 'Silky golden oil that blossoms into a delicate cloud milk upon splash of warm water.',
    usageSteps: [
      'Apply 2 pumps onto dry skin and massage in circular rhythms for 60 seconds.',
      'Introduce warm water to transform into rich milk.',
      'Rinse clean with lukewarm water or soft bamboo cloth.'
    ],
    inStock: true
  },
  {
    id: 'auren-05',
    slug: 'cypress-vetiver-shave-serum',
    name: 'Cypress & Vetiver Shave Serum',
    subtitle: 'Ultra-Glide Post-Shave Barrier Cushion',
    category: 'Grooming',
    audience: ['Men', 'Unisex'],
    type: 'Shave & Grooming',
    price: 1650,
    rating: 4.9,
    reviewCount: 156,
    badge: 'Bestseller',
    benefit: 'Zero razor friction, instant irritation relief, and refined pore clarity',
    description: 'Formulated for precision razor glide and post-shave comfort. Organic cypress leaf extract, Haitian vetiver root, and centella asiatica calm micro-nicks, neutralize ingrown hairs, and restore skin equilibrium.',
    concerns: ['Razor Burn', 'Sensitivity', 'Ingrown Hairs', 'Redness'],
    skinTypes: ['Sensitive', 'Normal', 'Oily', 'Combination'],
    keyIngredients: [
      { name: 'Centella Asiatica (Cica)', role: 'Repair Extract', description: 'Accelerates skin renewal and calms epidermal inflammation.' },
      { name: 'Haitian Vetiver Oil', role: 'Antiseptic Scent', description: 'Earthy, masculine botanical that purifies pores.' },
      { name: 'Allantoin', role: 'Keratolytic Agent', description: 'Softens coarse facial hair and eases blade passage.' }
    ],
    inciIngredients: 'Aqua, Aloe Barbadensis Leaf Juice, Glycerin, Centella Asiatica Extract, Hamamelis Virginiana (Witch Hazel) Water, Vetiveria Zizanoides Root Oil, Cupressus Sempervirens (Cypress) Leaf Oil, Allantoin, Carbomer, Phenoxyethanol.',
    sizes: [
      { size: '100 ml Pump', price: 1650 }
    ],
    images: [
      HERO_IMAGE,
      NOIR_FRAGRANCE_IMAGE
    ],
    texture: 'Cooling, featherweight transparent gel serum that leaves skin matte and calmed.',
    usageSteps: [
      'Smooth over damp skin before razor glide for cushion protection.',
      'Alternatively, pat a pea-sized pump over shaved zones as a soothing barrier tonic.'
    ],
    inStock: true
  },
  {
    id: 'auren-06',
    slug: 'solaris-eau-fraiche',
    name: 'Solaris Eau Fraîche',
    subtitle: 'Sunlit Neroli, Fig Leaf & Sea Salt',
    category: 'Fragrance',
    audience: ['Unisex', 'Women', 'Men'],
    type: 'Eau de Parfum',
    price: 3450,
    rating: 4.7,
    reviewCount: 142,
    badge: 'New',
    benefit: 'Crisp, solar vitality inspired by Mediterranean morning cliff breezes and citrus blossoms',
    description: 'An effervescent study in light. Solaris opens with sparkling Italian mandarin and crushed fig leaves, blossoming into bitter orange neroli and a mineral sea salt breeze on sun-warmed driftwood.',
    concerns: ['Freshness', 'Daywear', 'Uplifting'],
    skinTypes: ['All Skin Types'],
    keyIngredients: [
      { name: 'Moroccan Neroli', role: 'Heart Note', description: 'Distilled orange flower petals exuding honeyed floral brightness.' },
      { name: 'Green Fig Leaf', role: 'Top Note', description: 'Crisp vegetal green that cuts through warmth.' },
      { name: 'Solar Driftwood', role: 'Base Note', description: 'Sun-dried woods with mineral sea salt crystalline facets.' }
    ],
    inciIngredients: 'Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Benzyl Salicylate, Hydroxycitronellal, Linalool, Citral.',
    sizes: [
      { size: '50 ml Flacon', price: 3450 },
      { size: '100 ml Flacon', price: 5190 }
    ],
    fragranceNotes: {
      top: ['Italian Mandarin', 'Crushed Fig Leaf', 'Petitgrain'],
      heart: ['Moroccan Neroli', 'White Jasmine Petals', 'Fleur de Sel'],
      base: ['Sun-Bleached Driftwood', 'White Ambergris', 'Sheer Musk'],
      intensity: 'Moderate',
      sillage: 'Noticeable',
      family: 'Citrus Aquatic'
    },
    images: [
      NOIR_FRAGRANCE_IMAGE,
      HERO_IMAGE
    ],
    texture: 'Fine artisanal perfume mist.',
    usageSteps: [
      'Spritz generously over hair, neck, and clothing.',
      'Ideal for daytime clarity and revitalizing afternoon resets.'
    ],
    inStock: true
  },
  {
    id: 'auren-07',
    slug: 'peptide-recovery-mask',
    name: 'Peptide Recovery Sleep Mask',
    subtitle: 'Overnight Cellular Rejuvenation Gel-Balm',
    category: 'Skin',
    audience: ['Unisex', 'Women', 'Men'],
    type: 'Treatment Mask',
    price: 2450,
    rating: 4.9,
    reviewCount: 295,
    badge: 'Award Winner',
    benefit: 'Wake up to cushion-plump elasticity, reduced fatigue lines, and refined skin texture',
    description: 'A chronobiological night balm that works in tandem with the circadian rhythm of skin repair. Quad-peptide complexes stimulate collagen synthesis while encapsulated bakuchiol smooths texture without irritation.',
    concerns: ['Aging', 'Firmness', 'Fatigue', 'Dullness'],
    skinTypes: ['All Skin Types', 'Mature', 'Fatigued'],
    keyIngredients: [
      { name: 'Copper Tripeptide-1', role: 'Cellular Messenger', description: 'Signals tissue repair and collagen matrix synthesis.' },
      { name: 'Bakuchiol (1%)', role: 'Natural Retinol Alternative', description: 'Clinically improves cellular turnover without retinoid peeling.' },
      { name: 'Tremella Fuciformis (Snow Mushroom)', role: 'Mega Hydrator', description: 'Holds 500x its weight in water for plump overnight recovery.' }
    ],
    inciIngredients: 'Aqua, Glycerin, Propanediol, Palmitoyl Tripeptide-1, Copper Tripeptide-1, Bakuchiol, Tremella Fuciformis Extract, Niacinamide, Carbomer, Phenoxyethanol, Ethylhexylglycerin.',
    sizes: [
      { size: '60 ml Frosted Pot', price: 2450 }
    ],
    images: [
      CLOUD_BARRIER_IMAGE,
      MORNING_RITUAL_IMAGE
    ],
    texture: 'Cooling translucent jelly balm that envelops face in an invisible breathable pillow cocoon.',
    usageSteps: [
      'Smooth a generous layer over cleansed skin as final evening step.',
      'Allow 5 minutes to absorb before sleeping.',
      'Rinse with warm water in the morning to reveal cushion-plump skin.'
    ],
    inStock: true
  },
  {
    id: 'auren-08',
    slug: 'amber-cashmere-body-oil',
    name: 'Amber & Cashmere Satin Body Oil',
    subtitle: 'Dry Luxury Body Elixir with Macadamia & Vanilla',
    category: 'Body',
    audience: ['Unisex', 'Women', 'Men'],
    type: 'Body Oil',
    price: 1950,
    rating: 4.8,
    reviewCount: 167,
    badge: 'Bestseller',
    benefit: 'Non-greasy satin sheen, deep dermal nourishment, and intoxicating warm skin scent',
    description: 'Golden macadamia, sweet almond, and camellia seed oils whipped into a fast-absorbing dry oil. Scented with warm Tahitian vanilla pod, cashmere cedar, and golden amber resin.',
    concerns: ['Body Dryness', 'Rough Texture', 'Sensory Ritual'],
    skinTypes: ['Dry', 'Normal', 'Sensitive'],
    keyIngredients: [
      { name: 'Cold-Pressed Macadamia Oil', role: 'Lipid Replenisher', description: 'High in palmitoleic acid to replenish mature and dry skin.' },
      { name: 'Organic Sweet Almond Oil', role: 'Softening Base', description: 'Smoothes elbow, knee, and shoulder texture.' },
      { name: 'Vitamin E Acetate', role: 'Antioxidant Shield', description: 'Guards against oxidative environmental stress.' }
    ],
    inciIngredients: 'Macadamia Integrifolia Seed Oil, Prunus Amygdalus Dulcis Oil, Camellia Oleifera Seed Oil, Parfum, Tocopherol, Helianthus Annuus Seed Oil, Linalool, Coumarin.',
    sizes: [
      { size: '100 ml Heavy Flacon', price: 1950 }
    ],
    images: [
      HERO_IMAGE,
      NOIR_FRAGRANCE_IMAGE
    ],
    texture: 'Featherlight dry satin oil with zero greasy residue on clothing.',
    usageSteps: [
      'Mist onto warm damp skin immediately following bath or shower.',
      'Gently smooth over limbs in circular sweeps towards the heart.'
    ],
    inStock: true
  }
];

export const INGREDIENT_STORIES = [
  {
    id: 'ceramides',
    name: 'BIOMIMETIC CERAMIDE TRI-COMPLEX',
    role: 'Barrier Matrix Reconstruction',
    description: 'Identical to human skin lipids (Ceramides EOP, NP, AP). Fills micro-fissures in intercellular cement to halt transepidermal moisture loss.',
    benefit: 'Restores resilience, reduces redness, locks hydration for 72 hours.',
    featuredProduct: 'Cloud Barrier Cream'
  },
  {
    id: 'squalane',
    name: '100% SUGARCANE SQUALANE',
    role: 'Biocompatible Lipid Seal',
    description: 'Sustainable, non-comedogenic emollient with exceptional molecular compatibility. Melts instantly without suffocating pores.',
    benefit: 'Supple elasticity, weightless silk slip, environmental protection.',
    featuredProduct: 'Cloud Barrier Cream'
  },
  {
    id: 'orris',
    name: 'FLORENTINE ORRIS BUTTER',
    role: 'Haute Parfumerie Core',
    description: 'Aged for three full years in dark cellars before distillation. Exudes an opulent, velvety suede and powdery violet warmth.',
    benefit: 'Intimate longevity, noble sillage, timeless gender-inclusive elegance.',
    featuredProduct: 'Noir 03 Eau de Parfum'
  },
  {
    id: 'copper-peptides',
    name: 'COPPER TRIPEPTIDE-1',
    role: 'Cellular Chronobiology',
    description: 'Vital micro-nutrient peptide that signals skin fibroblasts to regenerate collagen and elastomeric support structures overnight.',
    benefit: 'Visibly firmer dermal density, smoothed fatigue lines, youthful bounce.',
    featuredProduct: 'Peptide Recovery Sleep Mask'
  }
];
