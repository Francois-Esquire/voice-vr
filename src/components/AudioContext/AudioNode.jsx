import React from 'react';

import { useAudioNode } from '../../hooks';

export default function AudioNode({ ctx, node, initializer, children }) {
  const audioNode = useAudioNode({ ctx, node }, initializer);

  const context = { ctx, node: ctx && audioNode };

  // eslint-disable-next-line no-nested-ternary
  return children
    ? typeof children === 'function'
      ? children(context)
      : React.cloneElement(children, context)
    : null;
}
