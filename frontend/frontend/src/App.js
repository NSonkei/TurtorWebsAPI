import './App.css';
import {Routes, Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/home" element={<Home/>}></Route>
    </Routes>       
  )
}

export default App;
