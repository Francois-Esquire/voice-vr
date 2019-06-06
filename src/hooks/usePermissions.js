import React from 'react';

const permissionQueryNames = [
  ['geolocation'],
  ['notifications'],
  ['push', { userVisibleOnly: true }],
  ['midi', { sysex: true }],
  ['camera'],
  ['microphone'],
  ['background-sync'],
  ['ambient-light-sensor'],
  ['accelerometer'],
  ['gyroscope'],
  ['magnetometer'],
].filter(pair => {
  const [name] = pair;

  return ['ambient-light-sensor'].includes(name) === false;
});

const permissionsInitialState = permissionQueryNames.reduce(
  (initialState, permit) => {
    const [name] = permit;

    // eslint-disable-next-line no-param-reassign
    initialState[name] = 'default';

    return initialState;
  },
  {},
);

function permissionsReducer(state, action) {
  switch (action.type) {
    case 'reset':
      return permissionsInitialState;
    case 'default':
      return { ...state, [action.name]: 'default' };
    case 'granted':
      return { ...state, [action.name]: 'granted' };
    case 'denied':
      return { ...state, [action.name]: 'denied' };
    default:
      return state;
  }
}

export default function usePermissions() {
  const [permissions, dispatch] = React.useReducer(
    permissionsReducer,
    permissionsInitialState,
  );

  React.useEffect(() => {
    const cleanup = [];

    if ('permissions' in navigator) {
      permissionQueryNames.forEach(permit => {
        const [name, descriptor] = permit;

        navigator.permissions
          .query(Object.assign({ name }, descriptor))
          .then(permission => {
            dispatch({ type: permission.state, name });

            const onChange = () => {
              dispatch({ type: permission.state, name });
            };

            permission.addEventListener('change', onChange);

            cleanup.push(() =>
              permission.removeEventListener('change', onChange),
            );
          })
          .catch(e => console.warn(name, e));
      });
    }

    return () => {
      cleanup.forEach(fn => fn());
    };
  }, []);

  return permissions;
}

usePermissions.defaults = permissionsInitialState;
