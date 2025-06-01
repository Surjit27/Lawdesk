import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Rajesh Kumar',
    role: 'Senior Partner',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
    expertise: 'Corporate Law',
    linkedin: '#',
    email: 'rajesh@dharmalaw.com',
  },
  {
    name: 'Priya Sharma',
    role: 'Managing Partner',
    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=400&h=400',
    expertise: 'Civil Litigation',
    linkedin: '#',
    email: 'priya@dharmalaw.com',
  },
  {
    name: 'Arun Patel',
    role: 'Senior Associate',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400&h=400',
    expertise: 'Criminal Law',
    linkedin: '#',
    email: 'arun@dharmalaw.com',
  },
];

const Team = () => {
  return (
    <section id="our-team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Legal Experts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our team of experienced attorneys dedicated to providing exceptional legal services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-96 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex justify-center space-x-4">
                      <motion.a
                        href={member.linkedin}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white p-2 rounded-full text-gray-800 hover:bg-green-500 hover:text-white transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={`mailto:${member.email}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white p-2 rounded-full text-gray-800 hover:bg-green-500 hover:text-white transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-green-500 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-1">{member.expertise}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;