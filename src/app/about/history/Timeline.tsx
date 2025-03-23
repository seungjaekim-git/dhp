'use client';

import TimelineItemComponent from './TimelineItem';
import { motion } from "framer-motion";

interface TimelineProps {
  timelineData: any[];
}

export default function Timeline({ timelineData }: TimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ol className="relative border-s border-gray-700">
        {timelineData.map((item, index) => (
          <TimelineItemComponent 
            key={index} 
            item={item} 
            index={index} 
          />
        ))}
      </ol>
    </motion.div>
  );
} 