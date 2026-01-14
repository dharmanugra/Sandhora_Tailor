import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ZipperOpeningAnimation from "./components/ZipperOpeningAnimation";
import { Toaster } from "./components/ui/sonner";
import LandingPage from "./pages/LandingPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Check if animation has been shown in this session
    const hasSeenAnimation = sessionStorage.getItem('zipperAnimationShown');
    if (hasSeenAnimation) {
      setShowAnimation(false);
      setAnimationComplete(true);
    }
  }, []);
  
  const handleAnimationComplete = () => {
    sessionStorage.setItem('zipperAnimationShown', 'true');
    setAnimationComplete(true);
  };
  
  return (
    <div className="App">
      {showAnimation && !animationComplete && (
        <ZipperOpeningAnimation onComplete={handleAnimationComplete} />
      )}
      
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;