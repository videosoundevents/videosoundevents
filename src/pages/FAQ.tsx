import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  const { language } = useLanguage();

  const faqs = [
    {
      question: {
        ua: "Який розмір застави потрібно залишити?",
        ru: "Какой размер залога нужно оставить?",
        en: "What deposit amount is required?",
      },
      answer: {
        ua: "Розмір застави залежить від вартості обладнання і зазвичай становить 30-50% від його ринкової вартості. Точну суму вам повідомлять при оформленні оренди.",
        ru: "Размер залога зависит от стоимости оборудования и обычно составляет 30-50% от его рыночной стоимости. Точную сумму вам сообщат при оформлении аренды.",
        en: "The deposit amount depends on the equipment value and usually ranges from 30-50% of its market value. The exact amount will be communicated during the rental process.",
      },
    },
    {
      question: {
        ua: "Як довго можна орендувати обладнання?",
        ru: "Как долго можно арендовать оборудование?",
        en: "How long can I rent the equipment?",
      },
      answer: {
        ua: "Мінімальний термін оренди - 1 день. Максимальний термін не обмежений, але для довгострокової оренди ми пропонуємо спеціальні знижки.",
        ru: "Минимальный срок аренды - 1 день. Максимальный срок не ограничен, но для долгосрочной аренды мы предлагаем специальные скидки.",
        en: "The minimum rental period is 1 day. There is no maximum limit, and we offer special discounts for long-term rentals.",
      },
    },
    {
      question: {
        ua: "Чи надаєте ви послуги технічної підтримки?",
        ru: "Предоставляете ли вы услуги технической поддержки?",
        en: "Do you provide technical support services?",
      },
      answer: {
        ua: "Так, ми можемо надати технічну підтримку та інженерів для налаштування обладнання за додаткову плату. Це особливо рекомендується для складних технічних установок.",
        ru: "Да, мы можем предоставить техническую поддержку и инженеров для настройки оборудования за дополнительную плату. Это особенно рекомендуется для сложных технических установок.",
        en: "Yes, we can provide technical support and engineers to set up equipment for an additional fee. This is especially recommended for complex technical installations.",
      },
    },
    {
      question: {
        ua: "Що робити, якщо обладнання пошкодилося під час оренди?",
        ru: "Что делать, если оборудование повредилось во время аренды?",
        en: "What should I do if the equipment is damaged during rental?",
      },
      answer: {
        ua: "Негайно повідомте нас про будь-які пошкодження. Залежно від ситуації, може бути утримана частина застави для покриття ремонту. Рекомендуємо уважно перевіряти обладнання при отриманні.",
        ru: "Немедленно сообщите нам о любых повреждениях. В зависимости от ситуации, может быть удержана часть залога для покрытия ремонта. Рекомендуем внимательно проверять оборудование при получении.",
        en: "Notify us immediately about any damage. Depending on the situation, part of the deposit may be withheld to cover repairs. We recommend carefully checking the equipment upon receipt.",
      },
    },
    {
      question: {
        ua: "Чи доставляєте ви обладнання?",
        ru: "Доставляете ли вы оборудование?",
        en: "Do you deliver equipment?",
      },
      answer: {
        ua: "Так, ми пропонуємо послугу доставки по місту та за його межі за додаткову плату. Вартість залежить від відстані та кількості обладнання.",
        ru: "Да, мы предлагаем услугу доставки по городу и за его пределы за дополнительную плату. Стоимость зависит от расстояния и количества оборудования.",
        en: "Yes, we offer delivery services within the city and beyond for an additional fee. The cost depends on the distance and amount of equipment.",
      },
    },
    {
      question: {
        ua: "Чи потрібно мені мати спеціальні навички для використання обладнання?",
        ru: "Нужно ли мне иметь специальные навыки для использования оборудования?",
        en: "Do I need special skills to use the equipment?",
      },
      answer: {
        ua: "Для базового обладнання спеціальні навички не потрібні, але для складного професійного обладнання рекомендуємо або мати досвід, або замовити послуги нашого технічного фахівця.",
        ru: "Для базового оборудования специальные навыки не требуются, но для сложного профессионального оборудования рекомендуем либо иметь опыт, либо заказать услуги нашего технического специалиста.",
        en: "For basic equipment, special skills are not required, but for complex professional equipment, we recommend either having experience or hiring our technical specialist.",
      },
    },
  ];

  const pageMeta = {
    title: {
      ua: "Часті запитання | VideoSoundEvent",
      ru: "Частые вопросы | VideoSoundEvent",
      en: "FAQ | VideoSoundEvent",
    },
    description: {
      ua: "Відповіді на часті запитання щодо оренди обладнання, технічної підтримки та доставки.",
      ru: "Ответы на частые вопросы по аренде оборудования, технической поддержке и доставке.",
      en: "Answers to frequently asked questions about equipment rental, technical support, and delivery.",
    },
  };

  // Fallback if language is undefined
  const currentLanguage = language || "en";

  return (
    <>
      <Helmet>
        <title>{pageMeta.title[currentLanguage]}</title>
        <meta
          name="description"
          content={pageMeta.description[currentLanguage]}
        />
        <meta property="og:title" content={pageMeta.title[currentLanguage]} />
        <meta
          property="og:description"
          content={pageMeta.description[currentLanguage]}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://videosoundevents.com/faq" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question[currentLanguage],
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer[currentLanguage],
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">FAQ</h1>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question[currentLanguage]}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer[currentLanguage]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default FAQ;
