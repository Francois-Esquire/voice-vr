import React from 'react';

import { useAudioNode } from '../../hooks';

export default function OscillatorNode({
  ctx,
  node,
  type,
  frequency,
  detune,
  children,
}) {
  const oscillatorNode = useAudioNode({ ctx, node }, () =>
    ctx.createOscillator(),
  );

  React.useEffect(() => {
    if (oscillatorNode) {
      if (type && oscillatorNode.type !== type) oscillatorNode.type = type;
      if (frequency && oscillatorNode.frequency.value !== frequency)
        oscillatorNode.frequency.value = frequency;
      if (detune && oscillatorNode.detune.value !== detune)
        oscillatorNode.detune.value = detune;
    }
  }, [oscillatorNode, type, frequency, detune]);

  const context = { ctx, node: ctx && oscillatorNode };

  return typeof children === 'function'
    ? children(context)
    : children && React.cloneElement(children, context);
}
