import React from 'react';
import { motion } from 'framer-motion';
import { Scale, BookOpen, ArrowRight } from 'lucide-react';

const Recommendations = () => {
  return (
    <div className="h-full p-6 overflow-y-auto bg-gray-50">
      <div className="space-y-6">
        {/* Legal Experts */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">RECOMMENDED EXPERTS</h3>
          <div className="space-y-4">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Corporate Law Specialist',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100',
                rating: 4.9,
              },
              {
                name: 'Priya Sharma',
                role: 'Civil Rights Attorney',
                image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=100&h=100',
                rating: 4.8,
              },
            ].map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{expert.name}</h4>
                  <p className="text-sm text-gray-600">{expert.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Scale className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600">{expert.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">RELATED ARTICLES</h3>
          <div className="space-y-4">
            {[
              {
                title: 'Understanding Corporate Law Basics',
                category: 'Corporate Law',
                readTime: '5 min read',
              },
              {
                title: 'Legal Documentation Guide',
                category: 'Legal Resources',
                readTime: '8 min read',
              },
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="p-4 bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{article.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;