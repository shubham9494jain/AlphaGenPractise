import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
        <div
          className="w-[280px] h-[80px] bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url('/loges/AlphaGenFooterLogo.png')" }}
        ></div>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-medium">
          <a href="/about/">About us</a>
          <a href="/privacy-policy/">Privacy policies</a>
          <a href="/terms-and-conditions/">Terms & conditions</a>
          <a href="/plans/">Subscription plans</a>
          <a href="/contact-us/">Contact us</a>
          <a href="/faq-page/">FAQs</a>
        </div>
        <div className="flex gap-4 mt-2">
          <button className="bg-white text-primaryText text-xs font-semibold px-6 py-2 rounded-full">
            Book a Demo
          </button>
          <button className="bg-primaryText text-white text-xs font-semibold px-6 py-2 rounded-full">
            Get Started
          </button>
        </div>
        <p className="text-xs text-blue-100 mt-6 text-center">
          All copyrights are reserved to Alphagensystems.com
        </p>
      </div>
    </footer>
  );
}