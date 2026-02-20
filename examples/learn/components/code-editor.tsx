"use client";

import { useState, useEffect } from "react";
import type { Spec } from "@json-render/core";
import Editor from "@monaco-editor/react";
import { Button } from "@json-render/shadcn";
import { Wand2, AlertCircle } from "lucide-react";

interface CodeEditorProps {
  initialSpec: Spec;
  onChange: (spec: Spec) => void;
}

export function CodeEditor({ initialSpec, onChange }: CodeEditorProps) {
  const [code, setCode] = useState(JSON.stringify(initialSpec, null, 2));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCode(JSON.stringify(initialSpec, null, 2));
    setError(null);
  }, [initialSpec]);

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;
    
    setCode(value);
    setError(null);

    try {
      const parsed = JSON.parse(value) as Spec;
      onChange(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(code);
      const formatted = JSON.stringify(parsed, null, 2);
      setCode(formatted);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Editor header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">spec.json</span>
          {error && (
            <div className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="h-3 w-3" />
              <span>Syntax error</span>
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={handleFormat}>
          <Wand2 className="h-3 w-3" />
          Format
        </Button>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          defaultLanguage="json"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="border-t bg-destructive/10 px-4 py-2">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}
