import React from "react";

interface SpecCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SpecCard = ({ title, value, icon, className = "", onClick }: SpecCardProps) => (
  <div 
    className={`bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all ${className}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  </div>
); 