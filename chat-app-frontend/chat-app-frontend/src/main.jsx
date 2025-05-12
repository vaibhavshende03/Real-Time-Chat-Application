import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import MyRoutes from './config/MyRoutes.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Toaster  position="top-center"
  reverseOrder={true}/>
    <MyRoutes />
     </BrowserRouter>
  </StrictMode>,
)
