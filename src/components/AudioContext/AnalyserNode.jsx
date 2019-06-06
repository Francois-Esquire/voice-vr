import React from 'react';

import { useAudioNode } from '../../hooks';

export default function AnalyserNode({
  ctx,
  node,
  fftSize = 2048,
  dataArray,
  children,
}) {
  const analyserNode = useAudioNode({ ctx, node }, () => ctx.createAnalyser());

  const [array, setDataArray] = React.useState(
    dataArray || new Uint8Array(fftSize / 2),
  );

  React.useEffect(() => {
    if (analyserNode) {
      if (fftSize && analyserNode.fftSize !== fftSize)
        analyserNode.fftSize = fftSize;

      window.analyserNode = analyserNode;
      window.dataArray = array;

      if (!dataArray) {
        const bufferLength = analyserNode.frequencyBinCount;
        setDataArray(new Uint8Array(bufferLength));
      }

      analyserNode.getByteTimeDomainData(array);
    }
  }, [analyserNode, fftSize]);

  React.useEffect(() => {
    if (analyserNode) {
      analyserNode.getByteTimeDomainData(array);
      // console.log('analyserNode', array);
    }
  });

  const context = { ctx, node: ctx && analyserNode };

  return typeof children === 'function'
    ? children(context)
    : children && React.cloneElement(children, context);
}
