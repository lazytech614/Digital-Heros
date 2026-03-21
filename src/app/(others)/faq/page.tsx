"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"; // make sure this path is correct
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do draws work?",
    answer: "Draws happen monthly based on your scores.",
  },
  {
    question: "Can I choose a charity?",
    answer: "Yes, you can select your preferred charity.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use industry-standard encryption to keep your data safe.",
  },
  {
    question: "How do I update my subscription?",
    answer: "You can manage your subscription from your profile settings.",
  },
];

export default function FAQsPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto min-h-screen mt-16">
      <h1 className="text-3xl font-bold mb-6">FAQs</h1>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <Collapsible key={index} className="border rounded-lg">
            <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-semibold hover:bg-gray-100">
              {faq.question}
              <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 text-gray-600 border-t">
              {faq.answer}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}