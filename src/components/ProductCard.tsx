import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import CallbackForm from "./CallbackForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Helmet } from "react-helmet-async";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getProcessedImageUrl = () => {
    if (imageError) {
      return "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80";
    }

    try {
      new URL(product.imageUrl);
      if (product.imageUrl.includes("?")) {
        return product.imageUrl;
      }
      return `${product.imageUrl}?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80`;
    } catch (e) {
      return "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80";
    }
  };

  const imageUrl = getProcessedImageUrl();
  const productName = product.name[language];
  const productDescription = product.description[language];

  return (
    <article>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: productName,
            image: imageUrl,
            description: productDescription,
            offers: {
              "@type": "Offer",
              priceCurrency: "UAH", // Adjust currency as needed
              price: product.price.toString(),
              availability: "https://schema.org/InStock", // Adjust based on actual availability
              url: `https://videosoundevents.com/categories/${product.category}`, // Link to category page
            },
          })}
        </script>
      </Helmet>
      <Card className="overflow-hidden product-card-hover border border-gray-200 hover:border-secondary">
        <div className="aspect-[16/9] relative overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={`${productName} - Equipment Rental in Ukraine`}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2 h-14">{productName}</CardTitle>
          <CardDescription className="text-lg font-bold text-primary">
            {product.price} {t("price_per_day")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 h-18 text-sm">{productDescription}</p>
        </CardContent>
        <CardFooter className="pt-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">{t("request_callback")}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("callback_title")}</DialogTitle>
                <DialogDescription>
                  {productName} - {product.price} {t("price_per_day")}
                </DialogDescription>
              </DialogHeader>
              <CallbackForm
                productId={product.id}
                onSuccess={() => setIsDialogOpen(false)}
                productDetails={{
                  name: productName,
                  image: imageUrl,
                  price: product.price.toString(),
                }}
              />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </article>
  );
};

export default ProductCard;
