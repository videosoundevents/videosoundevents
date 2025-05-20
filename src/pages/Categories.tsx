
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Categories: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId || categories[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Array<{id: string, name: string, category: string}>>([]);
  
  // Filter products by selected category
  const filteredProducts = products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    navigate(`/categories/${category}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.length >= 2) {
      const results = products.filter(product => 
        product.name[language].toLowerCase().includes(query)
      ).map(product => ({
        id: product.id,
        name: product.name[language],
        category: product.category
      }));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleProductClick = (category: string, productId: string) => {
    setSelectedCategory(category);
    navigate(`/categories/${category}`);
    // Add small delay to ensure the category is loaded before scrolling
    setTimeout(() => {
      const productElement = document.getElementById(`product-${productId}`);
      if (productElement) {
        productElement.scrollIntoView({ behavior: 'smooth' });
        productElement.classList.add('bg-secondary/50');
        setTimeout(() => {
          productElement.classList.remove('bg-secondary/50');
        }, 2000);
      }
    }, 100);
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">{t('categories')}</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder={t('search_products')}
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-2"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="absolute z-20 mt-1 w-full bg-card border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              <h3 className="text-sm font-medium mb-2">{t('search_results')}</h3>
              <ul className="space-y-1">
                {searchResults.map(result => (
                  <li 
                    key={result.id}
                    className="px-2 py-1.5 hover:bg-secondary rounded-md cursor-pointer text-sm"
                    onClick={() => handleProductClick(result.category, result.id)}
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Tabs 
          value={selectedCategory} 
          onValueChange={handleCategoryChange}
          orientation="vertical"
          className="w-full"
        >
          <div className="md:flex">
            <div className="md:sticky md:top-20 md:self-start">
              <TabsList className="flex flex-col h-auto w-full md:w-48 space-y-1 p-1 bg-muted/80 backdrop-blur-sm">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="justify-start w-full py-2.5 px-3 text-left text-sm"
                  >
                    {t(category)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="flex-1 md:pl-8 mt-6 md:mt-0">
              {categories.map((category) => (
                <TabsContent key={category} value={category} className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map(product => (
                        <div id={`product-${product.id}`} key={product.id} className="transition-all duration-300">
                          <ProductCard product={product} />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-lg text-muted-foreground">No products found in this category.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Categories;
