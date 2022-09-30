import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import './App.css'
import { CreateOrder } from './components/CreateOrder/CreateOrder';
import { Orders } from './components/Orders/Orders';

const queryClient = new QueryClient();

function App() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const onOpenCreateModal = () => setOpenCreateModal(true);
  const onCloseCreateModal = () => setOpenCreateModal(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='header'>
        <button className='create-button' onClick={onOpenCreateModal}>Nueva Orden</button>
      </div>
      <div className="App">
        {openCreateModal && <CreateOrder onCloseModal={onCloseCreateModal} />}
        <Orders />
      </div>
    </QueryClientProvider>
  )
}

export default App
