"use client";

import React from "react";
import { useLoading } from "@/lib/LoadingProvider";

const LoadingOverlay: React.FC = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-200 z-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default LoadingOverlay;
