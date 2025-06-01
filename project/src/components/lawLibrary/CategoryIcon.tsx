import React from 'react';
import { Landmark, Gavel, Scale, ScrollText, FileText, Users, MapPin } from 'lucide-react';

const iconMap = {
  Landmark,
  Gavel,
  Scale,
  ScrollText,
  FileText,
  Users,
  MapPin,
};

interface CategoryIconProps {
  iconName: string;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ iconName, className = "w-5 h-5" }) => {
  const Icon = iconMap[iconName as keyof typeof iconMap];
  
  if (!Icon) {
    return null;
  }

  return <Icon className={className} />;
};

export default CategoryIcon;