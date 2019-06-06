import AFRAME from 'aframe';
import React from 'react';
import useVoiceComponent from './useVoiceComponent';

export default function VoiceVR({ media, voiceCanvasId }) {
  useVoiceComponent();

  const scene = React.createRef();
  const [initialized, initialize] = React.useState(false);

  React.useEffect(() => {
    AFRAME.registerComponent('start-button', {
      init() {
        this.el.addEventListener('click', () => {
          if (media.streaming) media.stop();
          else media.getUserMedia();
        });
      },
    });

    initialize(true);
  }, []);

  return (
    initialized && (
      <a-scene
        ref={scene}
        renderer={[
          'antialias: true',
          'colorManagement: true',
          'sortObjects: true',
          'physicallyCorrectLights: true',
        ].join(';')}
      >
        <a-camera>
          <a-cursor />
        </a-camera>

        <a-sky color="#538aff" />

        <a-entity
          geometry="primitive: icosahedron; detail: 4;"
          position="0 1.6 -4"
          radius="1.25"
          animation="property: position; to: 0 1.25 -4; dur: 1500; easing: easeInQuad; loop: true; dir: alternate"
          voice={[`id: ${voiceCanvasId}`, `streaming: ${media.streaming}`].join(
            ';',
          )}
        />

        <a-entity position="0 1 -2" start-button>
          <a-plane width="2" opacity="0" />
          <a-text
            align="center"
            value={media.streaming ? 'Streaming' : 'Tap To Stream'}
            position="0 0 0"
          />
        </a-entity>
      </a-scene>
    )
  );
}
