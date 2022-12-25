import React, { lazy, Suspense } from 'react';
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from '@iso/components/utility/loader';
import ErrorBoundary from './ErrorBoundary';

const AdminLayout = lazy(() => import('./components/AdminLayout/AdminLayout'));
const publicRoutes = [
  {
    path: '/404',
    component: lazy(() => import('@iso/containers/Pages/404/404')),
    exact: true,
  },
  {
    path: '/500',
    component: lazy(() => import('@iso/containers/Pages/500/500')),
  },
  {
    path: '/signin',
    component: lazy(() => import('@iso/containers/Pages/SignIn/SignIn')),
    exact: true,
  },
  {
    path: '/forgot-password',
    component: lazy(() =>
      import('@iso/containers/Pages/ForgotPassword/ForgotPassword')
    ),
  },
  {
    path: '/reset-password',
    component: lazy(() =>
      import('@iso/containers/Pages/ResetPassword/ResetPassword')
    ),
  },
  {
    path: '/auth0loginCallback',
    component: lazy(() =>
      import('@iso/containers/Authentication/Auth0/Auth0Callback')
    ),
  },
  // {
  //   path: '/test/:assignmentId',
  //   component: lazy(() => import('@iso/containers/Assignment/View/Assignment')),
  //   exact: true,
  // },
];
function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <Route
              path='/test/:assignmentId'
              component={lazy(() =>
                import('@iso/containers/Assignment/View/Assignment')
              )}
            ></Route>
            <Route
              path='/quizz/:assignmentId'
              component={lazy(() =>
                import('@iso/containers/Student/Assignment/View/Assignment')
              )}
            ></Route>
            <PrivateRoute>
              {/* role routes */}
              <AdminLayout />
            </PrivateRoute>
            <Redirect to='/404' />
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
