import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import { Products } from './containers/Products/Products';
import { CartProvider } from './context/CartProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Products />} />
            </Routes>
          </BrowserRouter>
        </div>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
