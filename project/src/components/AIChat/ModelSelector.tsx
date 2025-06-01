import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Zap } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

const models = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    icon: Sparkles,
    description: 'Most capable model for complex tasks',
    color: 'blue'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5',
    icon: Zap,
    description: 'Fast and efficient for general queries',
    color: 'green'
  },
  {
    id: 'legal-assistant',
    name: 'Legal Assistant',
    icon: Bot,
    description: 'Specialized for legal consultation',
    color: 'purple'
  }
];

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {models.map((model) => (
        <motion.button
          key={model.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModelSelect(model.id)}
          className={`p-4 rounded-xl border transition-all ${
            selectedModel === model.id
              ? `bg-${model.color}-50 border-${model.color}-200`
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-${model.color}-100`}>
              <model.icon className={`w-5 h-5 text-${model.color}-600`} />
            </div>
            <span className="font-medium">{model.name}</span>
          </div>
          <p className="text-sm text-gray-600">{model.description}</p>
        </motion.button>
      ))}
    </div>
  );
};

export default ModelSelector;