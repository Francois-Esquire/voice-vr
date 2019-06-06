import Loadable from 'react-loadable';

// code-split main scene and THREE/AFRAME libraries for entry
export default Loadable({
  loader: () => import('./voice'),
  loading: () => null,
});
