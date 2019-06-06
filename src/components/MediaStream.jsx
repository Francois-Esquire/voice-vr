import React from 'react';

import { useMediaStream } from '../hooks';

import Child from './Child';

export default function MediaStream({
  audio = true,
  video = false,
  auto = false,
  children,
}) {
  const media = useMediaStream({ audio, video });

  React.useEffect(() => {
    if (auto) media.getUserMedia();
  }, [auto]);

  return <Child media={media}>{children}</Child>;
}
