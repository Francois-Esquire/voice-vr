import React from 'react';

import { useAudioNode } from '../../hooks';

export default function GainNode({ ctx, node, gain, children }) {
  const gainNode = useAudioNode({ ctx, node }, () => ctx.createGain());

  React.useEffect(() => {
    if (gainNode) {
      if (gain && gainNode.gain.value !== gain) gainNode.gain.value = gain;
    }
  }, [gainNode, gain]);

  const context = { ctx, node: ctx && gainNode };

  return typeof children === 'function'
    ? children(context)
    : children && React.cloneElement(children, context);
}
