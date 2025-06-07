import Login from './components/Login';
import { Register } from './components/Register';
// App.tsx or main.tsx
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/register' element = {<Register/>} />
            <Route path= '/login' element = {<Login/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App