import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalog from './pages/Catalog';
import RequireAuth from './components/RequireAuth';
import Signout from "./components/Signout";
import NoRequiredAuth from './components/NoRequiredAuth'
import Admin from "./pages/Admin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path='/' element={<Home />}></Route>
        <Route path='/aboutus' element={<Home element='aboutus' />}></Route>
        <Route path='/gallery' element={<Home element='gallery' />}></Route>            

        {/* protected route */}
        <Route element={<RequireAuth allowedRole='user' />}>
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/signout" element={<Signout ></Signout>}></Route>
        </Route>

        <Route element={<RequireAuth allowedRole='admin'/>}>
          <Route path="/admin" element={<Admin />}></Route>
        </Route>

        {/* deny access if already logged in  */}
        <Route element={<NoRequiredAuth />}>
          <Route path='/auth' element={<LoginForm />}></Route>    
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
