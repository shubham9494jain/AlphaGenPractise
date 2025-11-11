import React from 'react';

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="px-4 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-[50px] font-semibold font-playfair text-primaryText mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-[712px] mx-auto">Got questions? We’ve got smart answers.</p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              [
                'What types of documents can I upload to Alphagen?',
                'You can upload annual reports, financial statements, pitch decks, LP agreements, deal memos, and more. We support PDF, DOCX, and TXT formats.',
              ],
              [
                'How does Alphagen analyze my documents?',
                'Our AI uses advanced natural language processing and machine learning algorithms to extract key financial metrics, trends, and insights from your documents.',
              ],
              [
                'What formats are supported for document uploads?',
                'You can upload various financial documents including PDFs, Excel files, Word documents, and other standard formats.',
              ],
              [
                'Can Alphagen handle complex financial documents?',
                'Yes, our proprietary AI engine processes your documents using advanced algorithms to identify patterns, extract insights, and generate actionable recommendations.',
              ],
              [
                'Is my data secure with Alphagen?',
                'We prioritize security and use state-of-the-art encryption and data protection measures to ensure your information is safe.',
              ],
              [
                'How can I get support if I have issues?',
                'You can reach out to our support team via email or through our help center for assistance with any issues you encounter.',
              ],
            ].map(([q, a], i) => (
              <div key={i}>
                <div className="bg-gray-100 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-primary mr-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.97 8.265a1.45 1.45 0 0 0-.487.57.75.75 0 0 1-1.341-.67c.2-.402.513-.826.997-1.148C10.627 6.69 11.244 6.5 12 6.5c.658 0 1.369.195 1.934.619a2.45 2.45 0 0 1 1.004 2.006c0 1.033-.513 1.72-1.027 2.215-.19.183-.399.358-.579.508l-.147.123a4.329 4.329 0 0 0-.435.409v1.37a.75.75 0 1 1-1.5 0v-1.473c0-.237.067-.504.247-.736.22-.28.486-.517.718-.714l.183-.153.001-.001c.172-.143.324-.27.47-.412.368-.355.569-.676.569-1.136a.953.953 0 0 0-.404-.806C12.766 8.118 12.384 8 12 8c-.494 0-.814.121-1.03.265ZM13 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
                        <path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12Z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primaryText pr-4">{q}</h3>
                      <div className="mt-2 text-gray-600 text-base font-medium">{a}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}