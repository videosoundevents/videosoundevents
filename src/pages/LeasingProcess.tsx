
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Phone, Calendar, Truck, CreditCard, FileCheck } from 'lucide-react';

const LeasingProcess: React.FC = () => {
  const { language } = useLanguage();
  
  const steps = [
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
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {language === 'ua' ? 'Процес оренди' : language === 'ru' ? 'Процесс аренды' : 'Leasing Process'}
      </h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {steps.map((step, index) => (
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
  );
};

export default LeasingProcess;
