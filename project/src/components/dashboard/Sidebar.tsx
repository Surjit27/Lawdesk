import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Settings, FileText, Bell, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const sidebarLinks = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const { user } = useAuthStore();

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-1/4 bg-white border-r border-gray-200 flex flex-col"
    >
      <div className="p-6 text-center border-b">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-green-50 shadow-lg">
            {user?.profileImage ? (
              <img 
                src={user.profileImage}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-green-100 flex items-center justify-center">
                <User className="w-12 h-12 text-green-600" />
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <h2 className="text-lg font-semibold">{user?.name}</h2>
        <p className="text-sm text-gray-500 capitalize">{user?.type}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarLinks.map((link, index) => (
            <motion.li
              key={link.path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-green-500 transition-colors"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;