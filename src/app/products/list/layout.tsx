import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex min-h-screen flex-col gap-4 p-4 md:p-4">
        <div className="flex flex-col gap-4 md:gap-4 w-full relative min-h-full h-full rounded-lg border border-border/50 bg-background/50 p-4 backdrop-blur-[2px] md:p-8">
          <div className="grid gap-1">
            <h1 className="text-3xl font-semibold text-foreground">
              Data-Table Filters
            </h1>
            <p className="text-muted-foreground">
              Powered by{" "}
              <a
                href="https://tanstack.com/table"
                target="_blank"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
              >
                tanstack table
              </a>{" "}
              and{" "}
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
              >
                shadcn ui
              </a>{" "}
              with controls and{" "}
              <a
                href="http://cmdk.paco.me/"
                target="_blank"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
              >
                cmdk
              </a>{" "}
              using search params via{" "}
              <a
                href="https://nuqs.47ng.com"
                target="_blank"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
              >
                nuqs
              </a>
              . <br />
              Code available on{" "}
              <a
                href="https://github.com/openstatusHQ/data-table-filters"
                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <Separator />
          {children}
          <Badge
            variant="outline"
            className="absolute -top-2.5 left-4 bg-background md:left-8"
          >
            Work in progress
          </Badge>
        </div>
      </main>
    </>
  );
}
