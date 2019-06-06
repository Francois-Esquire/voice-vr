import React from 'react';

export default function Child({ children, ...props }) {
  // eslint-disable-next-line no-nested-ternary
  return children
    ? typeof children === 'function'
      ? children(props)
      : React.cloneElement(children, props)
    : null;
}
