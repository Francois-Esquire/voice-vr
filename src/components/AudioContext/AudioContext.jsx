import React from 'react';

import { useAudioContext } from '../../hooks';

export default function AudioContext({
  latencyHint,
  sampleRate,
  offline,
  children,
}) {
  const ctx = useAudioContext({ latencyHint, sampleRate, offline });

  const context = { ctx, node: ctx && ctx.destination };

  return typeof children === 'function'
    ? children(context)
    : React.cloneElement(children, context);
}
