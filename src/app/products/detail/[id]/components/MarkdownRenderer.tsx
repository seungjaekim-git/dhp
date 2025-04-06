'use client';

import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content">
      <style jsx global>{`
        .markdown-content h1 {
          font-size: 1.875rem;
          font-weight: 700;
          color: white;
          border-bottom: 1px solid #374151;
          padding-bottom: 0.5rem;
          margin: 2rem 0 1.5rem;
        }
        .markdown-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 2rem 0 1rem;
        }
        .markdown-content h3 {
          font-size: 1.25rem;
          font-weight: 500;
          color: #93c5fd;
          margin: 1.5rem 0 0.75rem;
        }
        .markdown-content h4 {
          font-size: 1.125rem;
          font-weight: 500;
          color: #bfdbfe;
          margin: 1.25rem 0 0.5rem;
        }
        .markdown-content p {
          color: #d1d5db;
          line-height: 1.75;
          margin: 1rem 0;
        }
        .markdown-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 1rem 0;
          color: #d1d5db;
        }
        .markdown-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 1rem 0;
          color: #d1d5db;
        }
        .markdown-content li {
          color: #d1d5db;
          margin-bottom: 0.25rem;
        }
        .markdown-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          color: #9ca3af;
          margin: 1rem 0;
        }
        .markdown-content a {
          color: #60a5fa;
          text-decoration: underline;
        }
        .markdown-content a:hover {
          color: #93c5fd;
        }
        .markdown-content img {
          max-width: 100%;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          margin: 1.5rem auto;
          display: block;
        }
        .markdown-content code {
          background-color: #1f2937;
          border-radius: 0.25rem;
          padding: 0.125rem 0.375rem;
          color: #93c5fd;
          font-size: 0.875rem;
        }
        .markdown-content pre {
          background-color: #111827;
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
          color: #e5e7eb;
        }
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        .markdown-content thead {
          background-color: #1f2937;
        }
        .markdown-content tbody {
          background-color: rgba(17, 24, 39, 0.5);
          border-top: 1px solid #374151;
        }
        .markdown-content tr {
          transition: background-color 0.2s;
        }
        .markdown-content tr:hover {
          background-color: rgba(31, 41, 55, 0.5);
        }
        .markdown-content th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-size: 0.875rem;
          font-weight: 500;
          color: #93c5fd;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .markdown-content td {
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #d1d5db;
          border-top: 1px solid #374151;
        }
        .markdown-content hr {
          border: 0;
          border-top: 1px solid #374151;
          margin: 2rem 0;
        }
      `}</style>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {content}
      </Markdown>
    </div>
  );
} 