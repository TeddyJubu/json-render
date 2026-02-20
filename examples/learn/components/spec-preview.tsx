"use client";

import React, { useState } from "react";
import type { Spec } from "@json-render/core";
import { SpecRenderer } from "@/lib/render/renderer";
import { Eye, Code, AlertTriangle } from "lucide-react";
import { Button } from "@json-render/shadcn";

interface SpecPreviewProps {
  spec: Spec;
}

export function SpecPreview({ spec }: SpecPreviewProps) {
  const [error, setError] = useState<Error | null>(null);
  const [showJson, setShowJson] = useState(false);

  const handleError = (err: Error) => {
    setError(err);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Preview header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-sm font-medium">Preview</span>
        <div className="flex items-center gap-2">
          <Button
            variant={showJson ? "ghost" : "secondary"}
            size="sm"
            onClick={() => setShowJson(false)}
          >
            <Eye className="h-3 w-3" />
            Visual
          </Button>
          <Button
            variant={showJson ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setShowJson(true)}
          >
            <Code className="h-3 w-3" />
            JSON
          </Button>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-auto p-4">
        {error ? (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-md space-y-4 rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
              <AlertTriangle className="mx-auto h-8 w-8 text-destructive" />
              <div>
                <h3 className="mb-2 font-semibold text-destructive">
                  Render Error
                </h3>
                <p className="text-sm text-muted-foreground">
                  {error.message}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setError(null)}
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : showJson ? (
          <pre className="rounded-lg bg-muted p-4 text-xs">
            <code>{JSON.stringify(spec, null, 2)}</code>
          </pre>
        ) : (
          <ErrorBoundary onError={handleError}>
            <SpecRenderer spec={spec} />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

// Error boundary for catching render errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}
