import type { Lesson } from "../types";
import type { Spec } from "@json-render/core";

const starterSpec: Spec = {
  root: "stack-1",
  elements: {
    "stack-1": {
      type: "Stack",
      props: {
        gap: 4,
      },
      children: [],
    },
  },
};

export const lesson02: Lesson = {
  id: "02-props-children",
  slug: "props-children",
  title: "Props and Children",
  module: "foundations",
  order: 2,
  duration: 7,
  xp: 75,
  description:
    "Understand how to pass props to components and compose multiple elements together.",
  concepts: ["props", "children", "composition", "layout"],
  prerequisites: ["01-hello-spec"],
  starterSpec,
  challenges: [
    {
      id: "build-profile-card",
      title: "Build a Profile Card",
      description:
        "Create a profile card with an Avatar, Heading, and Text component inside the Stack. The Heading should say 'Alex Chen' and the Text should say 'Software Engineer'.",
      validation: [
        {
          check: (spec: Spec) => {
            const stack = spec.elements["stack-1"];
            if (!stack || !Array.isArray(stack.children)) return false;
            return stack.children.length >= 3;
          },
          errorMessage: "The Stack should have at least 3 children",
          hint: "Add Avatar, Heading, and Text elements to the Stack",
        },
        {
          check: (spec: Spec) => {
            const stack = spec.elements["stack-1"];
            if (!stack || !Array.isArray(stack.children)) return false;
            const hasAvatar = stack.children.some((key) => {
              if (typeof key !== "string") return false;
              return spec.elements[key]?.type === "Avatar";
            });
            return hasAvatar;
          },
          errorMessage: "The Stack should contain an Avatar component",
          hint: "Add an element with type 'Avatar' to the elements object",
        },
        {
          check: (spec: Spec) => {
            const stack = spec.elements["stack-1"];
            if (!stack || !Array.isArray(stack.children)) return false;
            const hasHeading = stack.children.some((key) => {
              if (typeof key !== "string") return false;
              const el = spec.elements[key];
              return (
                el?.type === "Heading" &&
                (el?.props?.children === "Alex Chen" ||
                  el?.props?.children?.includes("Alex"))
              );
            });
            return hasHeading;
          },
          errorMessage:
            "The Stack should contain a Heading with 'Alex Chen' or similar text",
          hint: "Add a Heading element with props.children set to 'Alex Chen'",
        },
        {
          check: (spec: Spec) => {
            const stack = spec.elements["stack-1"];
            if (!stack || !Array.isArray(stack.children)) return false;
            const hasText = stack.children.some((key) => {
              if (typeof key !== "string") return false;
              const el = spec.elements[key];
              return (
                el?.type === "Text" &&
                (el?.props?.children === "Software Engineer" ||
                  el?.props?.children?.toLowerCase().includes("engineer"))
              );
            });
            return hasText;
          },
          errorMessage:
            "The Stack should contain Text with 'Software Engineer' or similar",
          hint: "Add a Text element with props.children set to 'Software Engineer'",
        },
      ],
    },
  ],
  hints: [
    "Stack is a layout component that arranges children vertically",
    "The gap prop controls spacing between children (1 = 0.25rem, 4 = 1rem)",
    "Avatar can have a fallback prop for initials when no image is provided",
    "Order matters - children are rendered in the order they appear in the array",
  ],
};

export const LessonContent02 = () => (
  <>
    <h2>Working with Props</h2>
    <p>
      Props (properties) are how you customize components. Different components
      accept different props based on their purpose.
    </p>

    <h3>Common Props</h3>
    <ul>
      <li>
        <strong>children</strong>: Text content or nested elements
      </li>
      <li>
        <strong>variant</strong>: Visual style (e.g., "default", "outline")
      </li>
      <li>
        <strong>size</strong>: Component size (e.g., "sm", "md", "lg")
      </li>
      <li>
        <strong>className</strong>: Additional CSS classes
      </li>
    </ul>

    <h3>Layout Props</h3>
    <p>Layout components like Stack have special props:</p>
    <ul>
      <li>
        <strong>gap</strong>: Spacing between children (1-8)
      </li>
      <li>
        <strong>direction</strong>: "horizontal" or "vertical"
      </li>
      <li>
        <strong>align</strong>: Alignment of children
      </li>
    </ul>

    <h3>Children Array</h3>
    <p>
      The children property is an array of element keys. This creates the
      component hierarchy:
    </p>
    <pre>
      {`"stack-1": {
  "type": "Stack",
  "props": { "gap": 4 },
  "children": ["avatar-1", "heading-1", "text-1"]
}`}
    </pre>

    <h3>Composition Patterns</h3>
    <p>
      json-render follows React's composition model. Instead of complex
      components with many props, you compose simple components together:
    </p>
    <ul>
      <li>Use Stack or Grid for layout</li>
      <li>Nest Cards for sections</li>
      <li>Combine Text, Heading, and icons for content</li>
    </ul>
  </>
);
