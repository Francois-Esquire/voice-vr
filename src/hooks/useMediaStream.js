import React from 'react';

const helpers = {
  getUserMedia(profile) {
    if ('mediaDevices' in navigator) {
      return navigator.mediaDevices.getUserMedia(profile);
    }

    return new Promise((resolve, reject) => {
      navigator.getUserMedia(profile, resolve, reject);
    });
  },
  stop(stream) {
    if (stream) {
      if ('stop' in stream) stream.stop();
      else {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  },
};

export default function useMediaStream(
  defaultProfile = { audio: true, video: true },
) {
  const [profile, setProfile] = React.useState(defaultProfile);
  const [stream, setStream] = React.useState(null);
  const [streaming, setStreaming] = React.useState(false);

  React.useEffect(() => {
    return () => {
      helpers.stop(stream);
    };
  }, [stream]);

  return {
    get stream() {
      return stream;
    },
    get streaming() {
      return streaming;
    },
    get profile() {
      return profile;
    },
    set profile(newProfile) {
      setProfile(newProfile);
    },
    play() {
      setStreaming(true);
      return stream.play();
    },
    stop() {
      setStreaming(false);
      helpers.stop(stream);
    },
    pause() {
      setStreaming(false);
      return stream.pause();
    },
    addTrack() {},
    removeTrack() {},
    getUserMedia({ audio, video } = {}) {
      const currentProfile = audio || video ? { audio, video } : profile;

      return helpers.getUserMedia(currentProfile).then(streamN => {
        setStream(streamN);
        setStreaming(true);
        return streamN;
      });
    },
    captureAudio() {},
    takePicture() {},
  };
}
