import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ProtectedRoute from './components/ProtectedRoute'
import ViewRecipe from './pages/ViewRecipe/ViewRecipe';
import AddRecipe from './pages/AddRecipe/AddRecipe';
import EditRecipe from './pages/EditRecipe/EditRecipe';
import MyRecipes from './pages/MyRecipes/MyRecipes';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/recipes/:id" element={<ViewRecipe />} />
        <Route path="/add-recipes" element={<ProtectedRoute><AddRecipe/></ProtectedRoute>} />
        <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes/></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
