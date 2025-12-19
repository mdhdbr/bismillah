
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
  Loader2,
  MoreVertical,
  AlertCircle,
} from "lucide-react";
import { ProductDialog } from "@/components/product-dialog";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/page-header";
import type { Product, ProductStatus } from "@/lib/types";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// MOCK DATA - In a real app, this would come from a Firestore query
// where('sellerId', '==', currentUserId)
const mockProducts: Product[] = [];

// MOCK SELLER PROFILE CHECK
const hasSellerProfile = true; // Set to `false` to test the "Create Profile" state
const sellerId = "seller-abc-123"; // Mock current user's seller ID

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching products for the current seller
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'sellerId'>) => {
    const isUpdating = !!selectedProduct;
    
    if (isUpdating && selectedProduct) {
        // UPDATE logic
        setProducts(products.map(p => p.id === selectedProduct.id ? { ...selectedProduct, ...productData } : p));
        toast({ title: "Product Updated", description: `${productData.title} has been updated.` });
    } else {
        // CREATE logic
        const newProduct: Product = {
            id: `prod_${Date.now()}`,
            sellerId: sellerId,
            createdAt: new Date().toISOString(),
            ...productData,
        };
        setProducts([newProduct, ...products]);
        toast({ title: "Product Added", description: `${productData.title} has been added to your listings.` });
    }
    setDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    setProducts(products.filter(p => p.id !== id));
    toast({ title: "Product Deleted" });
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  const filteredProducts = products.filter((product) =>
    searchQuery
      ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const getStatusBadgeVariant = (status: ProductStatus) => {
    switch (status) {
      case 'PUBLISHED': return 'default';
      case 'SOLD_OUT': return 'destructive';
      case 'SUSPENDED': return 'secondary';
      case 'DRAFT': return 'outline';
      default: return 'secondary';
    }
  }

  if (!hasSellerProfile) {
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <Alert className="max-w-lg text-center">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Create Your Seller Profile</AlertTitle>
                <AlertDescription>
                    You need to create a seller profile before you can add products to the marketplace.
                </AlertDescription>
                <Button className="mt-4">Become a Seller</Button>
            </Alert>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Products"
        description="Manage your product listings for the marketplace."
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
                  placeholder="Search your products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading your products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No products yet</h3>
              <p className="text-muted-foreground mt-2">
                Click "Add Product" to create your first listing.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {product.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.price.toFixed(2)} SAR
                      </TableCell>
                      <TableCell>
                        <span className={product.quantity === 0 ? "text-red-600" : ""}>
                          {product.quantity}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(product.status)}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {!loading && products.length > 0 && (
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
        onSubmit={handleSaveProduct}
      />
    </div>
  );
}
