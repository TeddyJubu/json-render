"use client";

import { type ReactNode } from "react";
import {
  Renderer,
  type Spec,
  StateProvider,
  VisibilityProvider,
  ActionProvider,
  ValidationProvider,
} from "@json-render/react";

import { registry, actionHandlers } from "./registry";

export interface SpecRendererProps {
  spec: Spec;
}

export function SpecRenderer({ spec }: SpecRendererProps): ReactNode {
  return (
    <StateProvider initialState={spec.state ?? {}}>
      <VisibilityProvider>
        <ActionProvider handlers={actionHandlers}>
          <ValidationProvider>
            <Renderer spec={spec} registry={registry} />
          </ValidationProvider>
        </ActionProvider>
      </VisibilityProvider>
    </StateProvider>
  );
}
