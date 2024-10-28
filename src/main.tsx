import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import UserProvider from '@/providers/user-provider.tsx';
import App from './App';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
        <Toaster />
      </DndProvider>
    </UserProvider>
  </QueryClientProvider>,
);
