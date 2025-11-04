import React from 'react';
import { motion } from 'framer-motion';

const QuoteWidget = () => {
  const quotes = [
    {
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain"
    },
    {
      text: "It's not that I'm so smart, it's just that I stay with problems longer.",
      author: "Albert Einstein"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney"
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson"
    }
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white"
    >
      <blockquote className="text-lg italic mb-3">
        "{randomQuote.text}"
      </blockquote>
      <cite className="text-sm opacity-90">— {randomQuote.author}</cite>
    </motion.div>
  );
};

export default QuoteWidget;