
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';
import CallbackForm from './CallbackForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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

  // Parse the image URL to ensure it works correctly
  const getProcessedImageUrl = () => {
    // If there's an error, use a reliable placeholder
    if (imageError) {
      return "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80";
    }
    
    try {
      // Check if the URL is valid
      new URL(product.imageUrl);
      
      // If the URL already has query parameters, don't add more
      if (product.imageUrl.includes('?')) {
        return product.imageUrl;
      }
      
      // Otherwise add the necessary query parameters for image optimization
      return `${product.imageUrl}?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80`;
    } catch (e) {
      // If the URL is invalid, use a placeholder
      return "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80";
    }
  };

  return (
    <Card className="overflow-hidden product-card-hover border border-gray-200 hover:border-secondary">
      <div className="aspect-[16/9] relative overflow-hidden bg-muted">
        <img
          src={getProcessedImageUrl()}
          alt={product.name[language]}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          onError={handleImageError}
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2 h-14">{product.name[language]}</CardTitle>
        <CardDescription className="text-lg font-bold text-primary">
          {product.price} {t('price_per_day')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 h-18 text-sm">{product.description[language]}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">{t('request_callback')}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('callback_title')}</DialogTitle>
              <DialogDescription>
                {product.name[language]} - {product.price} {t('price_per_day')}
              </DialogDescription>
            </DialogHeader>
            <CallbackForm
              productId={product.id}
              onSuccess={() => setIsDialogOpen(false)}
              productDetails={{
                name: product.name[language],
                image: getProcessedImageUrl(),
                price: product.price.toString()
              }}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
