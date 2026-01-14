import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Upload, Trash2, LogOut, Image as ImageIcon } from 'lucide-react';
import { mockCheckAuth, mockLogout, mockGetGallery, mockAddGalleryImage, mockDeleteGalleryImage } from '../mock';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'suits',
    imageUrl: ''
  });
  
  useEffect(() => {
    // Check authentication
    const authenticatedUser = location.state?.user || mockCheckAuth();
    if (!authenticatedUser) {
      navigate('/admin/login');
      return;
    }
    setUser(authenticatedUser);
    loadGallery();
  }, [navigate, location]);
  
  const loadGallery = async () => {
    setLoading(true);
    const data = await mockGetGallery();
    setImages(data);
    setLoading(false);
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In production, this would upload to server and get URL
      // For mock, we'll use a placeholder
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.imageUrl) {
      toast({
        title: 'Error',
        description: 'Please upload an image',
        variant: 'destructive'
      });
      return;
    }
    
    setUploading(true);
    try {
      await mockAddGalleryImage(formData);
      toast({
        title: 'Success!',
        description: 'Image added to gallery'
      });
      setFormData({ title: '', description: '', category: 'suits', imageUrl: '' });
      await loadGallery();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add image',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await mockDeleteGalleryImage(imageId);
      toast({
        title: 'Deleted',
        description: 'Image removed from gallery'
      });
      await loadGallery();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive'
      });
    }
  };
  
  const handleLogout = () => {
    mockLogout();
    navigate('/admin/login');
  };
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-cream-white">
      {/* Header */}
      <div className="bg-charcoal text-cream-white py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-serif text-3xl mb-1">Admin Dashboard</h1>
            <p className="font-sans text-sm text-soft-gray">Sandhora Tailor Gallery Management</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-sans text-sm font-medium">{user.name}</p>
              <p className="font-sans text-xs text-soft-gray">{user.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-cream-white text-cream-white hover:bg-cream-white hover:text-charcoal font-sans text-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-soft-gray p-8 rounded-lg sticky top-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl mb-6 text-charcoal">Add New Image</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-sans text-sm font-medium text-charcoal mb-2 block uppercase tracking-wide">
                    Title
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="bg-cream-white border-warm-gray focus:border-warm-sage font-sans"
                    placeholder="Image title"
                  />
                </div>
                
                <div>
                  <label className="font-sans text-sm font-medium text-charcoal mb-2 block uppercase tracking-wide">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="bg-cream-white border-warm-gray focus:border-warm-sage font-sans resize-none"
                    placeholder="Brief description"
                  />
                </div>
                
                <div>
                  <label className="font-sans text-sm font-medium text-charcoal mb-2 block uppercase tracking-wide">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-cream-white border border-warm-gray rounded-md px-3 py-2 font-sans focus:outline-none focus:border-warm-sage"
                  >
                    <option value="suits">Suits</option>
                    <option value="formal">Formal</option>
                    <option value="traditional">Traditional</option>
                    <option value="business">Business</option>
                    <option value="casual">Casual</option>
                  </select>
                </div>
                
                <div>
                  <label className="font-sans text-sm font-medium text-charcoal mb-2 block uppercase tracking-wide">
                    Image Upload
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center gap-2 w-full bg-cream-white border-2 border-dashed border-warm-gray hover:border-warm-sage rounded-md py-8 cursor-pointer transition-colors duration-300"
                    >
                      {formData.imageUrl ? (
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 text-warm-sage mx-auto mb-2" />
                          <span className="font-sans text-sm text-warm-sage">Image Selected</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-warm-gray mx-auto mb-2" />
                          <span className="font-sans text-sm text-warm-gray">Click to upload</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-warm-sage hover:bg-opacity-90 text-cream-white font-sans font-medium text-base tracking-wider py-6 rounded transition-all duration-300 hover:shadow-xl"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-cream-white border-t-transparent rounded-full animate-spin" />
                      UPLOADING...
                    </span>
                  ) : (
                    'ADD TO GALLERY'
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
          
          {/* Gallery Management */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl mb-8 text-charcoal">Gallery Images ({images.length})</h2>
              
              {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="w-12 h-12 border-4 border-warm-sage border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {images.map((image) => (
                    <div key={image.id} className="bg-soft-gray rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-2xl mb-2 text-charcoal">{image.title}</h3>
                        <p className="font-sans text-sm text-warm-gray mb-3">{image.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-sans text-xs uppercase tracking-wider text-warm-sage">{image.category}</span>
                          <Button
                            onClick={() => handleDelete(image.id)}
                            variant="destructive"
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white font-sans text-xs"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;