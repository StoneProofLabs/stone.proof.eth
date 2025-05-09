import React, { useState } from "react";

const FAQ_ITEMS = [
  {
    id: 1,
    question: "What is StoneProof?",
    answer:
      "StoneProof is a platform designed to bring transparency and traceability to the mineral supply chain, ensuring every step is verifiable and trustworthy.",
  },
  {
    id: 2,
    question: "How do I get started?",
    answer:
      "Simply sign up on our platform, complete your profile, and follow the onboarding steps to start tracking your minerals or verifying supply chain data.",
  },
  {
    id: 3,
    question: "Is my data secure?",
    answer:
      "Yes, we use industry-standard encryption and best practices to ensure your data is safe and only accessible to authorized parties.",
  },
  {
    id: 4,
    question: "Can I invite my team?",
    answer:
      "Absolutely! You can invite team members from your dashboard and assign them roles and permissions as needed.",
  },
  {
    id: 5,
    question: "What support is available?",
    answer:
      "Our support team is available 24/7 via chat and email. We also have a comprehensive help center and community forum.",
  },
  {
    id: 6,
    question: "How often is the FAQ updated?",
    answer:
      "We regularly update our FAQ based on user feedback and new features. Check back often for the latest information.",
  },
];

interface FaqItemProps {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ id, question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-[#23262F] rounded-xl bg-[#060910] h-fit">
      <button className="w-full flex items-center justify-between p-5 focus:outline-none" onClick={() => onToggle(id)}>
        <span className="text-white font-medium text-lg text-left">{question}</span>
        <svg
          className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 text-gray-400 text-base">{answer}</div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#10131A] to-[#0A0F1B] py-16 px-4 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Frequently Asked Questions</h2>
      <p className="text-gray-300 text-center max-w-2xl mb-12 text-base md:text-lg">
        Our FAQ area is the best place to look to find answers to your questions. Our community and support team
        constantly updates the questions and answers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl auto-rows-min">
        {FAQ_ITEMS.map(item => (
          <FaqItem
            key={item.id}
            id={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={openId === item.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default Faq;
