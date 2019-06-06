import React from 'react';

import { useAudioNode } from '../../hooks';

// Deprecated
// https://webaudio.github.io/web-audio-api/#scriptprocessornode
// https://www.youtube.com/watch?v=g1L4O1smMC0&t=1m33s
export default function ScriptProcessorNode({
  ctx,
  node,
  bufferSize = 2048,
  numberOfInputChannels = 2,
  numberOfOutputChannels = 2,
  onAudioProcess = null,
  children,
}) {
  const scriptProcessorNode = useAudioNode({ ctx, node }, () =>
    ctx.createScriptProcessor(
      bufferSize,
      numberOfInputChannels,
      numberOfOutputChannels,
    ),
  );

  React.useEffect(() => {
    if (scriptProcessorNode) {
      if (typeof onAudioProcess === 'function')
        scriptProcessorNode.onaudioprocess = onAudioProcess;
      else if (typeof scriptProcessorNode.onaudioprocess === 'function')
        scriptProcessorNode.onaudioprocess = null;
    }
  }, [scriptProcessorNode, onAudioProcess]);

  const context = { ctx, node: ctx && scriptProcessorNode };

  return typeof children === 'function'
    ? children(context)
    : children && React.cloneElement(children, context);
}
