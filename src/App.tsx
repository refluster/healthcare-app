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
import ProfilePage from './page/profile';
import HealthcarePage from './page/healthcare';
import IntroPage from './page/intro';
import StatsPage from './page/stats';

function routes() {
  return [
    {
      path: "/",
      element: <IndexPage />
    }, {
      path: "/stats",
      element: <StatsPage />
    }, {
      path: "/healthcare",
      element: <HealthcarePage />
    }, {
      path: "/profile",
      element: <ProfilePage />
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
      background: "#ccc",
    }}>
    <div style={{
      minHeight: '100vh',
      color: theme.palette.text.primary,
      maxWidth: 420,
      marginRight: 'auto',
      marginLeft: 'auto',
      position: 'relative',
      background: "#fff",
      left: 0,
      right: 0,
    }}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <AppInner />
  )
}

export default App;
