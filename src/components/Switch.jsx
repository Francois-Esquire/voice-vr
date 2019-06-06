export default function Switch({ on, children }) {
  // TODO: add delays - sync with transitions
  return on ? children : null;
}
