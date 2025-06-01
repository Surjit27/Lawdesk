import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Briefcase, Scale, Users, FileText, Gavel } from 'lucide-react';

const practices = [
  {
    icon: Building2,
    title: 'Corporate Law',
    description: 'Expert guidance in business formations, mergers, and acquisitions.'
  },
  {
    icon: Scale,
    title: 'Civil Litigation',
    description: 'Representing clients in various civil disputes and proceedings.'
  },
  {
    icon: Briefcase,
    title: 'Commercial Law',
    description: 'Handling complex commercial transactions and contracts.'
  },
  {
    icon: Users,
    title: 'Family Law',
    description: 'Sensitive handling of divorce, custody, and family matters.'
  },
  {
    icon: FileText,
    title: 'Real Estate',
    description: 'Complete legal services for property transactions.'
  },
  {
    icon: Gavel,
    title: 'Criminal Law',
    description: 'Strong defense in criminal proceedings and investigations.'
  }
];

const PracticeAreas = () => {
  return (
    <section id="practice-areas" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Practice Areas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive legal services across multiple domains with expertise and dedication.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practices.map((practice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <practice.icon className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{practice.title}</h3>
              <p className="text-gray-600">{practice.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;