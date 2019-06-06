import React from 'react';

import AudioNode from './AudioNode';

export default function MediaStreamSourceNode({ ctx, node, stream, children }) {
  return (
    <AudioNode
      ctx={ctx}
      node={node}
      initializer={() => {
        if (stream) return ctx.createMediaStreamSource(stream);
        return null;
      }}
    >
      {children}
    </AudioNode>
  );
}
