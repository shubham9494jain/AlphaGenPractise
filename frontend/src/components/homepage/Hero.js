import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-77px)] flex justify-center items-center py-8 sm:py-12">
      <div className="px-4 md:px-10 lg:px-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center w-full">
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-4xl lg:text-[50px] font-semibold text-primaryText mb-4 sm:mb-6 font-playfair leading-[36px] xs:leading-[44px] sm:leading-[50px] md:leading-[70px]">
              Turn Complex Financial Documents Into <span className="text-primary">Actionable</span> <span className="text-primary">Insights</span>
            </h1>
            <p className="text-primaryText text-sm mb-6 sm:mb-8 max-w-[670px]">
              AI-powered analysis platform that extracts, summarizes, and visualizes fund data, so you never have to read 200-page reports again. All you have to do is upload financial reports, statements, and documents. Get instant AI-powered insights and answers to complex financial questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto lg:mx-0">
              <button className="text-primaryText px-8 py-3 rounded-full bg-bgSecondary font-semibold text-xs hover:shadow w-full sm:w-auto">
                Book a Demo
              </button>
              <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-blue-700 text-xs font-semibold w-full sm:w-auto">
                Get Started
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center items-center w-full mb-8 lg:mb-0">
            <div className="p-0 sm:p-4 lg:p-0 h-56 xs:h-72 sm:h-80 md:h-96 w-full flex items-center justify-center">
              <div
                className="w-full h-full rounded-lg flex items-center justify-center bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/HeroImage1.webp')",
                  backgroundSize: 'contain',
                  minHeight: '180px',
                  minWidth: '180px',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}