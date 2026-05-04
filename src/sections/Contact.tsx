import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Send, Phone, Mail, MapPin } from 'lucide-react';
import { developments } from '@/data/developments';

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
    const msg = encodeURIComponent(
      `Hola, mensaje desde el sitio web:\n\n` +
      `Nombre: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Telefono: ${form.phone || 'No proporcionado'}\n` +
      `Desarrollo: ${devName}\n` +
      `Contacto preferido: ${form.contactMethod || 'WhatsApp'}\n\n` +
      `Mensaje:\n${form.message}`
    );
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", { send_to: "AW-10936994474/form_contact" });
    }
    if (form.contactMethod === 'Email') {
      window.open(`mailto:alexolvera@turisterreno.com?subject=Solicitud sobre ${devName}&body=${msg}`, "_blank");
    } else {
      window.open(`https://wa.me/5215566545971?text=${msg}`, "_blank");
    }
    setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 800);
  };

  const activeDevelopments = developments.filter(d => d.status !== 'hidden');

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-800 bg-white";

  return (
    <section id="contact" className="py-20 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            {isEn ? "Let's Talk About Your Project" : "Hablemos de Tu Proyecto"}
          </h2>
          <p className="text-lg text-gray-500">
            {isEn ? "Ready to invest in your future?" : "¿Listo para invertir en tu futuro?"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* PANEL IZQUIERDO VERDE */}
          <div className="bg-green-900 text-white rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-bold mb-6">
              {isEn ? "Contact Information" : "Información de Contacto"}
            </h3>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-green-300 text-sm">{t.contact.info.phone}</p>
                <a href="tel:+525566545971" className="font-semibold hover:text-green-300 transition-colors">
                  55 66 545971
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-green-300 text-sm">{t.contact.info.email}</p>
                <a href="mailto:alexolvera@turisterreno.com" className="font-semibold hover:text-green-300 transition-colors text-sm break-all">
                  alexolvera@turisterreno.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-green-300 text-sm">{t.contact.info.address}</p>
                <p className="font-semibold">
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
                    <><Send className="w-4 h-4 mr-2" />{isEn ? "Send Message" : "Enviar Mensaje"}</>
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