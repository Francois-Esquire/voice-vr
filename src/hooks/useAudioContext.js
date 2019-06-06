import React from 'react';

export default function useAudioContext({ latencyHint, sampleRate }) {
  const [ctx, setCtx] = React.useState(null);

  React.useEffect(() => {
    if (!ctx)
      setCtx(
        new (window.AudioContext || window.webkitAudioContext)({
          latencyHint,
          sampleRate,
        }),
      );
    return () => ctx && ctx.state === 'running' && ctx.close();
  }, [ctx]);

  return ctx;
}
