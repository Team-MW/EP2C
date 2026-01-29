import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md bg-white mb-4 last:mb-0">
            <button
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-gray-800 text-lg pr-4">{question}</span>
                {isOpen ? (
                    <ChevronUp className="text-[#1044A9] shrink-0" size={20} />
                ) : (
                    <ChevronDown className="text-gray-400 shrink-0" size={20} />
                )}
            </button>
            <div
                className={`transition-all duration-300 ease-in-out text-gray-600 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 p-5 pt-0 border-t border-gray-100' : 'max-h-0 opacity-0'
                    }`}
            >
                {answer}
            </div>
        </div>
    );
}
