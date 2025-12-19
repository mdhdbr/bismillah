
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ShoppingCart,
  Filter,
  Loader2,
  MapPin,
} from "lucide-react";
import { ProductDialog } from "./product-dialog";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/page-header";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  location?: string;
  images?: string[];
  isActive: boolean;
  createdAt: { toDate: () => Date };
  updatedAt: { toDate: () => Date };
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const categories = [
    "all",
    "Electronics",
    "Computers & Accessories",
    "Smart Home",
    "Arts & Crafts",
    "Automotive",
    "Baby",
    "Beauty & Personal Care",
    "Fashion (Women)",
    "Fashion (Men)",
    "Fashion (Girls)",
    "Fashion (Boys)",
    "Deals",
    "Digital Music",
    "Health & Household",
    "Home & Kitchen",
    "Industrial & Scientific",
    "Luggage",
    "Movies & TV",
    "Music, CDs & Vinyl",
    "Pet Supplies",
    "Software",
    "Sports & Outdoors",
    "Tools & Home Improvement",
    "Toys & Games",
    "Video Games",
    "Books",
    "Gift Cards",
    "Groceries & Gourmet Food",
    "Other",
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/products", window.location.origin);
      if (selectedCategory !== "all") {
        url.searchParams.set("category", selectedCategory);
      }
      
      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to fetch products",
          description: data.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Could not connect to server",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveProduct = async (productData: any) => {
    const isUpdating = !!selectedProduct;
    const url = isUpdating ? `/api/products/${selectedProduct.id}` : "/api/products";
    const method = isUpdating ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: `Product ${isUpdating ? 'updated' : 'created'}`,
          description: data.message,
        });
        fetchProducts();
        setDialogOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: `Failed to ${isUpdating ? 'update' : 'create'} product`,
          description: data.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Network error",
        description: `Could not ${isUpdating ? 'update' : 'create'} product`,
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Product deleted",
          description: data.message,
        });
        fetchProducts();
      } else {
        toast({
          variant: "destructive",
          title: "Failed to delete product",
          description: data.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Could not delete product",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsCreating(false);
    setDialogOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedProduct(null);
    setIsCreating(true);
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) =>
    searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your product inventory and listings."
        action={
            <Button onClick={handleCreateNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
        }
       />

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No products found</h3>
              <p className="text-muted-foreground mt-2">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or filter"
                  : "Get started by adding your first product."}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {product.location ? (
                          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{product.location}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        SAR {product.price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            product.stock > 10
                              ? "text-green-600"
                              : product.stock === 0
                              ? "text-red-600"
                              : "text-amber-600"
                          }
                        >
                          {product.stock} units
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={product.isActive ? "default" : "secondary"}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {!loading && filteredProducts.length > 0 && (
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </CardFooter>
        )}
      </Card>

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={selectedProduct}
        isCreating={isCreating}
        onSubmit={handleSaveProduct}
      />
    </div>
  );
}
