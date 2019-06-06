import React from 'react';

export default function useAudioNode({ ctx, node: parentNode }, initializer) {
  const [node, setNode] = React.useState(null);

  React.useEffect(() => {
    if (ctx instanceof AudioContext) {
      if (!node) {
        const currentNode = initializer();

        setNode(currentNode);
      }
    }
  }, [ctx]);

  React.useEffect(() => {
    if (parentNode) {
      if (node) node.connect(parentNode);
    }

    return () => {
      if (parentNode) {
        if (node) node.disconnect(parentNode);
      }
    };
  }, [node, parentNode]);

  // allow nodes to pass through their parent
  // maybe find different way of bypassing. could introduce bugs on change
  return node || parentNode;
}
