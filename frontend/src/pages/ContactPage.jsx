import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { contactInfo, mockSubmitContact } from '../mock';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await mockSubmitContact(formData);
      toast({
        title: t('contactPage.successTitle'),
        description: t('contactPage.successDesc')
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>

          <h1 className="!font-serif !text-7xl !mt-[24px] !mb-[24px] text-white">{t('contactPage.title')}</h1>
          <p className="font-sans text-xl text-gray-400">
            {t('contactPage.subtitle')}
          </p>
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>

            {/* Profile Photo - Circle */}
            <motion.div
              className="mb-12 flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}>

              <img
                src="https://customer-assets.emergentagent.com/job_bespoke-couture/artifacts/lygobk59_3f2ddc1962982c146524170517f5effe.png"
                alt="Sandhora Tailor Team"
                className="w-64 h-64 object-cover rounded-full border-4 border-black shadow-2xl" />

            </motion.div>
            
            <h2 className="font-serif text-5xl mb-8 text-black">{t('contactPage.visitTitle')}</h2>
            <p className="font-sans text-lg text-gray-600 mb-12 leading-relaxed">
              {t('contactPage.visitDesc')}
            </p>
            
            <div className="space-y-8">
              <motion.div
                className="flex items-start gap-5"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}>

                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-lg text-black mb-2">{t('contactPage.phone')}</h3>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="font-sans text-gray-600 hover:text-black transition-colors duration-300">

                    {contactInfo.phone}
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                className="flex items-start gap-5"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}>

                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-lg text-black mb-2">{t('contactPage.email')}</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="font-sans text-gray-600 hover:text-black transition-colors duration-300">

                    {contactInfo.email}
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                className="flex items-start gap-5"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}>

                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-lg text-black mb-2">{t('contactPage.location')}</h3>
                  <p className="font-sans text-gray-600 leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Google Maps - Updated link */}
            <motion.div
              className="mt-12 rounded-lg overflow-hidden border-2 border-black shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493.7969124424398!2d115.14927256359427!3d-8.634162499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2392c9b749041%3A0xd35cea3a8e3f4030!2sSandhora%20Tailor!5e0!3m2!1sen!2sid!4v1705234567890!5m2!1sen!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sandhora Tailor Location">
              </iframe>
            </motion.div>
            
            <motion.div
              className="mt-8 p-8 bg-gray-100 rounded-lg border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}>

              <h3 className="font-serif text-2xl mb-4 text-black">{t('contactPage.hours')}</h3>
              <div className="space-y-2 font-sans text-gray-600">
                <p>{t('contactPage.hoursWeekday')}</p>
                <p>{t('contactPage.hoursWeekend')}</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>

            <div className="bg-gray-100 p-10 rounded-lg border-2 border-black">
              <h2 className="font-serif text-4xl mb-6 text-black">{t('contactPage.formTitle')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-sans text-sm font-medium text-black mb-2 block tracking-wide uppercase">
                    {t('contactPage.name')}
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white border-2 border-gray-300 focus:border-black font-sans"
                    placeholder={t('contactPage.namePlaceholder')} />

                </div>
                
                <div>
                  <label className="font-sans text-sm font-medium text-black mb-2 block tracking-wide uppercase">
                    {t('contactPage.email')}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white border-2 border-gray-300 focus:border-black font-sans"
                    placeholder={t('contactPage.emailPlaceholder')} />

                </div>
                
                <div>
                  <label className="font-sans text-sm font-medium text-black mb-2 block tracking-wide uppercase">
                    {t('contactPage.phone')}
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white border-2 border-gray-300 focus:border-black font-sans"
                    placeholder={t('contactPage.phonePlaceholder')} />

                </div>
                
                <div>
                  <label className="font-sans text-sm font-medium text-black mb-2 block tracking-wide uppercase">
                    {t('contactPage.message')}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-white border-2 border-gray-300 focus:border-black font-sans resize-none"
                    placeholder={t('contactPage.messagePlaceholder')} />

                </div>
                
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black hover:bg-gray-800 text-white font-sans font-medium text-base tracking-widest py-6 rounded transition-all duration-300 hover:shadow-xl">

                  {submitting ?
                  <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('contactPage.sending')}
                    </span> :

                  <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      {t('contactPage.sendButton')}
                    </span>
                  }
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>);

};

export default ContactPage;