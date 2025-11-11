import React from 'react';

export default function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="px-4 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-[50px] font-semibold text-primaryText mb-4 font-playfair">
            Plans That <span className="text-primary">Make Cents</span>
          </h2>
          <p className="text-gray-500 max-w-[712px] mx-auto">
            Whether you're just browsing one fund or managing a full portfolio, we’ve got a plan that fits your workflow—and your wallet
          </p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white text-primaryText border-2 border-gray-200">
            <div className="text-start mb-8">
              <h3 className="text-lg font-semibold mb-2">Basic</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$10</span>
                <span className="text-lg font-medium text-gray-500">/per month</span>
              </div>
              <p className="text-base font-medium text-gray-600">
                Perfect for individual investors and small portfolios
              </p>
            </div>
            <ul className="space-y-3 mb-8 text-base">
              <li className="flex items-center">
                <span className="mr-3 text-primary">✓</span>Feature 1
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-primary">✓</span>Feature 2
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-primary">✓</span>Feature 3
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-primary">✓</span>Feature 4
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-primary">✓</span>Feature 5
              </li>
            </ul>
            <button className="w-full py-3 text-base rounded-lg font-semibold bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors">
              Get Started
            </button>
          </div>
          <div className="rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-primary text-white shadow-2xl lg:scale-105">
            <div className="text-start mb-8">
              <div className="flex justify-between items-center gap-2 w-full">
                <h3 className="text-lg font-semibold mb-2">Premium</h3>
                <h3 className="text-sm font-semibold mb-2 bg-white text-primary px-3 py-1 rounded-full">
                  Most Popular
                </h3>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">$50</span>
                <span className="text-lg font-medium opacity-75">/per month</span>
              </div>
              <p className="text-base font-medium text-blue-100">
                Ideal for professional investors and fund managers
              </p>
            </div>
            <ul className="space-y-3 mb-8 text-base">
              <li className="flex items-center">
                <span className="mr-3 text-blue-200">✓</span>Feature 1
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-200">✓</span>Feature 2
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-200">✓</span>Feature 3
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-200">✓</span>Feature 4
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-blue-200">✓</span>Feature 5
              </li>
            </ul>
            <button className="w-full py-3 text-base rounded-lg font-semibold bg-white text-primary hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
          <div className="rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white text-primaryText border-2 border-gray-200">
            <div className="text-start mb-8">
              <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$200</span>
                <span className="text-lg font-medium text-gray-500">/per month</span>
              </div>
              <p className="text-base font-medium text-gray-600">
                Comprehensive solution for large investment firms
              </p>
            </div>
            <ul className="space-y-3 mb-8 text-base">
              <li className="flex items-center">
                <span className="mr-3 text-primary">✓</span>Feature 1
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-primary">✓</span>Feature 2
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-primary">✓</span>Feature 3
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-primary">✓</span>Feature 4
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-primary">✓</span>Feature 5
              </li>
            </ul>
            <button className="w-full py-3 text-base rounded-lg font-semibold bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}