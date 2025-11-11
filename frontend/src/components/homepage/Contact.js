import React from 'react';

export default function Contact() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="px-4 md:px-10 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl lg:text-[50px] font-semibold text-primaryText font-playfair mb-6">
              Contact <span className="text-primary">Alphagen</span>
            </h2>
            <p className="text-gray-500 max-w-[520px] text-start text-lg font-medium mb-8">
              If you have any questions, please feel free to contact us by filling up the form. We will get back to you as soon as possible
            </p>
            <div className="flex items-center justify-start gap-4">
              <button className="bg-white text-primaryText px-8 py-3 rounded-full text-base font-medium mb-8 border-2 border-primaryText">
                Book a demo
              </button>
              <button className="bg-primary text-white px-8 py-3 rounded-full text-base hover:bg-blue-700 font-medium mb-8">
                Get Started
              </button>
            </div>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <span className="bg-primary rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-white w-7 h-7"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M22 8.98V18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10.1c-.06.32-.1.66-.1 1 0 1.48.65 2.79 1.67 3.71L12 11 4 6v2l8 5 5.3-3.32c.54.2 1.1.32 1.7.32 1.13 0 2.16-.39 3-1.02zM16 5c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path>
                  </svg>
                </span>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-base font-semibold text-gray-500">Email us:</span>
                  <span className="text-lg font-semibold text-primaryText">alphagen@help.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-primary rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-white w-6 h-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                  </svg>
                </span>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-base font-semibold text-gray-500">Call us:</span>
                  <span className="text-lg font-semibold text-primaryText">01002100500</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-primary rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 384 512"
                    className="text-white w-6 h-6"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path>
                  </svg>
                </span>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-base font-semibold text-gray-500">Headquarters:</span>
                  <span className="text-lg font-semibold text-primaryText">1102/53 Old street, London UK </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-2xl py-8 px-10">
            <h2 className="text-2xl font-semibold text-primaryText text-start mb-2">Contact Us</h2>
            <p className="text-gray-500 max-w-[520px] text-start font-medium text-base mb-8">
              If you have any questions, please feel free to contact us by filling up the form. We will get back to you as soon as possible
            </p>
            <div className="h-px w-full bg-gray-300 rounded-full mb-8"></div>
            <form className="space-y-5">
              <div>
                <label className="block text-base font-semibold text-primaryText mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 text-base text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  name="email"
                  defaultValue=""
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-primaryText mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 text-base text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  name="name"
                  defaultValue=""
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-primaryText mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="resize-none w-full px-4 py-3 text-base text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  required
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                  name="agree"
                />
                <label htmlFor="agree" className="text-base text-primaryText">
                  I agree to the <span className="font-semibold">terms &amp; conditions</span>
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-lg text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}