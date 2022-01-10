# React Icons Picker
:red_circle:This project is still under development.

## Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

[image]

Each components are also strongly typed.

[image]

## Demo

This library is developed in a [Storybook](https://storybook.js.org/)-driven flow.
You can check the behavior of each component in the Storybook on Github Pages.

[Demo](https://t-hamano.github.io/react-icons-picker/)

## Installation

Install via npm

```
npm install --save @t-hamano/react-icons-picker
```

Install via yarn

```
yarn add @t-hamano/react-icons-picker
```

## Usage

### IconPicker

```typescript
import { useState } from 'react';
import { IconPicker } from '@t-hamano/react-icons-picker';

const Example = () => {
  const [icon, setIcon] = useState();
  return <IconPicker value={icon} onChange={setIcon} />;
};
```

### Icon

```typescript
import { Icon } from '@t-hamano/react-icons-picker';

const Example = () => {
  return <Icon value={icon} />;
};
```

## Configuration

### IconPicker

| Prop  | Type   | Required | Description |
| ----- | ------ | -------- | ----------- |
| value | string | true     | Lorem ipsum |

### ModalIconPicker

| Prop  | Type   | Required | Description |
| ----- | ------ | -------- | ----------- |
| value | string | true     | Lorem ipsum |

### Icon

| Prop  | Type   | Required | Description |
| ----- | ------ | -------- | ----------- |
| value | string | true     | Lorem ipsum |

## Adjustment CSS

### Global Inline Styling

### Global `className` Styling

## Development

### On Storybook

### On Your Project

## Contribution Guide

If you are interested in contributing, please submit a PR.

### Contributors

+ [Tetsuaki Hamano](https://github.com/t-hamano)

## Licence
