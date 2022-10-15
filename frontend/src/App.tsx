import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import './App.css'
import { CreateProduct } from './components/CreateProduct/CreateProduct';
import { Products } from './containers/Products/Products';

const queryClient = new QueryClient();

function App() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const onOpenCreateModal = () => setOpenCreateModal(true);
  const onCloseCreateModal = () => setOpenCreateModal(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='header'>
        <button className='create-button' onClick={onOpenCreateModal}>Nuevo Producto</button>
      </div>
      <div className="App">
        {openCreateModal && <CreateProduct onCloseModal={onCloseCreateModal} />}
        <Products />
      </div>
    </QueryClientProvider>
  )
}

export default App
