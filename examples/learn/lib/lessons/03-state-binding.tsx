import type { Lesson } from "../types";
import type { Spec } from "@json-render/core";

const starterSpec: Spec = {
  root: "card-1",
  state: {
    count: 0,
  },
  elements: {
    "card-1": {
      type: "Card",
      props: {},
      children: ["text-1"],
    },
    "text-1": {
      type: "Text",
      props: {
        children: "Count: 0",
      },
      children: null,
    },
  },
};

export const lesson03: Lesson = {
  id: "03-state-binding",
  slug: "state-binding",
  title: "State and Binding",
  module: "foundations",
  order: 3,
  duration: 10,
  xp: 100,
  description:
    "Learn how to manage state and bind it to UI elements for reactive interfaces.",
  concepts: ["state", "$bindState", "actions", "reactivity"],
  prerequisites: ["01-hello-spec", "02-props-children"],
  starterSpec,
  challenges: [
    {
      id: "bind-count-to-text",
      title: "Bind State to Text",
      description:
        "Update the Text component to display the count from state using $bindState instead of hardcoded text.",
      validation: [
        {
          check: (spec: Spec) => {
            return spec.state !== undefined && "count" in spec.state;
          },
          errorMessage: "The spec should have a state object with a count property",
          hint: "Make sure the state object has a count field",
        },
        {
          check: (spec: Spec) => {
            const text = spec.elements["text-1"];
            if (!text) return false;
            const children = text.props?.children;
            if (typeof children !== "object") return false;
            return "$bindState" in children;
          },
          errorMessage: "The Text props.children should use $bindState",
          hint: "Replace the hardcoded text with { $bindState: { path: 'count' } }",
        },
      ],
    },
    {
      id: "add-increment-button",
      title: "Add Increment Button",
      description:
        "Add a Button that increments the count when clicked using the setState action.",
      validation: [
        {
          check: (spec: Spec) => {
            const card = spec.elements["card-1"];
            if (!card || !Array.isArray(card.children)) return false;
            const hasButton = card.children.some((key) => {
              if (typeof key !== "string") return false;
              return spec.elements[key]?.type === "Button";
            });
            return hasButton;
          },
          errorMessage: "Add a Button component to the Card",
          hint: "Create a Button element and add it to the Card's children",
        },
        {
          check: (spec: Spec) => {
            const elements = Object.values(spec.elements);
            const button = elements.find((el) => el.type === "Button");
            if (!button) return false;
            return button.on !== undefined && "press" in button.on;
          },
          errorMessage: "The Button should have an 'on.press' action",
          hint: "Add an 'on' field to the Button with a 'press' property",
        },
        {
          check: (spec: Spec) => {
            const elements = Object.values(spec.elements);
            const button = elements.find((el) => el.type === "Button");
            if (!button || !button.on?.press) return false;
            const action = Array.isArray(button.on.press)
              ? button.on.press[0]
              : button.on.press;
            return (
              action &&
              typeof action === "object" &&
              "setState" in action
            );
          },
          errorMessage: "The Button's press action should use setState",
          hint: "Use { setState: { path: 'count', value: ... } } in the press action",
        },
      ],
    },
  ],
  hints: [
    "Use $bindState to reference state values: { $bindState: { path: 'count' } }",
    "The setState action updates state: { setState: { path: 'count', value: { $state: { path: 'count', modifier: { add: 1 } } } } }",
    "Actions go in the 'on' field with event names as keys (e.g., 'press', 'change')",
    "State updates trigger re-renders automatically",
  ],
};

export const LessonContent03 = () => (
  <>
    <h2>Understanding State</h2>
    <p>
      State is data that can change over time. In json-render, you define state
      at the top level of your spec:
    </p>
    <pre>
      {`{
  "root": "card-1",
  "state": {
    "count": 0,
    "username": "guest"
  },
  "elements": { ... }
}`}
    </pre>

    <h3>Binding State to UI</h3>
    <p>
      Use <code>$bindState</code> to display state values in your components:
    </p>
    <pre>
      {`{
  "type": "Text",
  "props": {
    "children": {
      "$bindState": {
        "path": "count"
      }
    }
  }
}`}
    </pre>

    <h3>Updating State with Actions</h3>
    <p>
      The <code>setState</code> action updates state values. You define actions
      in the <code>on</code> field:
    </p>
    <pre>
      {`{
  "type": "Button",
  "props": { "children": "Increment" },
  "on": {
    "press": {
      "setState": {
        "path": "count",
        "value": {
          "$state": {
            "path": "count",
            "modifier": { "add": 1 }
          }
        }
      }
    }
  }
}`}
    </pre>

    <h3>State Modifiers</h3>
    <p>Modifiers let you transform state values:</p>
    <ul>
      <li>
        <strong>add</strong>: Add a number to the current value
      </li>
      <li>
        <strong>multiply</strong>: Multiply the current value
      </li>
      <li>
        <strong>append</strong>: Append to a string
      </li>
      <li>
        <strong>toggle</strong>: Toggle a boolean value
      </li>
    </ul>

    <h3>Why State Matters</h3>
    <p>
      State makes your UI reactive. When state changes, all elements bound to
      that state automatically update. This is the foundation for interactive
      UIs like forms, counters, and toggles.
    </p>
  </>
);
