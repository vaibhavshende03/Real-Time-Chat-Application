import React from 'react'
import App from '../App.jsx'
import { Routes, Route } from "react-router";
import ChatPage from '../components/ChatPage.jsx';
const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<ChatPage/>} />
        <Route path="/about" element={<h1>This is About Page</h1>} />

        <Route path="*" element={<h1>404 Page Not Found </h1>} />
     </Routes>
  )
}

export default MyRoutes