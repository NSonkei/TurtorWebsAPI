import './App.css';
import {Fragment, useState} from 'react' 
import Login from './Login'
function App() {
  const [isLogging,setIsLogging] = useState(false)
  return (
    <Fragment>
        {!isLogging && <Login setIsLogging={setIsLogging}></Login>}
    </Fragment>
  )
}

export default App;
