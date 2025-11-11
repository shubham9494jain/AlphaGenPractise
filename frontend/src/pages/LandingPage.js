import React from 'react';
import Hero from '../components/homepage/Hero';
import Features from '../components/homepage/Features';
import Process from '../components/homepage/Process';
import Testimonials from '../components/homepage/Testimonials';
import About from '../components/homepage/About';
import Pricing from '../components/homepage/Pricing';
import FAQ from '../components/homepage/FAQ';
import Contact from '../components/homepage/Contact';
import Footer from '../components/homepage/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Process />
      <Testimonials />
      <About />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
