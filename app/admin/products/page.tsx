"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  isSale?: boolean;
  image: string;
  description: string;
  category: string;
  stock: number;
};

const categories = ["Men", "Women", "Girls", "Sale"];

export default function AdminProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const editId = searchParams.get("id");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [stock, setStock] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // SALE DISCOUNT
  // =========================

  const discountPercentage =
    category === "Sale" &&
    Number(price) > 0 &&
    Number(salePrice) > 0 &&
    Number(salePrice) < Number(price)
      ? Math.round(
          ((Number(price) - Number(salePrice)) /
            Number(price)) *
            100
        )
      : 0;

  // =========================
  // LOAD PRODUCT FOR EDIT
  // =========================

  useEffect(() => {
    if (!editId) {
      return;
    }

    const loadProduct = async () => {
      try {
        setLoadingEdit(true);
        setError("");
        setMessage("");

        const res = await fetch(
          `/api/products/${editId}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(
            data.message || "Failed to load product."
          );
          return;
        }

        const product = data.product;

        if (!product) {
          setError("Product not found.");
          return;
        }

        setEditingId(product._id);

        setName(product.name || "");
        setPrice(String(product.price ?? ""));

        setSalePrice(
          product.salePrice
            ? String(product.salePrice)
            : ""
        );

        setImage(product.image || "");
        setImagePreview(product.image || "");

        setSelectedFile(null);

        setDescription(product.description || "");
        setCategory(product.category || "Men");
        setStock(String(product.stock ?? ""));

        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 100);
      } catch (error) {
        console.error(
          "LOAD PRODUCT ERROR:",
          error
        );

        setError("Failed to load product.");
      } finally {
        setLoadingEdit(false);
      }
    };

    loadProduct();
  }, [editId]);

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setName("");
    setPrice("");
    setSalePrice("");
    setImage("");
    setImagePreview("");
    setSelectedFile(null);
    setDescription("");
    setCategory("Men");
    setStock("");
    setEditingId(null);

    setMessage("");
    setError("");

    router.push("/admin/products");
  };

  // =========================
  // IMAGE SELECT
  // =========================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB.");
      return;
    }

    setError("");
    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =========================
  // SUBMIT PRODUCT
  // =========================

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");
  
    try {
      let imageUrl = image;

      // =========================
      // UPLOAD NEW IMAGE
      // =========================

      if (selectedFile) {
        const formData = new FormData();

        formData.append("file", selectedFile);

        const uploadRes = await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          setError(
            uploadData.message ||
              "Image upload failed."
          );

          setLoading(false);
          return;
        }

        imageUrl = uploadData.url;
      }

      // =========================
      // IMAGE REQUIRED
      // =========================

      if (!imageUrl) {
        setError(
          "Please select a product image."
        );

        setLoading(false);
        return;
      }

      // =========================
      // SALE VALIDATION
      // =========================

      if (category === "Sale") {
        if (!price || Number(price) <= 0) {
          setError(
            "Please enter the original price."
          );

          setLoading(false);
          return;
        }

        if (
          !salePrice ||
          Number(salePrice) <= 0
        ) {
          setError(
            "Please enter the sale price."
          );

          setLoading(false);
          return;
        }

        if (
          Number(salePrice) >= Number(price)
        ) {
          setError(
            "Sale price must be lower than the original price."
          );

          setLoading(false);
          return;
        }
      }

      // =========================
      // PRODUCT DATA
      // =========================

      const productData = {
        name: name.trim(),

        price: Number(price),

        salePrice:
          category === "Sale"
            ? Number(salePrice)
            : null,

        isSale: category === "Sale",

        image: imageUrl,

        description: description.trim(),

        category,

        stock: Number(stock),
      };

      let res;

      // =========================
      // UPDATE PRODUCT
      // =========================

      if (editingId) {
        res = await fetch(
          `/api/products/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          }
        );
      }

      // =========================
      // ADD PRODUCT
      // =========================

      else {
        res = await fetch(
          "/api/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          }
        );
      }

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message ||
            "Something went wrong."
        );

        setLoading(false);
        return;
      }

      // =========================
      // SUCCESS
      // =========================

      if (editingId) {
        setMessage(
          "Product updated successfully."
        );

        setTimeout(() => {
          router.push("/admin/all-products");
        }, 800);
      } else {
        setMessage(
          "Product added successfully."
        );

        resetForm();
      }
    } catch (error) {
      console.error(
        "PRODUCT SAVE ERROR:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOADING EDIT PRODUCT
  // =========================

  if (loadingEdit) {
    return (
      <main className="min-h-screen bg-[#050505] px-5 py-10 text-[#F5F5F5] md:px-8">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">

            <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#333333] border-t-[#C6A15B]" />

            <p className="text-sm text-[#777777]">
              Loading product...
            </p>

          </div>
        </div>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-10 text-[#F5F5F5] md:px-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 border-b border-[#252525] pb-8">

          <p className="text-xs font-semibold uppercase tracking-[4px] text-[#C6A15B]">
            BUY NEXT ADMIN
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Product Management
          </h1>

          <p className="mt-3 text-sm text-[#777777]">
            {editingId
              ? "Update your product information."
              : "Add a new product to your store."}
          </p>

        </div>

        {/* SUCCESS MESSAGE */}

        {message && (
          <div className="mb-6 border border-[#5b4a25] bg-[#161208] px-5 py-4 text-sm text-[#C6A15B]">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}

        {error && (
          <div className="mb-6 border border-red-900 bg-red-950/30 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* PRODUCT FORM */}

        <section className="border border-[#252525] bg-[#111111]">

          {/* FORM HEADER */}

          <div className="border-b border-[#252525] px-6 py-5">

            <h2 className="text-lg font-semibold">
              {editingId
                ? "Edit Product"
                : "Add New Product"}
            </h2>

            <p className="mt-1 text-xs text-[#777777]">
              {editingId
                ? "Change the information you want to update."
                : "Enter your product information below."}
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 p-6 md:grid-cols-2"
          >

            {/* PRODUCT NAME */}

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                placeholder="Enter product name"
                className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none placeholder:text-[#444444] focus:border-[#C6A15B]"
              />

            </div>

            {/* PRICE */}

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                {category === "Sale"
                  ? "Original Price"
                  : "Price"}
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                required
                min="0"
                placeholder="Enter price"
                className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none placeholder:text-[#444444] focus:border-[#C6A15B]"
              />

            </div>

            {/* SALE PRICE */}

            {category === "Sale" && (
              <div>

                <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                  Sale Price
                </label>

                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) =>
                    setSalePrice(e.target.value)
                  }
                  required
                  min="0"
                  placeholder="Enter sale price"
                  className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none placeholder:text-[#444444] focus:border-[#C6A15B]"
                />

                {discountPercentage > 0 && (
                  <div className="mt-3 inline-block bg-[#C6A15B] px-3 py-2 text-xs font-bold uppercase tracking-[1px] text-black">
                    {discountPercentage}% OFF
                  </div>
                )}

              </div>
            )}

            {/* PRODUCT IMAGE */}

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                Product Image
              </label>

              <input
                id="product-image"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                required={!editingId}
                className="w-full cursor-pointer border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-[#A1A1A1] file:mr-4 file:border-0 file:bg-[#C6A15B] file:px-4 file:py-2 file:text-xs file:font-bold file:text-black"
              />

              {editingId && (
                <p className="mt-2 text-xs text-[#666666]">
                  Leave empty to keep the current image.
                </p>
              )}

              {/* IMAGE PREVIEW */}

              {imagePreview && (
                <div className="mt-4 overflow-hidden border border-[#252525] bg-[#050505]">

                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="h-64 w-full object-cover"
                  />

                </div>
              )}

              {selectedFile && (
                <p className="mt-2 text-xs text-[#777777]">
                  Selected: {selectedFile.name}
                </p>
              )}

            </div>

            {/* CATEGORY */}

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);

                  if (e.target.value !== "Sale") {
                    setSalePrice("");
                  }
                }}
                className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#C6A15B]"
              >

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#111111]"
                  >
                    {item}
                  </option>
                ))}

              </select>

              {category === "Sale" && (
                <p className="mt-2 text-xs text-[#C6A15B]">
                  Enter the original price and discounted sale price.
                </p>
              )}

            </div>

            {/* STOCK */}

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                Stock
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value)
                }
                required
                min="0"
                placeholder="Enter stock quantity"
                className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none placeholder:text-[#444444] focus:border-[#C6A15B]"
              />

            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
                rows={6}
                placeholder="Enter product description"
                className="w-full resize-none border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none placeholder:text-[#444444] focus:border-[#C6A15B]"
              />

            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-3 md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="bg-[#C6A15B] px-7 py-3 text-xs font-bold uppercase tracking-[2px] text-black transition hover:bg-[#D4B875] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-[#333333] px-7 py-3 text-xs font-semibold uppercase tracking-[2px] text-[#A1A1A1] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>

      </div>

    </main>
  );
}