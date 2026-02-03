"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  ChevronRight,
  Heart,
  Share2,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMedicineData } from "@/constants/MedicineData";

type Props = {
  medicine: getMedicineData;
};

export default function MedicineDetailsPage({ medicine }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${medicine.name} to cart`);
    alert(`${quantity} ${medicine.name} added to cart!`);
  };

  const incrementQuantity = () => {
    if (quantity < medicine.stock) setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "low stock":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "out of stock":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-lg border">
              <Image
                src={medicine.image}
                alt={medicine.name}
                fill
                style={{ objectFit: "contain" }}
                className="p-6 hover:scale-105 transition-transform duration-300"
                priority
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md transition-all"
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                />
              </button>
              {medicine.stock === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-white px-6 py-3 rounded-full font-semibold text-lg">
                    Out of Stock
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer flex-shrink-0"
                >
                  <Image
                    src={medicine.image}
                    alt={`${medicine.name} ${item}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Medicine Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="mb-3">
                    {medicine.category?.name}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {medicine.name}
                  </h1>
                  <p className="text-gray-600">by {medicine.manufacturer}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(4.2 • 128 reviews)</span>
              </div>
            </div>

            <Separator />

            {/* Price & Stock */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${medicine.price}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Badge
                  className={`px-3 py-1 ${getStatusColor(medicine.status)}`}
                >
                  {medicine.status}
                </Badge>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>{medicine.stock} units available</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Authentic</p>
                  <p className="text-sm text-gray-500">100% Guaranteed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Expires</p>
                  <p className="text-sm text-gray-500">
                    {new Date(medicine.expiryDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Quantity & Actions */}
            <div className="space-y-6">
              <div>
                <p className="font-medium mb-3">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={medicine.stock}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.min(Number(e.target.value), medicine.stock),
                        )
                      }
                      className="w-16 text-center border-x py-3 bg-transparent focus:outline-none"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="p-3 hover:bg-gray-100 transition-colors"
                      disabled={quantity >= medicine.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Maximum {medicine.stock} per order
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={medicine.stock === 0}
                  className="flex-1 h-14 text-lg"
                  size="lg"
                >
                  {medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-14 text-lg"
                  size="lg"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-medium mb-2">Sold by</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{medicine.seller.name}</p>
                  <p className="text-sm text-gray-600">
                    {medicine.seller.email}
                  </p>
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  Trusted Seller
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {medicine.description}
                </p>
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Key Benefits</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Fast acting relief
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Doctor recommended
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Non-drowsy formula
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">
                      Storage Instructions
                    </h4>
                    <p className="text-gray-600">
                      Store in a cool, dry place away from direct sunlight. Keep
                      out of reach of children.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Product Information</h4>
                  <dl className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <dt className="text-gray-600">Manufacturer</dt>
                      <dd className="font-medium">{medicine.manufacturer}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <dt className="text-gray-600">Category</dt>
                      <dd className="font-medium">{medicine.category?.name}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <dt className="text-gray-600">Expiry Date</dt>
                      <dd className="font-medium">
                        {new Date(medicine.expiryDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <dt className="text-gray-600">Stock Available</dt>
                      <dd className="font-medium">{medicine.stock} units</dd>
                    </div>
                  </dl>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Seller Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Seller Name</p>
                      <p className="font-medium">{medicine.seller.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact Email</p>
                      <p className="font-medium">{medicine.seller.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600">4.8/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Be the first to review this product
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
