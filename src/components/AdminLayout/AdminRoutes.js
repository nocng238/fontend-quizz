import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from '@iso/components/utility/loader';

const routes = [
  [
    {
      path: '/',
      component: lazy(() => import('@iso/containers/Calendar/Calendar')),
      exact: true,
    },
    {
      path: 'dashboard',
      component: lazy(() => import('@iso/containers/Calendar/Calendar')),
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
  ],
  [
    {
      path: '/',
      component: lazy(() => import('@iso/containers/Calendar/Calendar')),
      exact: true,
    },
    {
      path: 'dashboard',
      component: lazy(() => import('@iso/containers/Calendar/Calendar')),
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
    {
      path: 'assignments',
      component: lazy(() =>
        import('@iso/containers/Assignment/List/AssignmentList')
      ),
      exact: true,
    },
    {
      path: 'assignments/create/type',
      component: lazy(() =>
        import('@iso/containers/Assignment/Create/AssignmentCreate')
      ),
      exact: true,
    },
    {
      path: 'assignments/create/upload',
      component: lazy(() =>
        import('@iso/containers/Assignment/Create/AssignmentUpload')
      ),
      exact: true,
    },
    {
      path: 'assignments/edit/:assignmentId',
      component: lazy(() =>
        import('@iso/containers/Assignment/Edit/AssignmentEdit')
      ),
      exact: true,
    },
  ],
  [
    {
      path: '/',
      component: lazy(() => import('@iso/containers/Calendar/Calendar')),
      exact: true,
    },
    {
      path: 'dashboard',
      component: lazy(() => import('@iso/containers/Calendar/Calendar')),
      exact: true,
    },
    {
      path: 'assignments',
      component: lazy(() =>
        import('@iso/containers/Student/Assignment/List/AssignmentList')
      ),
      exact: true,
    },
    {
      path: 'history',
      component: lazy(() => import('@iso/containers/Student/History/History')),
      exact: true,
    },
  ],
];

export default function AdminRouter() {
  const role = localStorage.getItem('role');
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes[role].map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
