import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { mockGetGallery } from '../mock';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    loadGallery();
  }, []);
  
  const loadGallery = async () => {
    setLoading(true);
    const data = await mockGetGallery();
    setImages(data);
    setLoading(false);
  };
  
  const categories = ['all', 'suits', 'formal', 'traditional', 'business', 'casual'];
  
  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => img.category === filter);
  
  return (
    <div className="min-h-screen bg-cream-white">
      {/* Header */}
      <div className="bg-soft-gray py-20 px-6">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-7xl mb-6 text-charcoal">Our Gallery</h1>
          <p className="font-sans text-xl text-warm-gray max-w-2xl mx-auto">
            A showcase of our finest creations, each piece a testament to exceptional craftsmanship
          </p>
        </motion.div>
      </div>
      
      {/* Filter */}
      <div className="sticky top-0 z-40 bg-cream-white border-b border-soft-gray shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-sans text-sm tracking-wider uppercase px-6 py-2.5 rounded-full transition-all duration-300 ${
                  filter === cat
                    ? 'bg-warm-sage text-cream-white shadow-lg'
                    : 'bg-soft-gray text-warm-gray hover:bg-warm-sage hover:bg-opacity-20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-warm-sage border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden rounded-lg bg-soft-gray shadow-md hover:shadow-2xl transition-shadow duration-300">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-serif text-2xl text-cream-white mb-2">{image.title}</h3>
                      <p className="font-sans text-sm text-soft-gray">{image.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="font-sans text-xl text-warm-gray">No images found in this category</p>
          </div>
        )}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal bg-opacity-95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-cream-white hover:text-warm-sage transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-6 text-center">
                <h2 className="font-serif text-4xl text-cream-white mb-3">{selectedImage.title}</h2>
                <p className="font-sans text-lg text-soft-gray mb-2">{selectedImage.description}</p>
                <p className="font-sans text-sm text-warm-gray uppercase tracking-wider">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;