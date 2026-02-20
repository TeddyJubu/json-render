import type { Lesson } from "../types";
import type { Spec } from "@json-render/core";

const starterSpec: Spec = {
  root: "card-1",
  elements: {
    "card-1": {
      type: "Card",
      props: {},
      children: [],
    },
  },
};

export const lesson01: Lesson = {
  id: "01-hello-spec",
  slug: "hello-spec",
  title: "Your First Spec",
  module: "foundations",
  order: 1,
  duration: 5,
  xp: 50,
  description:
    "Learn the fundamental structure of a json-render spec and create your first UI component.",
  concepts: ["spec structure", "root", "elements", "children"],
  prerequisites: [],
  starterSpec,
  challenges: [
    {
      id: "add-heading",
      title: "Add a Heading",
      description:
        "Add a Heading component as a child of the Card. Set its props.children to 'Hello, json-render!'",
      validation: [
        {
          check: (spec: Spec) => {
            const card = spec.elements["card-1"];
            if (!card || !Array.isArray(card.children)) return false;
            return card.children.length > 0;
          },
          errorMessage: "The Card should have at least one child",
          hint: "Add an element key to the Card's children array",
        },
        {
          check: (spec: Spec) => {
            const card = spec.elements["card-1"];
            if (!card || !Array.isArray(card.children)) return false;
            const firstChild = card.children[0];
            if (typeof firstChild !== "string") return false;
            const heading = spec.elements[firstChild];
            return heading?.type === "Heading";
          },
          errorMessage: "The first child should be a Heading component",
          hint: "Create a Heading element and reference it in the Card's children",
        },
        {
          check: (spec: Spec) => {
            const card = spec.elements["card-1"];
            if (!card || !Array.isArray(card.children)) return false;
            const firstChild = card.children[0];
            if (typeof firstChild !== "string") return false;
            const heading = spec.elements[firstChild];
            return (
              heading?.props?.children === "Hello, json-render!" ||
              heading?.props?.children === "Hello, json-render"
            );
          },
          errorMessage:
            "The Heading's props.children should be 'Hello, json-render!'",
          hint: "Set the Heading's props.children property",
        },
      ],
    },
  ],
  hints: [
    "A spec has two main parts: root (which element to render) and elements (all available elements)",
    "Each element needs a unique key in the elements object",
    "Children can be an array of element keys or null",
    "Props can include a special 'children' property for text content",
  ],
};

export const LessonContent01 = () => (
  <>
    <h2>What is a Spec?</h2>
    <p>
      A <strong>spec</strong> (short for specification) is a JSON object that
      describes your UI. It's the core data structure that json-render uses to
      create React components.
    </p>

    <h3>The Two Main Parts</h3>
    <p>Every spec has two essential fields:</p>
    <ol>
      <li>
        <strong>root</strong>: A string that points to which element should be
        rendered at the top level
      </li>
      <li>
        <strong>elements</strong>: An object containing all the UI elements,
        each with a unique key
      </li>
    </ol>

    <h3>Example Structure</h3>
    <pre>
      {`{
  "root": "card-1",
  "elements": {
    "card-1": {
      "type": "Card",
      "props": {},
      "children": []
    }
  }
}`}
    </pre>

    <h3>Element Properties</h3>
    <p>Each element in the elements object has:</p>
    <ul>
      <li>
        <strong>type</strong>: The component type (e.g., "Card", "Button",
        "Heading")
      </li>
      <li>
        <strong>props</strong>: An object of properties passed to the component
      </li>
      <li>
        <strong>children</strong>: An array of element keys or null
      </li>
    </ul>

    <h3>Adding Children</h3>
    <p>To nest elements, you:</p>
    <ol>
      <li>Create a new element in the elements object with a unique key</li>
      <li>Add that key to the parent's children array</li>
    </ol>
    <p>
      For text content, use <code>props.children</code> instead.
    </p>
  </>
);
