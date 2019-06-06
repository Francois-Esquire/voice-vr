import React from 'react';

import { useAudioNode } from '../../hooks';

export default function BiquadFilterNode({
  ctx,
  node,
  type,
  frequency,
  gain,
  children,
}) {
  const biquadFilterNode = useAudioNode({ ctx, node }, () =>
    ctx.createBiquadFilter(),
  );

  React.useEffect(() => {
    if (biquadFilterNode) {
      if (type && biquadFilterNode.type !== type) biquadFilterNode.type = type;
      if (frequency && biquadFilterNode.frequency.value !== frequency)
        biquadFilterNode.frequency.value = frequency;
      if (gain && biquadFilterNode.gain.value !== gain)
        biquadFilterNode.gain.value = gain;
    }
  }, [biquadFilterNode, type, frequency, gain]);

  const context = { ctx, node: ctx && biquadFilterNode };

  return typeof children === 'function'
    ? children(context)
    : children && React.cloneElement(children, context);
}
