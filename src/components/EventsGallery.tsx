
import React, { useState, useEffect, useRef } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Maximize2, Pause, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Define our event images with appropriate metadata
const eventImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=600&fit=crop&auto=format&q=80",
    title: {
      ua: "Технологічна конференція 2024",
      ru: "Технологическая конференция 2024",
      en: "Tech Conference 2024"
    },
    description: {
      ua: "Аудіо та відеообладнання для головної сцени",
      ru: "Аудио и видеооборудование для главной сцены",
      en: "Audio and video equipment for the main stage"
    }
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=1200&h=600&fit=crop&auto=format&q=80",
    title: {
      ua: "Фестиваль світла",
      ru: "Фестиваль света",
      en: "Light Festival"
    },
    description: {
      ua: "Освітлення та спецефекти для нічного шоу",
      ru: "Освещение и спецэффекты для ночного шоу",
      en: "Lighting and special effects for the night show"
    }
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&h=600&fit=crop&auto=format&q=80",
    title: {
      ua: "Літній музичний фестиваль",
      ru: "Летний музыкальный фестиваль",
      en: "Summer Music Festival"
    },
    description: {
      ua: "Повне звукове та світлове обладнання",
      ru: "Полное звуковое и световое оборудование",
      en: "Complete sound and lighting equipment"
    }
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop&auto=format&q=80",
    title: {
      ua: "Корпоративний захід на природі",
      ru: "Корпоративное мероприятие на природе",
      en: "Corporate Outdoor Event"
    },
    description: {
      ua: "Портативна звукова система для заходу на відкритому повітрі",
      ru: "Портативная звуковая система для мероприятия на открытом воздухе",
      en: "Portable sound system for the outdoor event"
    }
  }
];

const EventsGallery: React.FC = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const carouselApi = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  useEffect(() => {
    // Only set up auto-sliding when carouselApi is available
    if (isPlaying && carouselApi.current) {
      timerRef.current = setTimeout(() => {
        carouselApi.current.scrollNext();
      }, 7000); // 7 seconds per slide
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentSlide, isPlaying, carouselApi.current]);
  
  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle image click for fullscreen view
  const handleImageClick = (imageId: number) => {
    setSelectedImage(imageId);
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setSelectedImage(null);
  };

  // Find the selected image for fullscreen view
  const getSelectedImage = () => {
    if (selectedImage === null) return null;
    return eventImages.find(img => img.id === selectedImage);
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      <Carousel 
        className="w-full" 
        setApi={(api) => {
          carouselApi.current = api;
          if (api) {
            api.on('select', () => {
              const selectedIndex = api.selectedScrollSnap();
              setCurrentSlide(selectedIndex);
              // Reset timer when slide changes manually
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
              if (isPlaying) {
                timerRef.current = setTimeout(() => {
                  api.scrollNext();
                }, 7000);
              }
            });
          }
        }}
      >
        <CarouselContent>
          {eventImages.map((image, index) => (
            <CarouselItem key={image.id} className="relative">
              <Dialog open={selectedImage === image.id} onOpenChange={handleDialogClose}>
                <DialogTrigger asChild>
                  <div 
                    className="relative aspect-[2/1] overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => handleImageClick(image.id)}
                  >
                    <img 
                      src={image.url} 
                      alt={image.title[language]} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-xl font-bold">{image.title[language]}</h3>
                        <p className="text-sm text-gray-200">{image.description[language]}</p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Button size="icon" variant="ghost" className="bg-black/50 hover:bg-black/70 text-white">
                          <Maximize2 size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-black border-none">
                  <img 
                    src={image.url.replace('w=1200&h=600', 'w=1920&h=1080')} 
                    alt={image.title[language]} 
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                    <h3 className="text-xl font-bold text-white">{image.title[language]}</h3>
                    <p className="text-sm text-gray-200">{image.description[language]}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute z-10 bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {eventImages.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => {
                setCurrentSlide(index);
                if (carouselApi.current) {
                  carouselApi.current.scrollTo(index);
                }
              }}
            />
          ))}
        </div>
        <div className="absolute z-10 bottom-6 right-6 flex gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="bg-black/50 hover:bg-black/70 text-white"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
        </div>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none" />
      </Carousel>
    </div>
  );
};

export default EventsGallery;
