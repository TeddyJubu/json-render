import {
  shadcnComponentDefinitions,
  shadcnActionDefinitions,
} from "@json-render/shadcn";
import type { Catalog } from "@json-render/core";

export const catalog: Catalog = {
  components: shadcnComponentDefinitions,
  actions: shadcnActionDefinitions,
  prompts: {},
};
