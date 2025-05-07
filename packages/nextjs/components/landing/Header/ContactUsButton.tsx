import { PhoneCall } from "lucide-react";

const ContactUsButton = () => {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#202634] text-white font-semibold hover:bg-[#202634]/80 transition-colors">
      <span className="inline-block" aria-label="call">
        <PhoneCall size={18} className="text-white" />
      </span>
      <span className="text-sm md:text-base">Contact Us</span>
    </button>
  );
};

export default ContactUsButton;
