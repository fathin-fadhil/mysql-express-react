import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginForm from "./pages/LoginForm";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<LoginForm />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
