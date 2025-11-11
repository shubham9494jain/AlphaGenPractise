import React from 'react';

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="px-4 md:px-10 lg:px-14">
        <div className="text-center mb-16 max-w-[712px] mx-auto">
          <h2 className="text-4xl lg:text-[50px] font-semibold text-primaryText mb-4 font-playfair leading-[50px] md:leading-[70px]">
            What <span className="text-primary">Finance Professionals</span> Are Saying
          </h2>
          <p className="text-gray-500 max-w-[712px] mx-auto text-sm">
            Upload documents, pick your analysis, and get instant, AI-powered insights—complete with visuals and summaries
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button className="bg-primary hover:shadow text-sm text-white px-6 py-2 rounded-full">Get Started</button>
            <button className="bg-white hover:shadow text-sm text-primaryText px-6 py-2 rounded-full">Book a Demo</button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              role: 'Portfolio Manager',
              company: 'Investment Firm',
              testimonial:
                'Alphagen has transformed how we analyze financial documents. The AI insights are incredibly accurate.',
            },
            {
              role: 'Hedge Fund',
              company: 'Hedge Fund',
              testimonial: 'The time savings alone make this tool invaluable. What used to take hours now takes minutes.',
            },
            {
              role: 'Asset Management',
              company: 'Asset Management',
              testimonial:
                'Outstanding tool for financial analysis. The insights help us make better investment decisions.',
            },
            {
              role: 'Private Equity',
              company: 'Private Equity',
              testimonial:
                'Game-changing technology. The AI understands complex financial documents better than we expected.',
            },
          ].map(({ role, company, testimonial }, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 group"
            >
              <div className="flex items-center flex-col justify-center mb-4 gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 group-hover:scale-110 transition-all duration-300 ease-in-out"></div>
                <div>
                  <h4 className="font-semibold text-base text-primaryText text-center">{role}</h4>
                  <p className="text-sm text-gray-500 text-center">{company}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-center text-base font-medium">{testimonial}</p>
              <div className="flex justify-center items-center gap-2">
                {[0, 1, 2, 3, 4].map((s) => (
                  <svg
                    key={s}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 576 512"
                    className="text-yellow-400 hover:scale-125 transition-all duration-200 ease-in-out "
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}