import React from 'react';

import { MediaStream, Permissions } from '../components';

import AudioTextureSamplingCanvas from './AudioTextureCanvas';
import Voice from './Voice';

export default function VoiceEntryPoint({ autoStart = false }) {
  const voiceCanvasId = 'voice-texture-map';

  return (
    <Permissions>
      {({ permissions }) => (
        <MediaStream
          video={false}
          auto={autoStart && permissions.microphone === 'granted'}
        >
          {({ media }) => (
            <>
              <AudioTextureSamplingCanvas id={voiceCanvasId} media={media} />

              <Voice voiceCanvasId={voiceCanvasId} media={media} />
            </>
          )}
        </MediaStream>
      )}
    </Permissions>
  );
}
