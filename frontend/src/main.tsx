import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import router from './routes.tsx'
import store from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
 <RouterProvider router={router} />
 </Provider>
</StrictMode>,

)
