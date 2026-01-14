import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Upload, Trash2, LogOut, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCheckAuth, mockLogout, mockGetGallery, mockAddGalleryImage, mockDeleteGalleryImage } from '../mock';
import { 
  sanitizeText, 
  sanitizeFilename, 
  isValidImageType, 
  isValidFileSize,
  sanitizeFormData 
} from '../utils/security';

const ITEMS_PER_PAGE = 6;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
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
    const { name, value } = e.target;
    // Sanitize input to prevent XSS
    const sanitizedValue = sanitizeText(value);
    setFormData({ ...formData, [name]: sanitizedValue });
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!isValidImageType(file)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload only JPG, PNG, WEBP, or GIF images',
        variant: 'destructive'
      });
      return;
    }
    
    // Validate file size (max 10MB)
    if (!isValidFileSize(file, 10)) {
      toast({
        title: 'File Too Large',
        description: 'Maximum file size is 10MB',
        variant: 'destructive'
      });
      return;
    }
    
    // Sanitize filename
    const sanitizedFilename = sanitizeFilename(file.name);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!formData.imageUrl) {
      toast({
        title: 'Error',
        description: 'Please upload an image',
        variant: 'destructive'
      });
      return;
    }
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: 'Error',
        description: 'Title and description are required',
        variant: 'destructive'
      });
      return;
    }
    
    setUploading(true);
    try {
      // Sanitize all form data before submission
      const sanitizedData = sanitizeFormData(formData);
      
      await mockAddGalleryImage(sanitizedData);
      toast({
        title: 'Success!',
        description: 'Image added to gallery'
      });
      setFormData({ title: '', description: '', category: 'suits', imageUrl: '' });
      await loadGallery();
      setCurrentPage(1); // Reset to first page after adding
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
      
      // Adjust current page if needed
      const totalPages = Math.ceil((images.length - 1) / ITEMS_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(Math.max(1, totalPages));
      }
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
  
  // Pagination logic
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentImages = images.slice(startIndex, endIndex);
  
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  if (!user) return null;
  
  return (
    <div  className="min-h-screen bg-white">
      {/* Header */}
      <div  className="bg-black text-white py-6 px-6 shadow-lg">
        <div  className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1  className="font-serif text-3xl mb-1">Admin Dashboard</h1>
            <p  className="font-sans text-sm text-gray-400">Sandhora Tailor Gallery Management</p>
          </div>
          <div  className="flex items-center gap-6">
            <div  className="text-right">
              <p  className="font-sans text-sm font-medium">{sanitizeText(user.name)}</p>
              <p  className="font-sans text-xs text-gray-400">{sanitizeText(user.email)}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
               className="border-white text-white hover:bg-white hover:text-black font-sans text-sm"
            >
              <LogOut  className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      <div  className="max-w-7xl mx-auto px-6 py-12">
        <div  className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div  className="lg:col-span-1">
            <motion.div
               className="bg-gray-100 p-8 rounded-lg border-2 border-black sticky top-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2  className="font-serif text-3xl mb-6 text-black">Add New Image</h2>
              
              <form onSubmit={handleSubmit}  className="space-y-6">
                <div>
                  <label  className="font-sans text-sm font-medium text-black mb-2 block uppercase tracking-wide">
                    Title
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    maxLength={100}
                     className="bg-white border-2 border-gray-300 focus:border-black font-sans"
                    placeholder="Image title"
                  />
                </div>
                
                <div>
                  <label  className="font-sans text-sm font-medium text-black mb-2 block uppercase tracking-wide">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    rows={3}
                     className="bg-white border-2 border-gray-300 focus:border-black font-sans resize-none"
                    placeholder="Brief description"
                  />
                </div>
                
                <div>
                  <label  className="font-sans text-sm font-medium text-black mb-2 block uppercase tracking-wide">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                     className="w-full bg-white border-2 border-gray-300 rounded-md px-3 py-2 font-sans focus:outline-none focus:border-black"
                  >
                    <option value="suits">Suits</option>
                    <option value="formal">Formal</option>
                    <option value="traditional">Traditional</option>
                    <option value="business">Business</option>
                    <option value="casual">Casual</option>
                  </select>
                </div>
                
                <div>
                  <label  className="font-sans text-sm font-medium text-black mb-2 block uppercase tracking-wide">
                    Image Upload (Max 10MB)
                  </label>
                  <div  className="relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleImageUpload}
                       className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                       className="flex items-center justify-center gap-2 w-full bg-white border-2 border-dashed border-gray-400 hover:border-black rounded-md py-8 cursor-pointer transition-colors duration-300"
                    >
                      {formData.imageUrl ? (
                        <div  className="text-center">
                          <ImageIcon  className="w-8 h-8 text-black mx-auto mb-2" />
                          <span  className="font-sans text-sm text-black">Image Selected</span>
                        </div>
                      ) : (
                        <div  className="text-center">
                          <Upload  className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                          <span  className="font-sans text-sm text-gray-600">Click to upload</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={uploading}
                   className="w-full bg-black hover:bg-gray-800 text-white font-sans font-medium text-base tracking-wider py-6 rounded transition-all duration-300 hover:shadow-xl"
                >
                  {uploading ? (
                    <span  className="flex items-center justify-center gap-2">
                      <div  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      UPLOADING...
                    </span>
                  ) : (
                    'ADD TO GALLERY'
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
          
          {/* Gallery Management with Pagination */}
          <div  className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div  className="flex justify-between items-center mb-8">
                <h2  className="font-serif text-4xl text-black">Gallery Images ({images.length})</h2>
                
                {/* Pagination Info */}
                {totalPages > 1 && (
                  <div  className="font-sans text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                )}
              </div>
              
              {loading ? (
                <div  className="flex justify-center items-center min-h-[400px]">
                  <div  className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  <div  className="grid sm:grid-cols-2 gap-6 mb-8">
                    {currentImages.map((image) => (
                      <div key={image.id}  className="bg-gray-100 rounded-lg overflow-hidden border-2 border-black shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div  className="aspect-[4/3] overflow-hidden">
                          <img
                            src={image.imageUrl}
                            alt={sanitizeText(image.title)}
                             className="w-full h-full object-cover"
                          />
                        </div>
                        <div  className="p-6">
                          <h3  className="font-serif text-2xl mb-2 text-black">{sanitizeText(image.title)}</h3>
                          <p  className="font-sans text-sm text-gray-600 mb-3">{sanitizeText(image.description)}</p>
                          <div  className="flex justify-between items-center">
                            <span  className="font-sans text-xs uppercase tracking-wider text-black font-medium">{image.category}</span>
                            <Button
                              onClick={() => handleDelete(image.id)}
                              variant="destructive"
                              size="sm"
                               className="bg-red-600 hover:bg-red-700 text-white font-sans text-xs"
                            >
                              <Trash2  className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div  className="flex justify-center items-center gap-4 mt-8">
                      <Button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                         className="border-2 border-black text-black hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft  className="w-5 h-5" />
                      </Button>
                      
                      <div  className="flex gap-2">
                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          // Show only relevant page numbers
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <Button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`w-10 h-10 font-sans font-medium ${
                                  currentPage === page
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-black hover:bg-gray-200'
                                }`}
                              >
                                {page}
                              </Button>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return <span key={page}  className="flex items-center">...</span>;
                          }
                          return null;
                        })}
                      </div>
                      
                      <Button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                         className="border-2 border-black text-black hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronRight  className="w-5 h-5" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
