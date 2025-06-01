import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Briefcase, Globe } from 'lucide-react';

const stats = [
  {
    icon: Award,
    value: '25+',
    label: 'Years of Excellence',
  },
  {
    icon: Users,
    value: '1000+',
    label: 'Satisfied Clients',
  },
  {
    icon: Briefcase,
    value: '95%',
    label: 'Success Rate',
  },
  {
    icon: Globe,
    value: '50+',
    label: 'Global Partners',
  },
];

const Stats = () => {
  return (
    <section className="py-20 bg-green-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center text-white"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4" />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className="text-4xl font-bold mb-2"
              >
                {stat.value}
              </motion.div>
              <p className="text-green-100">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;