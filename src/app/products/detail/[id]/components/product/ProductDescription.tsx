import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import('react-markdown'), { 
  loading: () => <MarkdownSkeleton />,
  ssr: false
});
const remarkGfm = dynamic(() => import('remark-gfm'), { ssr: false });

// 로딩 스켈레톤 컴포넌트
const MarkdownSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    <div className="h-6 bg-gray-200 rounded w-1/2 mt-6"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
  </div>
);

interface ProductDescriptionProps {
  description: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const ProductDescription = ({ 
  description, 
  isExpanded, 
  onToggleExpand 
}: ProductDescriptionProps) => {
  return (
    <Card className="w-full transition-shadow hover:shadow-lg border-2 border-slate-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="bg-slate-100 p-2.5 rounded-xl">
            <FileText className="w-5 h-5 text-slate-600" />
          </span>
          제품 설명
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="relative">
          <div className={`prose prose-sm md:prose-base lg:prose-lg max-w-none transition-all duration-300
            [&>h1]:text-2xl [&>h1]:font-extrabold [&>h1]:mt-6 [&>h1]:mb-4 [&>h1]:text-gray-900 hover:[&>h1]:text-black
            [&>h2]:text-xl [&>h2]:font-bold [&>h2]:border-b [&>h2]:border-gray-200 hover:[&>h2]:border-gray-300 [&>h2]:pb-2 [&>h2]:mt-6 [&>h2]:mb-4 [&>h2]:text-gray-800 hover:[&>h2]:text-gray-900
            [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-4 [&>h3]:text-gray-800 hover:[&>h3]:text-gray-900
            [&>p]:text-gray-700 hover:[&>p]:text-gray-800 [&>p]:leading-relaxed [&>p]:mb-4
            [&>a]:text-blue-600 [&>a]:no-underline hover:[&>a]:underline hover:[&>a]:text-blue-700 active:[&>a]:text-blue-800
            [&>strong]:font-bold [&>strong]:text-gray-900
            [&>code]:text-pink-600 [&>code]:bg-gray-50 hover:[&>code]:bg-gray-100 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded-md
            [&>pre]:bg-gray-900 [&>pre]:rounded-lg [&>pre]:p-4 hover:[&>pre]:bg-gray-800
            [&>ul]:my-4 [&>ul]:list-disc [&>ul]:pl-6 hover:[&>ul>li]:text-gray-800
            [&>ol]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 hover:[&>ol>li]:text-gray-800
            [&>li]:my-2 [&>li]:text-gray-700
            [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 hover:[&>blockquote]:border-gray-400 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 hover:[&>blockquote]:text-gray-700
            [&>hr]:my-8 [&>hr]:border-gray-200 hover:[&>hr]:border-gray-300
            [&>table]:border-collapse [&>table]:w-full [&>table]:my-6 hover:[&>table]:shadow-sm
            [&>thead]:bg-gray-100 hover:[&>thead]:bg-gray-200
            [&>th]:p-2 [&>th]:border [&>th]:border-gray-200 [&>th]:text-left [&>th]:font-semibold
            [&>td]:p-2 [&>td]:border [&>td]:border-gray-200 hover:[&>tr]:bg-gray-50
            [&>tr:nth-child(even)]:bg-gray-50 hover:[&>tr:nth-child(even)]:bg-gray-100`}
            style={{
              maxHeight: isExpanded ? '100%' : '400px',
              overflow: 'hidden'
            }}
          >
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ className, children }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      className="rounded-md my-4 transition-all duration-200 hover:shadow-lg"
                      customStyle={{
                        margin: '1.5em 0',
                        padding: '1.25em',
                        backgroundColor: '#1a1b26',
                        fontSize: '0.9em',
                        lineHeight: '1.6'
                      }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="px-1.5 py-0.5 rounded-md bg-gray-50 text-sm font-mono transition-colors duration-200 hover:bg-gray-100">
                      {children}
                    </code>
                  );
                },
                p: ({ children }) => (
                  <p className="mb-4 transition-colors duration-200 hover:text-gray-800">{children}</p>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-100 transition-colors duration-200">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-gray-200">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="transition-colors duration-200 hover:bg-gray-50">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {children}
                  </td>
                )
              }}
            >
              {description}
            </Markdown>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 z-10 transition-all duration-200 hover:bg-gray-100 active:bg-gray-200 hover:border-gray-400"
            onClick={onToggleExpand}
          >
            {isExpanded ? '접기' : '더보기'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 