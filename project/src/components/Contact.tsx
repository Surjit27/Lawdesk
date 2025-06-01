import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="bg-gray-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-8">
              Schedule a consultation with our experienced lawyers to discuss your legal matters.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Our Office</h3>
                  <p className="text-gray-400">123 Legal Avenue, Bangalore</p>
                  <p className="text-gray-400">Karnataka, India 560001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Working Hours</h3>
                  <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-400">Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-400">+91 987-654-3210</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-400">contact@dharmalaw.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-gray-800 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-800 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Your message"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;