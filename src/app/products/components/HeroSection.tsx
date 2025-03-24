import React from "react";
import { HeroSectionClient } from "./HeroSectionClient";

interface BreadcrumbItem {
  label: string;
  href?: string;
  color?: string;
  hoverColor?: string;
}

interface HeroSectionProps {
  title: string;
  icon: React.ReactNode;
  breadcrumb: BreadcrumbItem[];
  description: string;
  badges?: {
    text: string;
    bgColor: string;
    textColor: string;
    hoverColor: string;
  }[];
}

export default function HeroSection({
  title,
  icon,
  breadcrumb,
  description,
  badges = [],
}: HeroSectionProps) {
  return (
    <HeroSectionClient
      title={title}
      icon={icon}
      breadcrumb={breadcrumb}
      description={description}
      badges={badges}
    />
  );
} 