import React from "react";
import { ContentSectionClient } from "./ContentSectionClient";

interface ContentSectionProps {
  children: React.ReactNode;
}

export default function ContentSection({
  children,
}: ContentSectionProps) {
  return (
    <ContentSectionClient>
      {children}
    </ContentSectionClient>
  );
} 