# React Alternator Wrapper

AlternatorWrapper is a React wrapper component that overrides props of children with a specified component type in a repeating order.
This makes it easy to apply varying props to a list of children while preserving each child’s unique props.

## Installation

```
npm i react-alternator-wrapper
```

## Props

| Prop           | Type           | Description                                                               |
| -------------- | -------------- | ------------------------------------------------------------------------ |
| targetFC     | FC&lt;T&gt;        | the React component type whose children will have their props overridden |
| propOverride | Partial&lt;T&gt;[] | array of prop objects to apply to the children in repeating order        |
| children     | ReactNode    | the child elements that may include instances of targetFC              |

## Example

```tsx
import React, { FC } from 'react';
import { AlternatorWrapper } from 'react-alternator-wrapper';

type SectionProps = {
  title: string;
  description: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
};

const SectionComponent: FC<SectionProps> = ({ title, description, color, textAlign }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        textAlign,
      }}
    >
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  );
};

export const Example: FC = () => {
  return (
    {/* Only override instances of SectionComponent */}
    <AlternatorWrapper
      targetFC={SectionComponent}
      propOverride={[
        { textAlign: 'left', color: 'blue' },
        { textAlign: 'center', color: 'purple' },
        { textAlign: 'right', color: 'green' },
      ]}
    >
      {/* Intro - textAlign: left, color: blue */}
      <SectionComponent title='Intro' description='The Beginning' />

      {/* Story - textAlign: center, color: purple */}
      <SectionComponent title='Story' description='The Why' />

      {/* Message - textAlign: right, color: green */}
      <SectionComponent title='Message' description='The What' />

      {/* Conclusion - textAlign: left, color: blue */}
      <SectionComponent title='Conclusion' description='The How' />

      {/* Summary - textAlign: center, color: purple */}
      <SectionComponent title='Summary' description='The End' />
    </AlternatorWrapper>
  );
};
```

## Notes

- `AlternatorWrapper` only overrides props of children that match the `targetFC` component.
- If there are more children than `propOverride` entries, the overrides cycle through the array repeatedly.
- Non-target children are rendered unchanged.
