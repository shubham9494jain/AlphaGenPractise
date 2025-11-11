import React from 'react';

export default function Features() {
  return (
    <section className="py-20 bg-primary-bg">
      <div className="px-4 md:px-10 lg:px-14">
        <div className="text-center mb-12 flex flex-col items-center justify-center">
          <h2 className="text-4xl lg:text-[50px] font-semibold text-primaryText mb-6 font-playfair">
            Powerful Financial <span className="text-primary">Intelligence</span>
          </h2>
          <p className="text-placeholderText text-sm mb-8 max-w-[712px]">
            Transform how you interact with financial data
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-start p-5">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="w-6 h-6 text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"></path>
                </svg>
              </span>
            </div>
            <h3 className="text-xl font-semibold text-primaryText mb-2">Automated Fund Analysis</h3>
            <p className="text-placeholderText text-sm">
              AI-powered analysis of fund performance, risk metrics, and investment patterns.
            </p>
            <button className="text-primary hover:text-blue-700 hover:scale-110 transition-all duration-100 mt-4 flex items-center gap-2 text-sm font-medium">
              Book a Demo <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right w-4 h-4"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-start p-5">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 576 512"
                  className="w-6 h-6 text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M88.7 223.8L0 375.8 0 96C0 60.7 28.7 32 64 32l117.5 0c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7L416 96c35.3 0 64 28.7 64 64l0 32-336 0c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224l400 0c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480L32 480c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"></path>
                </svg>
              </span>
            </div>
            <h3 className="text-xl font-semibold text-primaryText mb-2">Foster-level Intelligence</h3>
            <p className="text-placeholderText text-sm">Deep insights into market trends and investment opportunities.</p>
            <button className="text-primary hover:text-blue-700 hover:scale-110 transition-all duration-100 mt-4 flex items-center gap-2 text-sm font-medium">
              Book a Demo <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right w-4 h-4"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-start p-5">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
                </svg>
              </span>
            </div>
            <h3 className="text-xl font-semibold text-primaryText mb-2">Secure &amp; Private</h3>
            <p className="text-placeholderText text-sm">
              Bank-level security with encrypted data processing and storage.
            </p>
            <button className="text-primary hover:text-blue-700 hover:scale-110 transition-all duration-100 mt-4 flex items-center gap-2 text-sm font-medium">
              Book a Demo <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right w-4 h-4"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-start p-5">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a3.12 3.12 0 0 0-3.12 3.12V8.25a3.12 3.12 0 0 0 6.24 0V5.12A3.12 3.12 0 0 0 12 2z"></path><path d="M12 13a3.12 3.12 0 0 0-3.12 3.12V19.5a3.12 3.12 0 0 0 6.24 0v-3.38A3.12 3.12 0 0 0 12 13z"></path><path d="M20.88 8.25a3.12 3.12 0 0 0-3.12-3.12h-1.5a3.12 3.12 0 0 0-3.12 3.12V13a3.12 3.12 0 0 0 3.12 3.12h1.5a3.12 3.12 0 0 0 3.12-3.12z"></path><path d="M3.12 8.25a3.12 3.12 0 0 1 3.12-3.12h1.5a3.12 3.12 0 0 1 3.12 3.12V13a3.12 3.12 0 0 1-3.12 3.12h-1.5a3.12 3.12 0 0 1-3.12-3.12z"></path></svg>
              </span>
            </div>
            <h3 className="text-xl font-semibold text-primaryText mb-2">AI-powered Understanding</h3>
            <p className="text-placeholderText text-sm">
              Advanced natural language processing for document analysis.
            </p>
            <button className="text-primary hover:text-blue-700 hover:scale-110 transition-all duration-100 mt-4 flex items-center gap-2 text-sm font-medium">
              Book a Demo <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right w-4 h-4"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}