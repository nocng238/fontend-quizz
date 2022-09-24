import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from '@iso/components/utility/loader';

const routes = [
  {
    path: '',
    component: lazy(() => import('@iso/containers/Widgets/Widgets')),
    exact: true,
  },
  {
    path: 'dashboard',
    component: lazy(() => import('@iso/containers/Widgets/Widgets')),
    exact: true,
  },
  {
    path: 'users',
    component: lazy(() => import('@iso/containers/User/List/UserList')),
    exact: true,
  },
  {
    path: 'users/create',
    component: lazy(() => import('@iso/containers/User/Create/UserCreate')),
    exact: true,
  },
  {
    path: 'users/edit/:userId',
    component: lazy(() => import('@iso/containers/User/Edit/UserEdit')),
    exact: true,
  },
  {
    path: 'users/:userId',
    component: lazy(() => import('@iso/containers/User/Detail/UserDetail')),
  },
  {
    path: 'profile',
    component: lazy(() => import('@iso/containers/Profile/Profile')),
  },
];

export default function AdminRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
