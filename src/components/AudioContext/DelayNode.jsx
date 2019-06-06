import React from 'react';

import { useAudioNode } from '../../hooks';

export default function DelayNode({ ctx, node, delay, children }) {
  const delayNode = useAudioNode({ ctx, node }, () => ctx.createDelay());

  React.useEffect(() => {
    if (delayNode) {
      if (delay && delayNode.delayTime.value !== delay)
        delayNode.delayTime.value = delay;
    }
  }, [delayNode, delay]);

  const context = { ctx, node: ctx && delayNode };

  return typeof children === 'function'
    ? children(context)
    : children && React.cloneElement(children, context);
}
