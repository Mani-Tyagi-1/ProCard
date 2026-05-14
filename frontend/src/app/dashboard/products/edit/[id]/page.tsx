"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, Save, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("active");
  
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const product = await res.json();
        
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price.toString());
        setStock(product.stock.toString());
        setStatus(product.isPublished ? "active" : "draft");
        setExistingImages(product.images || []);
      } catch (err: any) {
        console.error(err);
        setError("Could not load product. It may have been deleted.");
      } finally {
        setIsFetching(false);
      }
    };
    
    if (id) fetchProduct();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!title || !description || !price || !stock) {
        throw new Error("Please fill in all required fields.");
      }

      let newImageUrls: string[] = [];

      // 1. Upload new Images
      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("images", file);
        });

        const uploadRes = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.message || "Failed to upload images");
        }

        const uploadData = await uploadRes.json();
        newImageUrls = uploadData.imageUrls;
      }

      const finalImages = [...existingImages, ...newImageUrls];

      // 2. Update Product
      const productData = {
        title,
        description,
        price: Number(price),
        stock: Number(stock),
        status,
        images: finalImages,
      };

      const productRes = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!productRes.ok) {
        const errData = await productRes.json();
        throw new Error(errData.message || "Failed to update product");
      }

      // 3. Success, redirect back to products
      router.push("/dashboard/products");
      router.refresh();
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl pb-10">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/products"
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Product</h1>
          <p className="text-muted-foreground mt-1">
            Update your product listing details.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          {/* General Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">General Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Product Name *</label>
                <input
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Premium Wireless Headphones"
                  className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description *</label>
                <textarea
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe your product..."
                  className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Pricing & Inventory */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">Pricing & Inventory</h2>
            </div>
            <div className="p-6 grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">Price *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground">$</span>
                  </div>
                  <input
                    id="price"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="stock" className="text-sm font-medium">Stock *</label>
                <input
                  id="stock"
                  type="number"
                  required
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">Product Media</h2>
            </div>
            <div className="p-6">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border/50 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium mb-1">Click to upload images</p>
                <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>

              {/* Previews of Existing & New Images */}
              <AnimatePresence>
                {(existingImages.length > 0 || previewUrls.length > 0) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 grid grid-cols-2 gap-3"
                  >
                    {/* Existing Images */}
                    {existingImages.map((url, idx) => (
                      <div key={`existing-${idx}`} className="relative group rounded-lg overflow-hidden border border-border/50 bg-background aspect-square">
                        <img src={url} alt={`Existing Preview ${idx}`} className="object-cover w-full h-full" />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeExistingImage(idx); }}
                          className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

                    {/* New Images */}
                    {previewUrls.map((url, idx) => (
                      <div key={`new-${idx}`} className="relative group rounded-lg overflow-hidden border border-border/50 bg-background aspect-square">
                        <img src={url} alt={`New Preview ${idx}`} className="object-cover w-full h-full border-2 border-primary" />
                        <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-medium">New</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeNewFile(idx); }}
                          className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border/50">
              <h2 className="text-lg font-semibold text-foreground">Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">Product Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="md:col-span-3 flex justify-end gap-4 border-t border-border/50 pt-6"
        >
          <Link
            href="/dashboard/products"
            className="px-6 py-2 rounded-lg font-medium hover:bg-muted transition-colors text-foreground"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </motion.div>
      </form>
    </div>
  );
}
