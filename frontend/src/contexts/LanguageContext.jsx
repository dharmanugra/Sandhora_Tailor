import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Navigation
    home: 'HOME',
    gallery: 'GALLERY',
    contact: 'CONTACT',
    
    // Landing Page
    hero: {
      title: 'Sandhora Tailor',
      tagline: 'Crafted Precision. Timeless Elegance.',
      subtitle: 'Where traditional craftsmanship meets contemporary luxury in the heart of Bali',
      cta: 'EXPLORE OUR WORK'
    },
    about: {
      title: 'Craftsmanship Meets Elegance',
      description: 'At Sandhora Tailor, we believe that every garment tells a story. With decades of expertise and passion for perfection, we transform fabric into timeless pieces that celebrate your unique style and personality.',
      features: {
        tailoring: { title: 'Bespoke Tailoring', desc: 'Each piece crafted to your exact measurements' },
        materials: { title: 'Premium Materials', desc: 'Finest fabrics sourced from around the world' },
        craftsmen: { title: 'Master Craftsmen', desc: 'Decades of experience in traditional techniques' }
      }
    },
    services: {
      title: 'Our Services',
      subtitle: 'From bespoke suits to traditional attire, every creation is a masterpiece',
      items: {
        suits: { title: 'Custom Suits', desc: 'Impeccably tailored suits that define sophistication' },
        formal: { title: 'Formal Wear', desc: "Elegant attire for life's most important moments" },
        traditional: { title: 'Traditional Wear', desc: 'Honoring heritage with contemporary elegance' }
      }
    },
    cta: {
      title: 'Begin Your Journey',
      description: 'Experience the art of bespoke tailoring. Every stitch, every detail, crafted exclusively for you.',
      viewGallery: 'VIEW GALLERY',
      contactUs: 'CONTACT US'
    },
    
    // Contact Page
    contactPage: {
      title: 'Get In Touch',
      subtitle: "Let's create something extraordinary together",
      visitTitle: 'Visit Our Atelier',
      visitDesc: 'Experience the artistry of bespoke tailoring firsthand. Our atelier in Canggu, Bali welcomes you to explore fabrics, discuss designs, and begin your journey to sartorial perfection.',
      phone: 'Phone / WhatsApp',
      email: 'Email',
      location: 'Location',
      hours: 'Opening Hours',
      hoursWeekday: 'Monday - Saturday: 9:00 AM - 7:00 PM',
      hoursWeekend: 'Sunday: By Appointment Only',
      formTitle: 'Send a Message',
      name: 'Name',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'your@email.com',
      phone: 'Phone',
      phonePlaceholder: '+62 XXX XXXX XXXX',
      message: 'Message',
      messagePlaceholder: 'Tell us about your tailoring needs...',
      sendButton: 'SEND MESSAGE',
      sending: 'SENDING...',
      successTitle: 'Message Sent!',
      successDesc: "Thank you for contacting us. We'll get back to you soon."
    },
    
    // Footer
    footer: {
      tagline: 'Crafting timeless elegance through bespoke tailoring. Where tradition meets contemporary luxury.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      copyright: '© 2025 Sandhora Tailor. All rights reserved.',
      admin: 'Admin'
    }
  },
  id: {
    // Navigation
    home: 'BERANDA',
    gallery: 'GALERI',
    contact: 'KONTAK',
    
    // Landing Page
    hero: {
      title: 'Sandhora Tailor',
      tagline: 'Presisi Terukir. Keanggunan Abadi.',
      subtitle: 'Di mana keahlian tradisional bertemu kemewahan kontemporer di jantung Bali',
      cta: 'JELAJAHI KARYA KAMI'
    },
    about: {
      title: 'Keahlian Bertemu Keanggunan',
      description: 'Di Sandhora Tailor, kami percaya bahwa setiap pakaian menceritakan sebuah kisah. Dengan puluhan tahun keahlian dan semangat untuk kesempurnaan, kami mengubah kain menjadi karya abadi yang merayakan gaya dan kepribadian unik Anda.',
      features: {
        tailoring: { title: 'Jahitan Bespoke', desc: 'Setiap karya dibuat sesuai ukuran Anda' },
        materials: { title: 'Material Premium', desc: 'Kain terbaik dari seluruh dunia' },
        craftsmen: { title: 'Pengrajin Ahli', desc: 'Puluhan tahun pengalaman teknik tradisional' }
      }
    },
    services: {
      title: 'Layanan Kami',
      subtitle: 'Dari jas bespoke hingga pakaian tradisional, setiap kreasi adalah mahakarya',
      items: {
        suits: { title: 'Jas Custom', desc: 'Jas yang dijahit sempurna mendefinisikan kecanggihan' },
        formal: { title: 'Pakaian Formal', desc: 'Busana elegan untuk momen penting dalam hidup' },
        traditional: { title: 'Pakaian Tradisional', desc: 'Menghormati warisan dengan keanggunan kontemporer' }
      }
    },
    cta: {
      title: 'Mulai Perjalanan Anda',
      description: 'Rasakan seni jahitan bespoke. Setiap jahitan, setiap detail, dibuat khusus untuk Anda.',
      viewGallery: 'LIHAT GALERI',
      contactUs: 'HUBUNGI KAMI'
    },
    
    // Contact Page
    contactPage: {
      title: 'Hubungi Kami',
      subtitle: 'Mari ciptakan karya yang luar biasa bersama',
      visitTitle: 'Kunjungi Atelier Kami',
      visitDesc: 'Rasakan seni jahitan bespoke secara langsung. Atelier kami di Canggu, Bali menyambut Anda untuk menjelajahi kain, berdiskusi tentang desain, dan memulai perjalanan menuju kesempurnaan sartorial.',
      phone: 'Phone / WhatsApp',
      email: 'Email',
      location: 'Lokasi',
      hours: 'Jam Operasional',
      hoursWeekday: 'Senin - Sabtu: 09:00 - 19:00',
      hoursWeekend: 'Minggu: Dengan Perjanjian',
      formTitle: 'Kirim Pesan',
      name: 'Nama',
      namePlaceholder: 'Nama lengkap Anda',
      emailPlaceholder: 'email@anda.com',
      phone: 'Telepon',
      phonePlaceholder: '+62 XXX XXXX XXXX',
      message: 'Pesan',
      messagePlaceholder: 'Ceritakan kebutuhan jahitan Anda...',
      sendButton: 'KIRIM PESAN',
      sending: 'MENGIRIM...',
      successTitle: 'Pesan Terkirim!',
      successDesc: 'Terima kasih telah menghubungi kami. Kami akan segera merespons.'
    },
    
    // Footer
    footer: {
      tagline: 'Menciptakan keanggunan abadi melalui jahitan bespoke. Di mana tradisi bertemu kemewahan kontemporer.',
      quickLinks: 'Tautan Cepat',
      contact: 'Kontak',
      copyright: '© 2025 Sandhora Tailor. Hak cipta dilindungi.',
      admin: 'Admin'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'id' : 'en');
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
