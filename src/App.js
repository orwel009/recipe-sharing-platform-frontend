import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ProtectedRoute from './components/ProtectedRoute'
import ViewRecipe from './pages/ViewRecipe/ViewRecipe';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/recipes/:id" element={<ViewRecipe />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
