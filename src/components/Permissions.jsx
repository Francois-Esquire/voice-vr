import React from 'react';

import { usePermissions } from '../hooks';

import Child from './Child';

export default function Permissions({ children }) {
  const permissions = usePermissions();

  return <Child permissions={permissions}>{children}</Child>;
}
