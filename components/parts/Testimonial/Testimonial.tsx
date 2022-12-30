import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import clsx from "clsx";
import { Testimonial as TestimonialType } from '@/lib/contentful';

import { Card } from "@/components/general";

export type TestimonialProps = TestimonialType & {
  className?: string;
};

export const Testimonial: React.FC<TestimonialProps> = ({ className, text, writtenByName, writtenByTitle, relatedJob }) => {
  return (
    <Card className={className}>
      <div className="p-16 bg-gray-200 dark:bg-gray-900">
        <div className="flex flex-center mb-12">
          <blockquote className="relative max-w-prose text-lg">
            <FaQuoteLeft
              className="w-[1.2em] absolute text-blue-400 dark:text-transparent dark:stroke-[0.2em] stroke-blue-300 dark:stroke-blue-900 text-9xl transform -translate-x-[100%] -translate-y-[0.3em] filter blur-sm"
            />
            <span className="relative z-10">{text}</span>
          </blockquote>
        </div>
        <div className="text-center">
          <span className="font-bold">{writtenByName}</span>
          <span className="font-bold inline-block mx-4 transform scale-175 text-blue-500">{' / '}</span>
          <span>{`${writtenByTitle}, ${relatedJob.companyName}`}</span>
        </div>
      </div>
    </Card>
  );
};