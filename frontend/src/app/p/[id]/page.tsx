"use client";

import { useEffect, useState } from "react";
import { Loader2, Package, Check, Share2, ShoppingCart, X, MapPin, Phone, User, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  isPublished: boolean;
  images: string[];
}

export default function PublicProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Checkout States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [buyerDetails, setBuyerDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
    pincode: ""
  });
  const [otp, setOtp] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Product not found");
        throw new Error("Failed to load product");
      }
      const data = await res.json();
      
      if (!data.isPublished) {
         throw new Error("This product is no longer available.");
      }
      
      setProduct(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerDetails.fullName || !buyerDetails.phone || !buyerDetails.address || !buyerDetails.pincode) {
      setOrderError("Please fill all details");
      return;
    }
    setOrderError("");
    setCheckoutStep(2);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setOrderError("Please enter valid OTP");
      return;
    }
    setOrderError("");
    setCheckoutStep(3);
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    setOrderError("");
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          buyerDetails
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to place order");
      }

      setCheckoutStep(4); // Success
      fetchProduct(); // Refresh stock
    } catch (err: any) {
      setOrderError(err.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-8 bg-card border border-border/50 rounded-2xl shadow-sm text-center"
        >
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Unavailable</h2>
          <p className="text-muted-foreground">{error || "This product could not be found."}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border/50 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Image Section */}
          <div className="md:w-1/2 p-6 md:p-8 bg-muted/30 flex flex-col">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-background border border-border/50 shadow-sm mb-4">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[activeImage]} 
                  alt={product.title} 
                  className="object-cover w-full h-full transition-all duration-300" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-16 w-16 text-muted-foreground/50" />
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${activeImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-border'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="mb-8">
              <div className="flex justify-between items-start gap-4 mb-4">
                <h1 className="text-3xl font-bold text-foreground leading-tight">{product.title}</h1>
                <button 
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors shrink-0"
                  aria-label="Share"
                >
                  {isCopied ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
                </button>
              </div>
              
              <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
                {product.stock > 0 ? (
                  <span className="text-sm font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full mb-1">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-full mb-1">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h3 className="text-sm font-semibold mb-2 uppercase tracking-wider text-muted-foreground">About this product</h3>
                <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
                  {product.description || "No description provided by the seller."}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <button 
                disabled={product.stock === 0}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none"
                onClick={() => {
                  setCheckoutStep(1);
                  setIsCheckoutOpen(true);
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock > 0 ? "Buy Now" : "Out of Stock"}
              </button>
              
              <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                Secure checkout powered by <span className="font-semibold text-foreground">ProCard</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-card rounded-3xl shadow-2xl overflow-hidden border border-border/50 flex flex-col max-h-[90vh] relative"
            >
              {/* Close Button (Hidden on Success) */}
              {checkoutStep !== 4 && (
                <button 
                  onClick={() => setIsCheckoutOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-muted/50 text-foreground rounded-full hover:bg-muted transition-colors z-10"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <div className="p-6 md:p-8 overflow-y-auto">
                {/* Step 1: Contact Details */}
                {checkoutStep === 1 && (
                  <form onSubmit={handleProceedToOtp} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Delivery Details</h2>
                      <p className="text-sm text-muted-foreground">Where should we send your order?</p>
                    </div>

                    {orderError && <p className="text-sm text-destructive">{orderError}</p>}

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input 
                            required
                            type="text"
                            value={buyerDetails.fullName}
                            onChange={(e) => setBuyerDetails({...buyerDetails, fullName: e.target.value})}
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Mobile Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input 
                            required
                            type="tel"
                            value={buyerDetails.phone}
                            onChange={(e) => setBuyerDetails({...buyerDetails, phone: e.target.value})}
                            placeholder="1234567890"
                            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Delivery Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <textarea 
                            required
                            rows={3}
                            value={buyerDetails.address}
                            onChange={(e) => setBuyerDetails({...buyerDetails, address: e.target.value})}
                            placeholder="123 Main St, Apt 4B"
                            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Pincode / ZIP</label>
                        <input 
                          required
                          type="text"
                          value={buyerDetails.pincode}
                          onChange={(e) => setBuyerDetails({...buyerDetails, pincode: e.target.value})}
                          placeholder="10001"
                          className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
                    >
                      Continue
                    </button>
                  </form>
                )}

                {/* Step 2: OTP Verification */}
                {checkoutStep === 2 && (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Verify Number</h2>
                      <p className="text-sm text-muted-foreground">We sent a mock OTP to {buyerDetails.phone}</p>
                    </div>

                    {orderError && <p className="text-sm text-destructive">{orderError}</p>}

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-center block">Enter OTP</label>
                      <input 
                        required
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="1234"
                        className="w-full text-center text-2xl tracking-widest px-4 py-3 bg-background border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      />
                      <p className="text-xs text-muted-foreground text-center mt-2">(Enter any 4-6 digits for testing)</p>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setCheckoutStep(1)}
                        className="px-6 py-3 border border-border/50 rounded-xl font-medium hover:bg-muted transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        Verify
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 3: Payment / Order Creation */}
                {checkoutStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Checkout</h2>
                      <p className="text-sm text-muted-foreground">Complete your purchase</p>
                    </div>

                    {orderError && <p className="text-sm text-destructive p-3 bg-destructive/10 rounded-lg">{orderError}</p>}

                    <div className="bg-muted/30 p-4 rounded-xl border border-border/50 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Item</span>
                        <span className="font-medium text-foreground">{product.title}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-medium text-foreground">${product.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="font-medium text-emerald-500">Free</span>
                      </div>
                      <div className="pt-3 border-t border-border/50 flex justify-between items-center">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-xl text-primary">${product.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        type="button"
                        disabled={isPlacingOrder}
                        onClick={() => setCheckoutStep(2)}
                        className="px-6 py-3 border border-border/50 rounded-xl font-medium hover:bg-muted transition-colors disabled:opacity-50"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70"
                      >
                        {isPlacingOrder && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isPlacingOrder ? "Processing..." : `Pay $${product.price.toFixed(2)}`}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Success */}
                {checkoutStep === 4 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <div className="h-20 w-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                    <p className="text-muted-foreground mb-8">
                      Thank you for your purchase, {buyerDetails.fullName.split(' ')[0]}. We'll prepare your order right away.
                    </p>
                    <button 
                      onClick={() => {
                        setIsCheckoutOpen(false);
                        setCheckoutStep(1);
                        setOtp("");
                        setBuyerDetails({fullName: "", phone: "", address: "", pincode: ""});
                      }}
                      className="w-full py-3 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
