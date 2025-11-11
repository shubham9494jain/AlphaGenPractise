import React from 'react';

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="px-4 md:px-10 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-[50px] font-semibold text-primaryText font-playfair mb-6">
              About <span className="text-primary">Alphagen</span>
            </h2>
            <p className="text-placeholderText mb-6 max-w-[670px]">
              Alphagen was built with a simple but powerful vision: to eliminate the manual, time-consuming work of digging through financial documents. We’re a team of AI engineers, financial analysts, and product designers passionate about empowering professionals with faster, smarter, and more reliable tools.
            </p>
            <p className="text-placeholderText mb-8 max-w-[670px]">
              Our platform leverages advanced AI agents to extract structured data, summarize key insights, and visualize fund performance—instantly. Whether you're analyzing a single fund or reviewing hundreds of pages of documents, Alphagen delivers clarity in seconds.
            </p>
            <p className="text-placeholderText mb-8 max-w-[670px]">
              We believe financial intelligence should be immediate, actionable, and effortless.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-white px-6 py-3 text-sm font-medium rounded-full hover:bg-blue-700">
                Book a Demo
              </button>
              <button className=" text-primaryText px-6 py-3 rounded-full text-sm font-medium bg-bgSecondary hover:shadow">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="p-6 h-96">
              <div
                className="w-full h-full flex items-center justify-center bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/alphagen-design.png')",
                  backgroundSize: 'contain',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}