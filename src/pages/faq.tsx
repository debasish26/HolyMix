import { useState } from "react";

import { Search } from 'lucide-react';


const faqs = [
    {
        question: "Is it legal to watch anime on HolyMix?",
        answer: "Absolutely, watching anime on HolyMix is completely legal. We do not host any anime content directly on our platform. Instead, we provide links to third-party sources that host the anime. This ensures that users can access their favorite anime without any legal concerns. However, we always encourage our users to support official streaming services whenever possible to help the anime industry grow.",
      },
      {
        question: "About the ads",
        answer: "Ads are necessary to support our platform and keep it running. Since we provide free access to a vast collection of anime, advertisements help us cover server costs and maintenance expenses. However, we understand that some ads may be inappropriate or extreme. If you come across any such ads, please report them by sending an email to our support team with details and a screenshot. We strive to create a user-friendly experience and will take appropriate action against any unsuitable advertisements.",
      },
      {
        question: "I can't find my favorite anime, what can I do?",
        answer: "Our database is one of the largest in the world, but there may still be some anime missing. If you cannot find your favorite anime on our platform, we encourage you to use our request form. Simply submit the name of the anime along with any additional details, and our team will do its best to make it available as soon as possible. We continuously update our library to ensure a diverse and extensive selection for our users.",
      },
      {
        question: "Do you have a native iOS or Android app?",
        answer: "At this time, we do not have an official iOS or Android application. Any app claiming to be associated with HolyMix is unofficial and may not provide the same content or level of security. We strongly advise against downloading such apps as they could be unsafe or attempt to steal your data. For the best experience and secure browsing, we recommend using our official website through a trusted web browser on your device.",
      },
      {
        question: "📧 Contact Us:",
        answer: "We love hearing from our users! If you have any questions, feedback, or suggestions, please feel free to reach out to us via email at lou@animeisfirm.com. Our team is dedicated to providing prompt and helpful responses to all inquiries. Whether you need assistance with navigation, account-related concerns, or anime requests, we are here to help!",
      },
      {
        question: "🌟 Join Our Community:",
        answer: "Looking for a vibrant community of anime enthusiasts to connect with? Join our official Discord server, where you can engage in discussions, share your favorite anime moments, and make new friends who share your passion. Our community is filled with dedicated fans and helpful moderators to ensure a positive and fun experience for everyone. Click here to join: https://discord.gg/Vucu4TKMsE",
      },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-darkblue text-white min-h-screen px-4 py-20 md:px-16">
      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-red-500">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left text-lg font-semibold text-white flex justify-between items-center"
              >
                {faq.question}
                <span>{openIndex === index ? "-" : "+"}</span>
              </button>
              {openIndex === index && <p className="mt-2 text-gray-300">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
