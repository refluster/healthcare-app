import React from 'react';
import './App.css';

import theme from './lib/theme';
import { ThemeProvider } from "@mui/material/styles";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import IndexPage from './page';
import ConfigPage from './page/config';
import HealthcarePage from './page/healthcare';
import IntroPage from './page/intro';

function routes() {
  return [
    {
      path: "/",
      element: <IndexPage />
    }, {
      path: "/healthcare",
      element: <HealthcarePage />
    }, {
      path: "/config",
      element: <ConfigPage />
    }, {
      path: "/intro",
      element: <IntroPage />
    }, {
      path: "*",
      element: <Navigate to="/" replace />
    },
  ];
}

const AppInner: React.FC = () => {
  const router = createBrowserRouter(routes());

  return (
    <div style={{
      minHeight: '100vh',
      color: theme.palette.text.primary,
      maxWidth: 420,
      marginRight: 'auto',
      marginLeft: 'auto',
      position: 'absolute',
      left: 0,
      right: 0,
    }}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <AppInner />
  )
}

export default App;
