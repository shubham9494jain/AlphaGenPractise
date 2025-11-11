import React from 'react';

export default function Process() {
  return (
    <section className="py-20 bg-white">
      <div className="px-4 md:px-10 lg:px-14">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-[50px] font-semibold text-primaryText mb-4 font-playfair">
            A <span className="text-primary">simple</span> process
          </h2>
          <p className="text-placeholderText max-w-2xl mx-auto text-sm">
            Upload documents, pick your analysis, and get instant, AI-powered insights—complete with visuals and summaries
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: 'Upload Documents',
              description: 'Upload your financial documents securely to our platform.',
            },
            {
              step: '02',
              title: 'AI Extracts Key Insights',
              description: 'Our AI analyzes and extracts meaningful insights from your documents.',
            },
            {
              step: '03',
              title: 'Structured Output',
              description: 'Get organized, actionable insights in an easy-to-understand format.',
            },
            {
              step: '04',
              title: 'Export or Collaborate',
              description: 'Share insights with your team or export for further analysis.',
            },
          ].map(({ step, title, description }) => (
            <div
              key={step}
              className="text-center bg-gray-100 rounded-lg p-6 flex flex-col items-start hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between w-full mb-4">
                <span className="text-gray-500 text-sm font-semibold">step</span>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-base font-semibold">{step}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primaryText mb-2 text-start">{title}</h3>
              <p className="text-gray-600 text-sm text-start">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}