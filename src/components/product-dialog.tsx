
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product, ProductStatus, ProductCondition } from "@/lib/types";
import { UploadCloud } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSubmit: (productData: Omit<Product, 'id' | 'createdAt' | 'sellerId'>) => void;
}

const categories = [
    "Mobile Phones & Accessories",
    "Laptops & Computers",
    "Cameras & Drones",
    "Home Appliances",
    "Kitchen Appliances",
    "Furniture",
    "Home Decor",
    "Men's Fashion",
    "Women's Fashion",
    "Kid's Fashion",
    "Health & Beauty",
    "Sports & Outdoors",
    "Automotive Parts",
    "Tools & Home Improvement",
    "Books & Stationery",
    "Groceries",
    "Pet Supplies",
    "Toys & Games",
    "Other"
];

const productStatuses: ProductStatus[] = ["DRAFT", "PUBLISHED", "SOLD_OUT", "SUSPENDED"];
const productConditions: ProductCondition[] = ["NEW", "USED_LIKE_NEW", "USED_GOOD", "USED_FAIR"];

const initialFormData = {
    title: "",
    description: "",
    category: "Other",
    condition: "NEW" as ProductCondition,
    price: "",
    quantity: "1",
    images: [],
    locationCity: "Riyadh",
    contactPhone: "",
    contactWhatsapp: "",
    status: "DRAFT" as ProductStatus,
}

export function ProductDialog({
  open,
  onOpenChange,
  product,
  onSubmit,
}: ProductDialogProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isUpdating = !!product;

  useEffect(() => {
    if (open) {
        if (product) {
            setFormData({
                title: product.title,
                description: product.description || "",
                category: product.category,
                condition: product.condition,
                price: product.price.toString(),
                quantity: product.quantity.toString(),
                images: product.images || [],
                locationCity: product.location.city,
                contactPhone: product.contact.phone,
                contactWhatsapp: product.contact.whatsapp || "",
                status: product.status,
            });
        } else {
            setFormData(initialFormData);
        }
        setErrors({});
    }
  }, [product, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Price must be a positive number";
    if (!formData.quantity || parseInt(formData.quantity) < 0) newErrors.quantity = "Quantity cannot be negative";
    if (!formData.contactPhone.trim()) newErrors.contactPhone = "A contact phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        images: formData.images,
        location: { city: formData.locationCity },
        contact: { phone: formData.contactPhone, whatsapp: formData.contactWhatsapp },
        status: formData.status,
    });
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const title = isUpdating ? `Edit: ${product?.title}` : "Add New Product";
  const description = isUpdating ? "Update your product details." : "Create a new listing for the marketplace.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            
            {/* Title */}
            <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input id="title" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} placeholder="e.g., Michelin Bus Tyre 295/80 R22.5" className={errors.title ? "border-destructive" : ""} />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="Describe your product..." rows={3} />
            </div>

            {/* Category & Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select value={formData.condition} onValueChange={(value: ProductCondition) => handleInputChange("condition", value)}>
                  <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                  <SelectContent>
                    {productConditions.map((c) => (<SelectItem key={c} value={c}>{c.replace(/_/g, ' ')}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price & Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (SAR) *</Label>
                  <Input id="price" type="number" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} placeholder="e.g., 1250" className={errors.price ? "border-destructive" : ""} />
                  {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input id="quantity" type="number" value={formData.quantity} onChange={(e) => handleInputChange("quantity", e.target.value)} placeholder="e.g., 10" className={errors.quantity ? "border-destructive" : ""} />
                  {errors.quantity && <p className="text-sm text-destructive">{errors.quantity}</p>}
                </div>
            </div>
            
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Images (up to 4)</Label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80">
                      <span>Upload files</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Location & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="locationCity">Location (City)</Label>
                    <Input id="locationCity" value={formData.locationCity} onChange={(e) => handleInputChange("locationCity", e.target.value)} placeholder="e.g., Riyadh" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <Input id="contactPhone" value={formData.contactPhone} onChange={(e) => handleInputChange("contactPhone", e.target.value)} placeholder="+966..." className={errors.contactPhone ? "border-destructive" : ""}/>
                    {errors.contactPhone && <p className="text-sm text-destructive">{errors.contactPhone}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="contactWhatsapp">WhatsApp (Optional)</Label>
                    <Input id="contactWhatsapp" value={formData.contactWhatsapp} onChange={(e) => handleInputChange("contactWhatsapp", e.target.value)} placeholder="+966..."/>
                </div>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <Label>Listing Status</Label>
              <RadioGroup value={formData.status} onValueChange={(value: ProductStatus) => handleInputChange("status", value)} className="flex space-x-4">
                {productStatuses.map(s => (
                    <div className="flex items-center space-x-2" key={s}>
                        <RadioGroupItem value={s} id={`status-${s}`} />
                        <Label htmlFor={`status-${s}`} className="font-normal">{s}</Label>
                    </div>
                ))}
              </RadioGroup>
              <p className="text-xs text-muted-foreground">"DRAFT" listings are not visible to buyers.</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">
              {isUpdating ? "Save Changes" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
