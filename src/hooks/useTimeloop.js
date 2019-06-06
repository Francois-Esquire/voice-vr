import React from 'react';

export default function useTimeloop(framerate = 60) {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = 1000 / framerate;

    function tick() {
      setTime(t => t + 1);
    }

    const id = setInterval(tick, interval);

    return () => {
      clearInterval(id);
    };
  }, [framerate]);

  return time;
}
