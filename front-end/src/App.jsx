import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/aboutus' element={<Home element='aboutus' />}></Route>
      <Route path='/gallery' element={<Home element='gallery' />}></Route>
      <Route path='/auth' element={<LoginForm />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
