
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface CallbackFormProps {
  productId?: string;
  onSuccess?: () => void;
  includeDescription?: boolean;
  productDetails?: {
    name: string;
    image: string;
    price: string;
  };
}


const CallbackForm: React.FC<CallbackFormProps> = ({ 
  productId, 
  onSuccess,
  includeDescription = false 
}) => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Define form schema based on requirements
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    phone: z.string().min(5, { message: "Valid phone number required" }),
    description: includeDescription 
      ? z.string().optional()
      : z.string().optional().default("")
  });

  type FormValues = z.infer<typeof formSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      description: ''
    }
  });
  
  const onSubmit = async (data: FormValues) => {
  setIsSubmitting(true);

  try {
    const time = new Date().toLocaleString();

    // Call the backend API (Vercel function)
    await axios.post('/api/send-email', {
      name: data.name,
      phone: data.phone,
      productName: productDetails?.name || 'Unknown',
      image: productDetails?.image || '',
      price: productDetails?.price || 'N/A',
      time,
    });

    toast.success(t('callback_success'));
    form.reset();

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('An error occurred. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};


  // Define placeholders based on language
  const placeholders = {
    name: {
      ua: "Ім'я",
      ru: "Имя",
      en: "Name"
    },
    phone: "+380950001111",
    description: {
      ua: "Напишіть, що вас цікавить або деталі заходу",
      ru: "Напишите, что вас интересует или детали мероприятия",
      en: "Write what are you looking for or event details"
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('your_name')}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder={placeholders.name[language]} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('your_phone')}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder={placeholders.phone} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {includeDescription && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'ua' ? 'Опис' : language === 'ru' ? 'Описание' : 'Description'}
                </FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder={placeholders.description[language]}
                    className="min-h-[120px] resize-y"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {t('send_request')}
            </span>
          ) : (
            t('send_request')
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CallbackForm;
