import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { contactInfo, mockSubmitContact } from '../mock';

const ContactPage = () => {
  const { toast } = useToast();
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
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We\'ll get back to you soon.',
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
    <div className="min-h-screen bg-cream-white">
      {/* Header */}
      <div className="bg-soft-gray py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-7xl mb-6 text-charcoal">Get In Touch</h1>
          <p className="font-sans text-xl text-warm-gray">
            Let's create something extraordinary together
          </p>
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl mb-8 text-charcoal">Visit Our Atelier</h2>
            <p className="font-sans text-lg text-warm-gray mb-12 leading-relaxed">
              Experience the artistry of bespoke tailoring firsthand. Our atelier in Canggu, Bali 
              welcomes you to explore fabrics, discuss designs, and begin your journey to sartorial perfection.
            </p>
            
            <div className="space-y-8">
              <motion.div
                className="flex items-start gap-5"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-warm-sage bg-opacity-20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-rich-chocolate" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-lg text-charcoal mb-2">Phone / WhatsApp</h3>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="font-sans text-warm-gray hover:text-warm-sage transition-colors duration-300"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                className="flex items-start gap-5"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-warm-sage bg-opacity-20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-rich-chocolate" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-lg text-charcoal mb-2">Email</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="font-sans text-warm-gray hover:text-warm-sage transition-colors duration-300"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                className="flex items-start gap-5"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-warm-sage bg-opacity-20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-rich-chocolate" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-lg text-charcoal mb-2">Location</h3>
                  <p className="font-sans text-warm-gray leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="mt-12 p-8 bg-soft-gray rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Opening Hours</h3>
              <div className="space-y-2 font-sans text-warm-gray">
                <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p>Sunday: By Appointment Only</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-soft-gray p-10 rounded-lg">
              <h2 className="font-serif text-4xl mb-6 text-charcoal">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-sans text-sm font-medium text-charcoal mb-2 block tracking-wide uppercase">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-cream-white border-warm-gray focus:border-warm-sage font-sans"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="font-sans text-sm font-medium text-charcoal mb-2 block tracking-wide uppercase">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-cream-white border-warm-gray focus:border-warm-sage font-sans"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="font-sans text-sm font-medium text-charcoal mb-2 block tracking-wide uppercase">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-cream-white border-warm-gray focus:border-warm-sage font-sans"
                    placeholder="+62 XXX XXXX XXXX"
                  />
                </div>
                
                <div>
                  <label className="font-sans text-sm font-medium text-charcoal mb-2 block tracking-wide uppercase">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-cream-white border-warm-gray focus:border-warm-sage font-sans resize-none"
                    placeholder="Tell us about your tailoring needs..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-warm-sage hover:bg-opacity-90 text-cream-white font-sans font-medium text-base tracking-widest py-6 rounded transition-all duration-300 hover:shadow-xl"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-cream-white border-t-transparent rounded-full animate-spin" />
                      SENDING...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      SEND MESSAGE
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;