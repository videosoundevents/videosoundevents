import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  
  // Top categories to display
  const topCategories = [
    'video_equipment',
    'audio_equipment',
    'lighting_equipment',
    'stage_equipment',
    'special_effects',
    'miscellaneous'
  ];

  // Leasing process steps
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
  
  // SEO meta content based on language
  const seoContent = {
    ua: {
      title: "VideoSoundEvent - Професійна оренда аудіо та відео обладнання",
      description: "Оренда якісного аудіо, відео, світлового обладнання та спецефектів для будь-яких заходів — вечірок, концертів, фестивалів.",
      keywords: "video events, sound platform, live music, audio experiences, interactive media, concert equipment, event rentals Ukraine, live sound systems, stage equipment Ukraine, audio gear rental, відео події, звукова платформа, живий музика, аудіо досвіди, інтерактивні медіа, обладнання для концертів, оренда обладнання Україна, живі звукові системи, сценічне обладнання Україна, оренда аудіо обладнання, технічне забезпечення подій, прокат світлового обладнання, професійне звукове обладнання, організація концертів Україна, оренда сценічного обладнання"
    },
    ru: {
      title: "VideoSoundEvent - Профессиональная аренда аудио и видео оборудования",
      description: "Аренда качественного аудио, видео, светового оборудования и спецэффектов для любых мероприятий — вечеринок, концертов, фестивалей.",
      keywords: "video events, sound platform, live music, audio experiences, interactive media, concert equipment, event rentals Ukraine, live sound systems, stage equipment Ukraine, audio gear rental, видео события, звуковая платформа, живая музыка, аудио впечатления, интерактивные медиа, оборудование для концертов, аренда оборудования Украина, живые звуковые системы, сценическое оборудование Украина, аренда аудио оборудования, техническое обеспечение мероприятий, прокат светового оборудования, профессиональное звуковое оборудование, организация концертов Украина, аренда сценического оборудования"
    },
    en: {
      title: "VideoSoundEvent - Professional Audio and Video Equipment Rental",
      description: "Rent high-quality audio, video, lighting equipment, and special effects for any events — parties, concerts, festivals.",
      keywords: "video events, sound platform, live music, audio experiences, interactive media, concert equipment, event rentals Ukraine, live sound systems, stage equipment Ukraine, audio gear rental, technical event support, lighting equipment rental, professional audio equipment, concert organization Ukraine, stage equipment rental"
    }
  };

  const { title, description, keywords } = seoContent[language];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://videosoundevents.com/" />
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://videosoundevents.com/" />
        <meta property="og:image" content="https://videosoundevents.com/og-image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://videosoundevents.com/og-image.jpg" />
      </Helmet>

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

        {/* Leasing Process Section */}
        <section className="bg-gray-50 py-16 container">
          <h2 className="text-3xl font-bold mb-10 text-center">{t('leasing_process')}</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {leasingouvrirSteps.map((step, i) => (
              <Card key={i} className="border-l-4 border-l-primary">
                <CardHeader className="flex items-center gap-4">
                  {step.icon}
                  <CardTitle>{step.title[language]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{step.description[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Events Gallery Section */}
        <section className="container py-16">
          <h2 className="text-3xl font-bold mb-10 text-center">{t('events_gallery')}</h2>
          <EventsGallery />
        </section>
      </div>
    </>
  );
};

export default Home;