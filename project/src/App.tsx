import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import Services from './components/Services';
import Menu from './components/Menu';
import GalleryPreview from './components/gallery/GalleryPreview';
import FullGallery from './components/gallery/FullGallery';
import Contact from './components/Contact';
import Reviews from './components/reviews/Reviews';
import ReviewForm from './components/reviews/ReviewForm';
import ReservationForm from './components/reservation/ReservationForm';
import ActionButtons from './components/home/ActionButtons';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ActionButtons />
                <Services />
                <GalleryPreview />
                <Reviews />
                <Contact />
              </>
            } />
            <Route path="/discover" element={<Services />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<FullGallery />} />
            <Route path="/gallery/:category" element={<FullGallery />} />
            <Route path="/reviews" element={
              <>
                <Reviews />
                <ReviewForm />
              </>
            } />
            <Route path="/reservations" element={<ReservationForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;