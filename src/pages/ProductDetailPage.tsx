import React, { useState } from 'react';
import { Product, Shade, Review } from '../types';
import { Star, Heart, Check, ShieldCheck, Truck, ChevronDown, ChevronUp, Sparkles, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShadeSelector } from '../components/product/ShadeSelector';
import { FragrancePyramid } from '../components/product/FragrancePyramid';
import { RoutineBuilder } from '../components/product/RoutineBuilder';
import { LuxuryImage } from '../components/ui/LuxuryImage';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onSelectProduct
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]?.size || 'Standard');
  const [selectedShade, setSelectedShade] = useState<Shade | undefined>(
    product.shades ? product.shades[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('benefits');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Reviews Mock State
  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: 'rev-1',
      author: 'Ananya M.',
      rating: 5,
      date: 'October 2026',
      title: 'Remarkable barrier recovery within 48 hours',
      comment: 'My skin was completely compromised from tretinoin and dry weather. This calmed the redness almost immediately. Velvety, non-greasy, and leaves a gorgeous satin finish.',
      verified: true,
      skinType: 'Dry & Sensitive'
    },
    {
      id: 'rev-2',
      author: 'Vikram S.',
      rating: 5,
      date: 'September 2026',
      title: 'Understated luxury that actually delivers',
      comment: 'The scent profile and texture are on par with Le Labo and Dior Privée, but formulated with zero skin aggression. Will be repurchasing the grand flacon.',
      verified: true,
      skinType: 'Normal / Combination'
    }
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const activePriceObj = product.sizes.find(s => s.size === selectedSize);
  const currentPrice = activePriceObj ? activePriceObj.price : product.price;
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedShade, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      setReviewsList([
        {
          id: `rev-${Date.now()}`,
          author: newReviewAuthor,
          rating: 5,
          date: 'Just now',
          title: 'Exceptional Formulation',
          comment: newReviewComment,
          verified: true
        },
        ...reviewsList
      ]);
      setNewReviewAuthor('');
      setNewReviewComment('');
      setShowReviewForm(false);
    }
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="bg-[#F4F1E8] min-h-screen py-8 sm:py-12 text-[#2D3A1F]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-[#2D3A1F]/60 border-b border-[#D8D7CC] pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 hover:text-[#2D3A1F] uppercase tracking-wider font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Collection</span>
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <span>AUREN</span>
            <span aria-hidden="true">/</span>
            <span>{product.category}</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#2D3A1F] font-medium">{product.name}</span>
          </div>
        </div>

        {/* Primary Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: High-Res Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="aspect-square bg-[#E8E2D0]/60 border border-[#D8D7CC] overflow-hidden relative shadow-xs">
              <LuxuryImage
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fallbackText={product.type}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#2D3A1F] text-[#F4F1E8] text-[10px] tracking-widest uppercase px-3 py-1 font-medium">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 bg-white border shrink-0 overflow-hidden transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#181818] ring-1 ring-[#181818]'
                        : 'border-[#E5DFD5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <LuxuryImage
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#181818]/60 uppercase tracking-widest">
                <span>{product.category} · {product.type}</span>
                <div className="flex items-center gap-1 text-[#181818]">
                  <Star className="w-3.5 h-3.5 fill-[#CDAA7D] text-[#CDAA7D]" />
                  <span className="font-mono tabular-nums font-semibold">{product.rating}</span>
                  <span>({reviewsList.length} verified reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#181818] font-normal leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-[#543544] uppercase tracking-wider font-semibold">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-mono text-2xl font-bold tabular-nums text-[#181818]">
                  ₹{currentPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-[#181818]/40 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[11px] text-[#181818]/60 font-light">
                  (Inclusive of all luxury taxes)
                </span>
              </div>

              {/* Benefit statement */}
              <p className="text-xs sm:text-sm text-[#181818]/80 leading-relaxed font-light pt-1">
                {product.benefit}
              </p>
            </div>

            {/* Shades Selector */}
            {product.shades && product.shades.length > 0 && selectedShade && (
              <ShadeSelector
                shades={product.shades}
                selectedShade={selectedShade}
                onSelectShade={setSelectedShade}
              />
            )}

            {/* Size Selector */}
            {product.sizes.length > 1 && (
              <div className="space-y-2 pt-2 border-t border-[#E5DFD5]">
                <span className="text-xs uppercase tracking-widest text-[#181818]/60 font-medium block">
                  Select Size &amp; Format
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setSelectedSize(s.size)}
                      className={`p-3 text-xs font-medium border text-left transition-colors cursor-pointer ${
                        selectedSize === s.size
                          ? 'border-[#181818] bg-[#181818] text-white'
                          : 'border-[#D8D1C7] bg-white text-[#181818] hover:border-[#181818]'
                      }`}
                    >
                      <div className="font-semibold">{s.size}</div>
                      <div className="font-mono text-[11px] tabular-nums mt-0.5 opacity-80">
                        ₹{s.price.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart Module */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#D8D1C7] bg-white text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-3 text-[#181818] hover:bg-[#F2EDE4] transition-colors"
                  >
                    -
                  </button>
                  <span className="font-mono text-sm px-4 font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-3 text-[#181818] hover:bg-[#F2EDE4] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    addedSuccess
                      ? 'bg-[#B8A678] text-[#2D3A1F]'
                      : 'bg-[#2D3A1F] text-[#F4F1E8] hover:bg-[#1E2714]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · ₹{(currentPrice * quantity).toLocaleString()}</span>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Save to Wishlist"
                  className="p-3.5 border border-[#D8D7CC] bg-white hover:bg-[#E8E2D0] transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorited ? 'fill-[#B8A678] text-[#B8A678]' : 'text-[#2D3A1F]'
                    }`}
                  />
                </button>
              </div>

              {/* Delivery and Stock Trust */}
              <div className="pt-2 text-[11px] text-[#2D3A1F]/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#2D3A1F] font-medium">
                  <Truck className="w-3.5 h-3.5 text-[#B8A678]" />
                  <span>Complimentary Express Atelier Courier on orders above ₹1,499</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#2D3A1F]/65">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8A678]" />
                  <span>Two complimentary luxury discovery vials curated at checkout</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-[#D8D7CC] grid grid-cols-2 gap-2 text-xs text-[#2D3A1F]/75">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8A678]" />
                <span>Dermatologically Tested</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8A678]" />
                <span>100% Recyclable Glass</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8A678]" />
                <span>Certified Cruelty-Free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CDAA7D]" />
                <span>Biomimetic Lipid Base</span>
              </div>
            </div>
          </div>
        </div>

        {/* Olfactory Pyramid (If Fragrance) */}
        {product.fragranceNotes && (
          <div className="pt-8">
            <FragrancePyramid notes={product.fragranceNotes} />
          </div>
        )}

        {/* Product Formulation & Education Accordion */}
        <div className="bg-white p-6 sm:p-10 border border-[#E5DFD5] space-y-4">
          <h3 className="font-serif text-2xl text-[#181818] mb-6">
            Formulation &amp; Ritual Guidance
          </h3>

          {/* Section 1: Detailed Benefits */}
          <div className="border-b border-[#E5DFD5] pb-4">
            <button
              onClick={() => toggleAccordion('benefits')}
              className="w-full flex items-center justify-between text-left text-sm uppercase tracking-wider font-semibold text-[#181818] py-2 cursor-pointer"
            >
              <span>Clinical Benefits &amp; Cellular Action</span>
              {openAccordion === 'benefits' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'benefits' && (
              <div className="pt-3 text-xs sm:text-sm text-[#181818]/80 font-light leading-relaxed space-y-3">
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {product.keyIngredients.map((ing, idx) => (
                    <div key={idx} className="bg-[#FAF8F5] p-3 border border-[#E5DFD5]">
                      <div className="font-semibold text-xs text-[#181818]">{ing.name}</div>
                      <div className="text-[11px] text-[#543544] font-medium mt-0.5">{ing.role}</div>
                      <div className="text-[11px] text-[#181818]/70 mt-1">{ing.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: How to Use */}
          <div className="border-b border-[#E5DFD5] pb-4">
            <button
              onClick={() => toggleAccordion('usage')}
              className="w-full flex items-center justify-between text-left text-sm uppercase tracking-wider font-semibold text-[#181818] py-2 cursor-pointer"
            >
              <span>Lymphatic Application &amp; Ritual Order</span>
              {openAccordion === 'usage' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'usage' && (
              <div className="pt-3 space-y-2 text-xs sm:text-sm text-[#181818]/80 font-light">
                {product.usageSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="font-mono text-xs font-semibold text-[#CDAA7D] shrink-0 pt-0.5">
                      0{idx + 1}
                    </span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Full INCI Transparency */}
          <div className="border-b border-[#E5DFD5] pb-4">
            <button
              onClick={() => toggleAccordion('inci')}
              className="w-full flex items-center justify-between text-left text-sm uppercase tracking-wider font-semibold text-[#181818] py-2 cursor-pointer"
            >
              <span>Full Transparent INCI Ingredients</span>
              {openAccordion === 'inci' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'inci' && (
              <div className="pt-3 text-xs text-[#181818]/70 font-mono leading-relaxed bg-[#FAF8F5] p-4 border border-[#E5DFD5]">
                {product.inciIngredients}
              </div>
            )}
          </div>

          {/* Section 4: Texture & Sensory Profile */}
          <div>
            <button
              onClick={() => toggleAccordion('texture')}
              className="w-full flex items-center justify-between text-left text-sm uppercase tracking-wider font-semibold text-[#181818] py-2 cursor-pointer"
            >
              <span>Texture &amp; Sensorial Finish</span>
              {openAccordion === 'texture' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'texture' && (
              <div className="pt-3 text-xs sm:text-sm text-[#181818]/80 font-light leading-relaxed">
                {product.texture}
              </div>
            )}
          </div>
        </div>

        {/* Complete The Ritual Section */}
        <RoutineBuilder
          currentProduct={product}
          onSelectProduct={onSelectProduct}
        />

        {/* Customer Reviews & Experiences */}
        <div className="bg-white p-6 sm:p-10 border border-[#E5DFD5] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD5] pb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#CDAA7D] font-semibold block">
                Living Experiences
              </span>
              <h3 className="font-serif text-2xl text-[#181818]">
                Verified Customer Reviews ({reviewsList.length})
              </h3>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="border border-[#181818] text-[#181818] px-5 py-2.5 text-xs uppercase tracking-widest font-medium hover:bg-[#181818] hover:text-white transition-colors cursor-pointer"
            >
              {showReviewForm ? 'Cancel Form' : 'Write a Review'}
            </button>
          </div>

          {/* Review Submission Form */}
          {showReviewForm && (
            <form onSubmit={handleAddReview} className="bg-[#FAF8F5] p-6 border border-[#E5DFD5] space-y-4">
              <h4 className="font-serif text-lg text-[#181818]">Share Your Experience</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#181818]/60 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Maya S."
                    className="w-full bg-white border border-[#D8D1C7] p-2 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#181818]/60 mb-1">Your Review</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe the texture, skin benefits, or scent longevity..."
                  className="w-full bg-white border border-[#D8D1C7] p-2 text-xs"
                />
              </div>
              <button
                type="submit"
                className="bg-[#181818] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                Post Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="divide-y divide-[#E5DFD5]">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="py-6 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#181818]">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[10px] text-[#9DA895] font-medium flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Verified Atelier Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#181818]/40">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-[#CDAA7D]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>

                <h4 className="font-serif text-sm font-medium text-[#181818]">{rev.title}</h4>
                <p className="text-xs text-[#181818]/70 font-light leading-relaxed">{rev.comment}</p>
                {rev.skinType && (
                  <div className="text-[10px] text-[#181818]/50 uppercase tracking-wider">
                    Skin Type: {rev.skinType}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Sticky Purchase Bar (meets Section 1.I 15% mobile sticky cap) */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#F4F1E8]/95 backdrop-blur-md p-3 border-t border-[#D8D7CC] z-30 flex items-center justify-between gap-3 shadow-lg">
          <div className="overflow-hidden">
            <div className="font-serif text-xs font-medium text-[#2D3A1F] truncate">{product.name}</div>
            <div className="font-mono text-xs font-bold tabular-nums text-[#2D3A1F]">
              ₹{currentPrice.toLocaleString()}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 cursor-pointer ${
              addedSuccess ? 'bg-[#B8A678] text-[#2D3A1F]' : 'bg-[#2D3A1F] text-[#F4F1E8] hover:bg-[#1E2714]'
            }`}
          >
            {addedSuccess ? 'Added' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </div>
  );
};
