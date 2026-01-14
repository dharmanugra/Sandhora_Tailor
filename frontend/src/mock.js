// Mock data for Sandhora Tailor frontend
// This will be replaced with real backend data later

export const mockGalleryImages = [
  {
    id: '1',
    title: 'Custom Tailored Suit',
    description: 'Premium wool suit with perfect fit',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    category: 'suits',
    createdAt: '2025-01-15'
  },
  {
    id: '2',
    title: 'Traditional Kebaya',
    description: 'Elegant traditional Indonesian wear',
    imageUrl: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80',
    category: 'traditional',
    createdAt: '2025-01-14'
  },
  {
    id: '3',
    title: 'Wedding Dress',
    description: 'Bespoke wedding gown with intricate details',
    imageUrl: 'https://images.unsplash.com/photo-1595777216528-071e0127ccf4?w=800&q=80',
    category: 'formal',
    createdAt: '2025-01-13'
  },
  {
    id: '4',
    title: 'Business Blazer',
    description: 'Sharp professional blazer',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    category: 'business',
    createdAt: '2025-01-12'
  },
  {
    id: '5',
    title: 'Evening Gown',
    description: 'Stunning evening dress for special occasions',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
    category: 'formal',
    createdAt: '2025-01-11'
  },
  {
    id: '6',
    title: 'Casual Shirt',
    description: 'Perfectly fitted casual wear',
    imageUrl: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800&q=80',
    category: 'casual',
    createdAt: '2025-01-10'
  }
];

export const contactInfo = {
  phone: '+6282147068677',
  email: 'sandhoratailor@gmail.com',
  address: 'jalan cempaka putih 6A Jl. Raya Uma Buluh No.banjar, Canggu, Kuta Utara, Badung Regency, Bali 80351'
};

// Mock user for admin (will be replaced with actual auth)
export const mockAdmin = {
  id: 'admin-001',
  name: 'Admin User',
  email: 'admin@sandhoratailor.com',
  picture: 'https://via.placeholder.com/150'
};

// Mock function to simulate login (frontend only)
export const mockLogin = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('mockUser', JSON.stringify(mockAdmin));
      resolve(mockAdmin);
    }, 1000);
  });
};

// Mock function to check if user is logged in (frontend only)
export const mockCheckAuth = () => {
  const user = localStorage.getItem('mockUser');
  return user ? JSON.parse(user) : null;
};

// Mock function to logout (frontend only)
export const mockLogout = () => {
  localStorage.removeItem('mockUser');
};

// Mock function to get gallery images (frontend only)
export const mockGetGallery = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem('mockGallery');
      resolve(stored ? JSON.parse(stored) : mockGalleryImages);
    }, 500);
  });
};

// Mock function to add gallery image (frontend only)
export const mockAddGalleryImage = (imageData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem('mockGallery');
      const gallery = stored ? JSON.parse(stored) : mockGalleryImages;
      const newImage = {
        ...imageData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      gallery.unshift(newImage);
      localStorage.setItem('mockGallery', JSON.stringify(gallery));
      resolve(newImage);
    }, 500);
  });
};

// Mock function to delete gallery image (frontend only)
export const mockDeleteGalleryImage = (imageId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem('mockGallery');
      const gallery = stored ? JSON.parse(stored) : mockGalleryImages;
      const filtered = gallery.filter(img => img.id !== imageId);
      localStorage.setItem('mockGallery', JSON.stringify(filtered));
      resolve({ success: true });
    }, 500);
  });
};

// Mock function to submit contact form (frontend only)
export const mockSubmitContact = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Contact form submitted (mock):', formData);
      resolve({ success: true, message: 'Message sent successfully!' });
    }, 1000);
  });
};