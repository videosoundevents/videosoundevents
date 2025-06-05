import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import CallbackForm from "@/components/CallbackForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

declare global {
  interface Window {
    google: any;
  }
}

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const contactInfo = {
    address: {
      ua: "вул. Київська 25, Київ, Україна",
      ru: "ул. Киевская 25, Киев, Украина",
      en: "25 Kyivska St., Kyiv, Ukraine",
    },
    phone: "+380 44 123 4567",
    email: "info@vsoundevents.ua",
    hours: {
      ua: "Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 15:00",
      ru: "Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 15:00",
      en: "Mon-Fri: 9:00 - 18:00, Sat: 10:00 - 15:00",
    },
    title: {
      ua: "Контактна інформація",
      ru: "Контактная информация",
      en: "Contact Information",
    },
    form_title: {
      ua: "Зв'яжіться з нами",
      ru: "Свяжитесь с нами",
      en: "Contact Us",
    },
    form_subtitle: {
      ua: "Заповніть форму нижче і ми зв'яжемося з вами найближчим часом",
      ru: "Заполните форму ниже и мы свяжемся с вами в ближайшее время",
      en: "Fill out the form below and we will contact you shortly",
    },
    map_title: {
      ua: "Наше розташування",
      ru: "Наше расположение",
      en: "Our Location",
    },
  };

  const pageMeta = {
    title: {
      ua: "Контакти | VideoSoundEvent",
      ru: "Контакты | VideoSoundEvent",
      en: "Contact Us | VideoSoundEvent",
    },
    description: {
      ua: "Зв'яжіться з VideoSoundEvent: адреса у Києві, телефон, email та форма для зворотного зв'язку. Ми готові допомогти з орендою обладнання.",
      ru: "Свяжитесь с VideoSoundEvent: адрес в Киеве, телефон, email и форма обратной связи. Мы готовы помочь с арендой оборудования.",
      en: "Contact VideoSoundEvent: Kyiv address, phone, email, and contact form. We're ready to assist with equipment rentals.",
    },
  };

  useEffect(() => {
    if (window.google) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
    script.async = true;
    script.defer = true;

    script.onload = initMap;
    script.onerror = () => {
      console.error("Failed to load Google Maps");
      setMapError("Unable to load the map. Please try again later.");
    };

    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    if (!mapContainer.current) return;

    try {
      const map = new window.google.maps.Map(mapContainer.current, {
        center: { lat: 50.432573, lng: 30.615517 },
        zoom: 12,
      });

      new window.google.maps.Marker({
        position: { lat: 50.432573, lng: 30.615517 },
        map,
        title: "VideoSoundEvent",
      });
    } catch (error) {
      console.error("Map init error:", error);
      setMapError("Unable to load the map. Please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageMeta.title[language]}</title>
        <meta name="description" content={pageMeta.description[language]} />
        <meta
          name="keywords"
          content="contact videosoundevent, event equipment rental contact, ukraine concert equipment rental, audio video rental ukraine"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://videosoundevents.com/contact" />
        <meta property="og:title" content={pageMeta.title[language]} />
        <meta
          property="og:description"
          content={pageMeta.description[language]}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://videosoundevents.com/contact"
        />
        <meta
          property="og:image"
          content="https://videosoundevents.com/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageMeta.title[language]} />
        <meta
          name="twitter:description"
          content={pageMeta.description[language]}
        />
        <meta
          name="twitter:image"
          content="https://videosoundevents.com/og-image.jpg"
        />
      </Helmet>

      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {language === "ua"
            ? "Зворотній зв'язок"
            : language === "ru"
              ? "Обратная связь"
              : "Contact Us"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>{contactInfo.title[language]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                <p>{contactInfo.address[language]}</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-1" />
                <p>{contactInfo.phone}</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-1" />
                <p>{contactInfo.email}</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-1" />
                <p>{contactInfo.hours[language]}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{contactInfo.form_title[language]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                {contactInfo.form_subtitle[language]}
              </p>
              <CallbackForm includeDescription={true} />
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{contactInfo.map_title[language]}</CardTitle>
            </CardHeader>
            <CardContent>
              {mapError ? (
                <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-red-500">{mapError}</p>
                </div>
              ) : (
                <div
                  ref={mapContainer}
                  className="w-full h-[400px] rounded-md"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Contact;
