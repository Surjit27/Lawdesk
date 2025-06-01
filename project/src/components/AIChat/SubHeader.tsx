import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Zap, Settings, Download, Trash2 } from 'lucide-react';

interface SubHeaderProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
  onClearChat: () => void;
}

const models = [
  { id: 'gpt-4', name: 'GPT-4', icon: Sparkles },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5', icon: Zap },
  { id: 'legal-assistant', name: 'Legal Assistant', icon: Bot }
];

const SubHeader: React.FC<SubHeaderProps> = ({ selectedModel, onModelSelect, onClearChat }) => {
  return (
    <div className="sticky top-16 z-10 bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {models.map((model) => (
            <motion.button
              key={model.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onModelSelect(model.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                selectedModel === model.id
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <model.icon className="w-4 h-4" />
              {model.name}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <Download className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClearChat}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;