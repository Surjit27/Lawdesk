import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Dharma & Associates provided exceptional legal counsel during our company's merger. Their expertise and professionalism were invaluable.",
    author: "Amit Shah",
    position: "CEO, Tech Innovations Ltd",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    quote: "Their attention to detail and strategic approach helped us navigate complex legal challenges with confidence.",
    author: "Meera Reddy",
    position: "Director, Global Ventures",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    quote: "The team's dedication to client success and their deep understanding of corporate law sets them apart.",
    author: "Rahul Kapoor",
    position: "Managing Director, Infinite Solutions",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Client Testimonials</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience working with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 p-8 rounded-lg relative"
            >
              <Quote className="w-12 h-12 text-green-500 mb-6" />
              <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.author}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;