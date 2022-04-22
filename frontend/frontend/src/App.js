import logo from './logo.svg';
import './App.css';
import {Fragment, useState} from 'react' 
import Login from './Login'
import GlobalSCSS from './Global/SCSS'
function App() {
  const [isLogging,setIsLogging] = useState(false)
  return (
    <GlobalSCSS>
      {!isLogging && <Login></Login>}
    </GlobalSCSS>
  )
}

export default App;
