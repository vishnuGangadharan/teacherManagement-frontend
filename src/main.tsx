import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {NextUIProvider} from '@nextui-org/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Provider } from 'react-redux';
import store from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <NextUIProvider>
  <Provider store={store}>
    <App />
    </Provider>
  <ToastContainer />
  </NextUIProvider>
  </StrictMode>,
)
