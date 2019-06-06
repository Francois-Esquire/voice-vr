import React from 'react';

import Child from './Child';
import Switch from './Switch';
import MediaStream from './MediaStream';
import Permissions from './Permissions';

import {
  AudioContext,
  ScriptProcessorNode,
  MediaStreamSourceNode,
} from './AudioContext';

export default function AudioStream({ children, auto = false, fidelity = 64 }) {
  const [channelData, setChannelData] = React.useState();

  function onAudioProcess(event) {
    const left = event.inputBuffer.getChannelData(0);
    // const right = event.inputBuffer.getChannelData(1);
    setChannelData(left);
  }

  return (
    <Permissions>
      {({ permissions }) => (
        <MediaStream
          video={false}
          auto={auto && permissions.microphone === 'granted'}
        >
          {({ media }) => (
            <>
              <Switch on={media.streaming}>
                <AudioContext>
                  <ScriptProcessorNode
                    bufferSize={fidelity}
                    onAudioProcess={onAudioProcess}
                  >
                    <MediaStreamSourceNode stream={media.stream} />
                  </ScriptProcessorNode>
                </AudioContext>
              </Switch>

              {/* {console.log(media.streaming) || null} */}

              <Child
                media={media}
                streaming={media.streaming}
                permission={permissions.microphone}
                channelData={channelData}
              >
                {children}
              </Child>
            </>
          )}
        </MediaStream>
      )}
    </Permissions>
  );
}
