import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Send, Phone, Mail, MapPin } from 'lucide-react';
import { developments } from '@/data/developments';
import emailjs from '@emailjs/browser';

export function Contact() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', development: '', contactMethod: '', message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const devName = form.development || (isEn ? 'Not specified' : 'No especificado');

    const templateParams = {
      name: form.name,
      email: form.email,
      phone: form.phone || (isEn ? 'Not provided' : 'No proporcionado'),
      development: devName,
      contactMethod: form.contactMethod || 'WhatsApp',
      message: form.message,
    };

    if (form.contactMethod === 'Email' || form.contactMethod === '') {
      emailjs.send(
        'service_mqsgmg9',
        'template_y4phi5c',
        templateParams,
        '1ge-ilMlK-aYoiihp'
      ).then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }).catch(() => {
        setIsSubmitting(false);
        alert(isEn ? 'Error sending email. Try WhatsApp.' : 'Error al enviar. Intenta por WhatsApp.');
      });
    } else {
      const msg = encodeURIComponent(
        `Hola, mensaje desde el sitio web:\n\n` +
        `Nombre: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Telefono: ${form.phone || 'No proporcionado'}\n` +
        `Desarrollo: ${devName}\n\n` +
        `Mensaje:\n${form.message}`
      );
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", { send_to: "AW-10936994474/form_contact" });
      }
      window.open(`https://wa.me/525566545971?text=${msg}`, "_blank");
      setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 800);
    }
  };

  const activeDevelopments = developments.filter(d => d.status !== 'hidden');
  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-800 bg-white";

  return (
    <section id="contact" className="py-20 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            {isEn ? "Get Your Free Quote" : "Cotiza Gratis"}
          </h2>
          <p className="text-lg text-gray-500">
            {isEn ? "No commitment. We'll get back to you right away." : "Sin compromiso. Te respondemos de inmediato."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* PANEL IZQUIERDO VERDE */}
          <div className="bg-green-900 text-white rounded-2xl p-8 space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-1">
                {isEn ? "Contact Information" : "Información de Contacto"}
              </h3>
              <p className="text-green-300 text-sm">
                {isEn ? "Free quote, no commitment." : "Cotización gratuita, sin compromiso."}
              </p>
            </div>

            {/* BOTÓN TELÉFONO */}
            
              href="tel:+525566545971"
              className="flex items-center gap-4 w-full bg-green-800 hover:bg-green-700 transition-colors rounded-xl px-4 py-3"
            >
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-green-300 text-xs">{isEn ? "Call us" : "Llámanos"}</p>
                <p className="font-semibold text-sm">55 6654 5971</p>
              </div>
            </a>

            {/* BOTÓN WHATSAPP */}
            
              href="https://wa.me/525566545971?text=Hola%2C%20quiero%20cotizar%20gratis%20un%20terreno"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-full bg-[#25D366] hover:bg-[#1ebe5d] transition-colors rounded-xl px-4 py-3"
            >
              <div className="w-10 h-10 bg-[#1ebe5d] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="text-green-100 text-xs">{isEn ? "Chat on WhatsApp" : "Escríbenos por WhatsApp"}</p>
                <p className="font-semibold text-sm">{isEn ? "Free quote now" : "Cotiza gratis ahora"}</p>
              </div>
            </a>

            {/* BOTÓN CORREO */}
            
              href="mailto:alexolvera@turisterreno.com"
              className="flex items-center gap-4 w-full bg-green-800 hover:bg-green-700 transition-colors rounded-xl px-4 py-3"
            >
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-green-300 text-xs">{isEn ? "Email us" : "Escríbenos"}</p>
                <p className="font-semibold text-xs break-all">alexolvera@turisterreno.com</p>
              </div>
            </a>

            {/* DIRECCIÓN */}
            <div className="flex items-start gap-4 px-1 pt-2">
              <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-green-300 text-sm">{t.contact.info.address}</p>
                <p className="font-semibold text-sm">
                  {isEn ? "Merida, Yucatan, Mexico" : "Mérida, Yucatán, México"}
                </p>
              </div>
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <div className="text-center py-20">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.contact.form.success}</h3>
                <p className="text-gray-600 mb-6">
                  {isEn ? "I will get back to you soon!" : "¡Te respondo pronto!"}
                </p>
                <Button className="bg-green-900 hover:bg-green-800"
                  onClick={() => { setIsSubmitted(false); setForm({ name: '', email: '', phone: '', development: '', contactMethod: '', message: '' }); }}>
                  {isEn ? "Send another message" : "Enviar otro mensaje"}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.form.name}</label>
                    <input id="name" type="text" required placeholder={isEn ? "Your name" : "Tu nombre"} className={inputClass} value={form.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.form.email}</label>
                    <input id="email" type="email" required placeholder="tu@email.com" className={inputClass} value={form.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.form.phone}</label>
                    <input id="phone" type="tel" placeholder="+52 999 123 4567" className={inputClass} value={form.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {isEn ? "Development of Interest" : "Desarrollo de Interés"}
                    </label>
                    <select id="development" value={form.development} onChange={handleChange} className={inputClass}>
                      <option value="">{isEn ? "Select a development" : "Selecciona un desarrollo"}</option>
                      {activeDevelopments.map(dev => (
                        <option key={dev.id} value={dev.name}>{dev.name}</option>
                      ))}
                      <option value={isEn ? "All" : "Todos"}>{isEn ? "All developments" : "Todos los desarrollos"}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isEn ? "Would you like to receive info by email or WhatsApp?" : "¿Desea recibir una cotización a su correo o WhatsApp?"}
                  </label>
                  <select id="contactMethod" value={form.contactMethod} onChange={handleChange} className={inputClass}>
                    <option value="">{isEn ? "Select an option" : "Seleccionar opción"}</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.form.message}</label>
                  <Textarea id="message" required rows={4} placeholder={isEn ? "How can I help you?" : "¿En qué puedo ayudarte?"} className="mt-1" value={form.message} onChange={handleChange} />
                </div>

                <Button type="submit" className="bg-green-900 hover:bg-green-800 text-white px-8 py-3 rounded-lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><span className="animate-spin mr-2">⏳</span>{t.contact.form.sending}</>
                  ) : (
                    <><Send className="w-4 h-4 mr-2" />{isEn ? "Get free quote" : "Cotizar gratis"}</>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}