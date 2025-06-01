import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, FileText } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Client Meeting',
    type: 'meeting',
    icon: Users,
    color: 'text-blue-500',
    date: 'Today',
    time: '2:00 PM'
  },
  {
    id: 2,
    title: 'Court Hearing',
    type: 'hearing',
    icon: Calendar,
    color: 'text-green-500',
    date: 'Tomorrow',
    time: '10:00 AM'
  },
  {
    id: 3,
    title: 'Document Deadline',
    type: 'deadline',
    icon: FileText,
    color: 'text-yellow-500',
    date: 'Sep 25',
    time: '5:00 PM'
  },
  {
    id: 4,
    title: 'Case Review',
    type: 'review',
    icon: Clock,
    color: 'text-purple-500',
    date: 'Sep 26',
    time: '11:00 AM'
  }
];

const UpcomingTasks = () => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: task.id * 0.1 }}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className={`p-2 rounded-lg bg-gray-50 ${task.color}`}>
            <task.icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{task.title}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{task.date}</span>
              <span>•</span>
              <span>{task.time}</span>
            </div>
          </div>
          <button className="text-xs text-green-500 hover:text-green-600 font-medium">
            View
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default UpcomingTasks;