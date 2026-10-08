import { Ritual } from '../types';
import { PRODUCTS, MORNING_RITUAL_IMAGE, HERO_IMAGE, NOIR_FRAGRANCE_IMAGE, CLOUD_BARRIER_IMAGE } from './products';

export const RITUALS: Ritual[] = [
  {
    id: 'ritual-morning-reset',
    slug: 'morning-reset',
    name: 'Morning Reset',
    tagline: 'Awaken the senses. Rebuild the barrier.',
    mood: 'Luminous · Serene · Protected',
    timeOfDay: 'Morning',
    description: 'An architectural four-step sequence designed to lift overnight fatigue, deliver deep bio-identical moisture, and shield against environmental stress.',
    image: MORNING_RITUAL_IMAGE,
    accentColor: '#9DA895',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Purify & Awaken',
        instruction: 'Massage Botanical Cleansing Elixir over dry skin to dissolve overnight oxidation, then splash with tepid water for an ethereal milk rinse.',
        productId: 'auren-04'
      },
      {
        stepNumber: 2,
        stepName: 'Seal Lipid Barrier',
        instruction: 'Press Cloud Barrier Cream over face and neck to anchor moisture and reinforce stratum corneum defenses.',
        productId: 'auren-01'
      },
      {
        stepNumber: 3,
        stepName: 'Soft Focus Glow',
        instruction: 'Smooth 3 drops of Soft Focus Skin Tint for natural candlelit complexion harmony without coverage weight.',
        productId: 'auren-03'
      },
      {
        stepNumber: 4,
        stepName: 'Olfactory Signature',
        instruction: 'A light mist of Solaris Eau Fraîche on pulse points to awaken focus and morning clarity.',
        productId: 'auren-06'
      }
    ],
    products: [
      PRODUCTS[3], // Botanical Cleansing Elixir
      PRODUCTS[0], // Cloud Barrier Cream
      PRODUCTS[2], // Soft Focus Skin Tint
      PRODUCTS[5]  // Solaris Eau Fraîche
    ]
  },
  {
    id: 'ritual-after-hours',
    slug: 'after-hours',
    name: 'After Hours',
    tagline: 'Scent, sanctuary, and cellular repair.',
    mood: 'Intimate · Resinous · Restorative',
    timeOfDay: 'Evening',
    description: 'When the external noise quiets, this ritual turns evening skincare into slow personal contemplation. Rich botanical oils and overnight chronobiology prepare mind and skin for restorative sleep.',
    image: NOIR_FRAGRANCE_IMAGE,
    accentColor: '#543544',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Nourish & Scent Limbs',
        instruction: 'Smooth Amber & Cashmere Body Oil across damp shoulders and decollete after warm evening bath.',
        productId: 'auren-08'
      },
      {
        stepNumber: 2,
        stepName: 'Circadian Repair',
        instruction: 'Layer Peptide Recovery Sleep Mask as the final dermal shield to stimulate nocturnal collagen rebuild.',
        productId: 'auren-07'
      },
      {
        stepNumber: 3,
        stepName: 'Atmospheric Sillage',
        instruction: 'A deliberate spray of Noir 03 on pillowcase or collarbone to invite quiet meditative sleep.',
        productId: 'auren-02'
      }
    ],
    products: [
      PRODUCTS[7], // Body oil
      PRODUCTS[6], // Peptide mask
      PRODUCTS[1]  // Noir 03
    ]
  },
  {
    id: 'ritual-clean-lines',
    slug: 'clean-lines',
    name: 'Clean Lines',
    tagline: 'Modern grooming without friction.',
    mood: 'Architectural · Crisp · Grounded',
    timeOfDay: 'Morning',
    description: 'Tailored for precision grooming, beard maintenance, and frictionless shaving. Calms irritated epidermal follicles while leaving a refined matte finish.',
    image: HERO_IMAGE,
    accentColor: '#181818',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Cleanse & Soften Bristles',
        instruction: 'Warm Botanical Cleansing Elixir onto beard and facial contours to loosen grit and soften coarse hairs.',
        productId: 'auren-04'
      },
      {
        stepNumber: 2,
        stepName: 'Zero-Friction Glide',
        instruction: 'Apply Cypress & Vetiver Shave Serum before blade stroke to eliminate razor burn and soothe micro-irritations.',
        productId: 'auren-05'
      },
      {
        stepNumber: 3,
        stepName: 'Essential Moisture Shield',
        instruction: 'Finish with a dime of Cloud Barrier Cream to lock in hydration and prevent dry flaky skin under stubble.',
        productId: 'auren-01'
      }
    ],
    products: [
      PRODUCTS[3], // Cleanser
      PRODUCTS[4], // Shave serum
      PRODUCTS[0]  // Cloud Barrier
    ]
  },
  {
    id: 'ritual-weekend-skin',
    slug: 'weekend-skin',
    name: 'Weekend Skin',
    tagline: 'Unrushed replenishment and textural renewal.',
    mood: 'Replenishing · Mindful · Luminous',
    timeOfDay: 'Weekend',
    description: 'A slow Sabbath for over-treated skin. Replenishes depleted lipid reserves and restores natural radiance with zero pressure.',
    image: CLOUD_BARRIER_IMAGE,
    accentColor: '#B9684F',
    steps: [
      {
        stepNumber: 1,
        stepName: 'Mindful Double Cleanse',
        instruction: 'Breathe deeply while massaging Botanical Cleansing Elixir into face for three meditative minutes.',
        productId: 'auren-04'
      },
      {
        stepNumber: 2,
        stepName: 'Deep Recovery Cocoon',
        instruction: 'Generously apply Peptide Recovery Mask, relaxing with warm eye compresses.',
        productId: 'auren-07'
      },
      {
        stepNumber: 3,
        stepName: 'Full-Body Glow',
        instruction: 'Complete the self-care session by massaging Amber & Cashmere Body Oil from feet upwards.',
        productId: 'auren-08'
      }
    ],
    products: [
      PRODUCTS[3],
      PRODUCTS[6],
      PRODUCTS[7]
    ]
  }
];
