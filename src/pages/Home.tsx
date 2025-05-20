
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Video, Headphones, Camera, Layers, Sparkles, Package, Phone, Calendar, Truck, CreditCard, FileCheck, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EventsGallery from '@/components/EventsGallery';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Category icons mapping
  const categoryIcons = {
    video_equipment: Video,
    audio_equipment: Headphones,
    lighting_equipment: Camera,
    stage_equipment: Layers,
    special_effects: Sparkles,
    miscellaneous: Package
  };
  
  // Top categories to display - using our new categories
  const topCategories = [
    'video_equipment',
    'audio_equipment',
    'lighting_equipment',
    'stage_equipment',
    'special_effects',
    'miscellaneous'
  ];

  // Leasing process steps - reordered as requested
  const leasingSteps = [
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: {
        ua: "Виберіть обладнання",
        ru: "Выберите оборудование",
        en: "Select equipment"
      },
      description: {
        ua: "Оберіть потрібне обладнання з нашого каталогу. Ми можемо допомогти вам підібрати найкращий варіант для ваших потреб.",
        ru: "Выберите необходимое оборудование из нашего каталога. Мы можем помочь вам подобрать лучший вариант для ваших нужд.",
        en: "Choose the equipment you need from our catalog. We can help you find the best option for your needs."
      }
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: {
        ua: "Узгодьте дати",
        ru: "Согласуйте даты",
        en: "Agree on dates"
      },
      description: {
        ua: "Узгодьте дати оренди обладнання. Ми перевіримо доступність і зарезервуємо для вас.",
        ru: "Согласуйте даты аренды оборудования. Мы проверим доступность и зарезервируем для вас.",
        en: "Agree on equipment rental dates. We will check availability and reserve it for you."
      }
    },
    {
      icon: <Phone className="h-10 w-10 text-primary" />,
      title: {
        ua: "Зв'яжіться з нами",
        ru: "Свяжитесь с нами",
        en: "Contact us"
      },
      description: {
        ua: "Зателефонуйте нам або заповніть форму для замовлення дзвінка. Наші фахівці допоможуть підібрати відповідне обладнання.",
        ru: "Позвоните нам или заполните форму для заказа звонка. Наши специалисты помогут подобрать нужное оборудование.",
        en: "Call us or fill out a callback form. Our specialists will help you select the right equipment."
      }
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: {
        ua: "Укладіть договір та внесіть заставу",
        ru: "Заключите договор и внесите залог",
        en: "Sign contract and pay deposit"
      },
      description: {
        ua: "Підпишіть договір оренди та внесіть заставу. Застава повертається після повернення обладнання у належному стані.",
        ru: "Подпишите договор аренды и внесите залог. Залог возвращается после возврата оборудования в надлежащем состоянии.",
        en: "Sign a rental agreement and pay a deposit. The deposit is returned after the equipment is returned in proper condition."
      }
    },
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: {
        ua: "Отримайте обладнання",
        ru: "Получите оборудование",
        en: "Receive equipment"
      },
      description: {
        ua: "Заберіть обладнання в нашому офісі або замовте доставку. Наші фахівці допоможуть вам з налаштуванням.",
        ru: "Заберите оборудование в нашем офисе или закажите доставку. Наши специалисты помогут вам с настройкой.",
        en: "Pick up the equipment at our office or order delivery. Our specialists will help you with setup."
      }
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: {
        ua: "Поверніть обладнання",
        ru: "Верните оборудование",
        en: "Return equipment"
      },
      description: {
        ua: "Поверніть обладнання після закінчення терміну оренди. Ми перевіримо стан і повернемо заставу.",
        ru: "Верните оборудование после окончания срока аренды. Мы проверим состояние и вернем залог.",
        en: "Return the equipment after the rental period. We will check its condition and return your deposit."
      }
    }
  ];
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
        <div className="bg-black/70 py-24 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('hero_title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              {t('hero_subtitle')}
            </p>
            <Button size="lg" asChild>
              <Link to="/categories">
                {t('view_catalog')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container">
        <h2 className="text-3xl font-bold text-center mb-12">{t('categories')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {topCategories.map(category => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <Link 
                to={`/categories/${category}`}
                key={category}
                className="flex flex-col items-center p-6 bg-card rounded-lg hover:bg-secondary transition-colors"
              >
                {IconComponent && <IconComponent size={48} className="mb-4 text-primary" />}
                <span className="text-center font-medium">{t(category)}</span>
              </Link>
            );
          })}
        </div>
      </section>
      
      {/* Leasing Process Section - Moved above About Us */}
      <section className="py-16 bg-muted/10">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'ua' ? 'Процес оренди' : language === 'ru' ? 'Процесс аренды' : 'Leasing Process'}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {leasingSteps.map((step, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {step.icon}
                    <CardTitle>{step.title[language]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{step.description[language]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Events Section - About Us text moved here */}
      <section className="py-16 bg-muted/10">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-6">
            {language === 'ua' ? 'Наші заходи' : language === 'ru' ? 'Наши мероприятия' : 'Our Events'}
          </h2>
          
          {/* About Us text moved here */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-center text-muted-foreground">
              {language === 'ua' 
                ? "VideoSoundEvent – професійна компанія з оренди аудіо та відео обладнання. Ми надаємо високоякісне обладнання для проведення будь-яких заходів, від невеликих вечірок до масштабних концертів та фестивалів." 
                : language === 'ru' 
                ? "VideoSoundEvent – профессиональная компания по аренде аудио и видео оборудования. Мы предоставляем высококачественное оборудование для проведения любых мероприятий, от небольших вечеринок до масштабных концертов и фестивалей."
                : "VideoSoundEvent is a professional audio and video equipment rental company. We provide high-quality equipment for any events, from small parties to large-scale concerts and festivals."}
            </p>
          </div>
          
          <EventsGallery />
        </div>
      </section>
    </div>
  );
};

export default Home;
