import React from 'react';
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard/Dashboard';
import ErrorBoundary from './components/common/ErrorBoundary';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      500: '#319795',
      900: '#234E52',
    },
  },
});

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <QueryClientProvider client={queryClient}>
        <Router>
          <ErrorBoundary>
            <AnimatePresence mode='wait'>
              <Routes>
                <Route path="/*" element={<Dashboard />} />
              </Routes>
            </AnimatePresence>
          </ErrorBoundary>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;