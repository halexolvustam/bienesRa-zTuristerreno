import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.info.phone,
      value: '+52 (556) 654 5971',
    },
    {
      icon: Mail,
      label: t.contact.info.email,
      value: 'asesor.alexolvera@gmail.com',
    },
    {
      icon: MapPin,
      label: t.contact.info.address,
      value: 'Sureste Mexicano',
    },
    {
      icon: Clock,
      label: t.contact.info.hours,
      value: 'Lun - Dom: 9:00 - 22:00',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.contact.form.success}
                </h3>
                <p className="text-gray-600">
                  Me pondré en contacto contigo pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{t.contact.form.name}</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="Juan Pérez"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t.contact.form.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="juan@ejemplo.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t.contact.form.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+52 (999) 123 4567"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t.contact.form.message}</Label>
                  <Textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Me interesa conocer más sobre..."
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      {t.contact.form.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t.contact.form.submit}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    {item.label}
                  </h4>
                 
                  {item.label === t.contact.info.phone ? (
                  <a
                    href="tel:+5215566545971"
                    onClick={() => {
                      if (typeof window !== "undefined" && (window as any).gtag) {
                        (window as any).gtag("event", "click_call", {
                          event_category: "lead",
                          event_label: "phone_call",
                        });

                        (window as any).gtag("event", "conversion", {
                          send_to: "AW-10936994474/XXXXXXXXX"
                        });
                      }
                    }}
                    className="text-gray-900 font-semibold hover:text-amber-600"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-900 font-semibold">{item.value}</p>
                )}
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238390.60398459968!2d-89.73052995!3d20.98002955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f56715cab0e33a9%3A0x48eacdd2935e97e6!2sM%C3%A9rida%2C%20Yucat%C3%A1n!5e0!3m2!1ses!2smx!4v1704067200000!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
