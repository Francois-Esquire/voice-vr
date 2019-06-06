import React from 'react';

import {
  Switch,
  AudioContext,
  ScriptProcessorNode,
  MediaStreamSourceNode,
} from '../components';

// Time and Sound dimensional 2D texture
export default function AudioTextureSamplingCanvas({
  id = 'voice-texture-map',
  size = 256,
  bufferSize = 64,
  media,
}) {
  const ref = React.createRef();

  const [ctx, setCtx] = React.useState(null);

  React.useEffect(() => {
    if (ref.current) {
      setCtx(ref.current.getContext('2d'));
    }
  }, [ref.current]);

  function onAudioProcess(event) {
    const left = event.inputBuffer.getChannelData(0);

    const imageData = ctx.getImageData(0, 0, size, size);

    const scale = imageData.data.length / left.length;

    // move the current canvas down one register
    ctx.putImageData(imageData, 0, size / scale);

    // add contrast
    const factor = 0.6;
    const contrast = factor * (255 / 100);
    left.forEach((value, index) => {
      // convert scales between pcm [-1, 1] to rgb [0, 255]
      const val = (((value - -1) / 2) * 255 + 0) * contrast;

      imageData.data[index + 0] = val;
      imageData.data[index + 1] = val;
      imageData.data[index + 2] = val;
      imageData.data[index + 3] = 255;
    });

    // place incoming audio signal on top pixel register
    ctx.putImageData(imageData, 0, 0, 0, 0, size, size / scale);
  }

  return (
    <>
      <Switch on={media.streaming}>
        <AudioContext>
          {/* Deprecated - use AudioWorklet in future */}
          <ScriptProcessorNode
            numberOfInputChannels={1}
            numberOfOutputChannels={1}
            bufferSize={bufferSize ** 2}
            onAudioProcess={onAudioProcess}
          >
            <MediaStreamSourceNode stream={media.stream} />
          </ScriptProcessorNode>
        </AudioContext>
      </Switch>

      <canvas
        style={{ display: 'none' }}
        id={id}
        width={size}
        height={size}
        ref={ref}
        onClick={() => {
          if (media.streaming) media.stop();
          else media.getUserMedia();
        }}
      />
    </>
  );
}
