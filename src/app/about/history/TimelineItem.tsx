'use client';

import { useState } from 'react';
import { Building, Briefcase, Users, Calendar, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Badge {
  text: string;
  bgColor: string;
  textColor: string;
}

interface TimelineItem {
  title: string;
  date: string;
  content: {
    description: string;
  };
  badges?: Badge[];
  images?: string[];
  eventType: EventType;
  isLatest?: boolean;
}

type EventType = "Establishment" | "Partnership" | "Exhibition" | "Branch";

const eventIcons = {
  "Establishment": <Building className="w-3 h-3 text-blue-400" />,
  "Partnership": <Briefcase className="w-3 h-3 text-emerald-400" />,
  "Exhibition": <Users className="w-3 h-3 text-amber-400" />,
  "Branch": <Calendar className="w-3 h-3 text-purple-400" />,
};

const eventColors = {
  "Establishment": {
    icon: "bg-blue-500/30",
    border: "border-blue-500/30",
    badge: "bg-blue-500/20 text-blue-400",
    hover: "hover:bg-blue-500/40"
  },
  "Partnership": {
    icon: "bg-emerald-500/30",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-400",
    hover: "hover:bg-emerald-500/40"
  },
  "Exhibition": {
    icon: "bg-amber-500/30",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-400",
    hover: "hover:bg-amber-500/40"
  },
  "Branch": {
    icon: "bg-purple-500/30",
    border: "border-purple-500/30",
    badge: "bg-purple-500/20 text-purple-400",
    hover: "hover:bg-purple-500/40"
  }
};

export default function TimelineItemComponent({ item, index }: { item: TimelineItem, index: number }) {
  const [expanded, setExpanded] = useState(false);
  const colorSet = eventColors[item.eventType];
  
  const toggleExpanded = () => setExpanded(!expanded);
  
  return (
    <motion.li 
      className={`mb-10 ms-6 relative ${
        item.isLatest ? 'after:content-["Latest"] after:absolute after:top-0 after:-right-16 after:text-xs after:font-medium after:bg-blue-500 after:text-white after:py-0.5 after:px-2 after:rounded-full' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Icon */}
      <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-gray-900 ${colorSet.icon}`}>
        {eventIcons[item.eventType]}
      </span>

      {/* Card */}
      <div className={`bg-gray-900/30 backdrop-blur-sm p-4 rounded-lg border ${colorSet.border} shadow-md transition-all ${expanded ? 'shadow-lg' : ''} ${colorSet.hover}`}>
        {/* Header section */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Title and badges */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${colorSet.badge}`}>
                {item.eventType}
              </span>
              {item.badges?.map((badge, badgeIndex) => (
                <span
                  key={badgeIndex}
                  className={`text-xs font-medium px-2 py-0.5 rounded ${badge.bgColor} ${badge.textColor}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
            
            {/* Date */}
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
              {item.date}
            </time>
          </div>
          
          {/* Expand button */}
          <button 
            onClick={toggleExpanded}
            className="p-1.5 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            {expanded ? 
              <ChevronUp className="w-4 h-4" /> : 
              <ChevronDown className="w-4 h-4" />
            }
          </button>
        </div>
        
        {/* Description section */}
        <div className={`mt-2 ${expanded ? 'block' : 'line-clamp-2'} text-sm text-gray-300`}>
          {item.content.description}
        </div>
        
        {/* Expanded section */}
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            {/* Related links */}
            {item.content.description.includes("참석") && (
              <a
                href="#"
                className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 hover:underline mt-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                관련 뉴스 보기
              </a>
            )}
            
            {/* Image grid */}
            {item.images && item.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {item.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
                    <Image
                      src={image}
                      alt={`${item.title} 이미지 ${imgIndex + 1}`}
                      fill
                      className="object-cover rounded-lg opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.li>
  );
} 