import './App.css'
import { ToastContainer} from 'react-toastify';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './components/Dashboard';
import User from './components/User'
import AddFriend from './components/AddFriend';
import ViewFriend from './components/ViewFriend';

function App() {
  return(
    <>
      <ToastContainer position='bottom-right' autoClose={2000}/>

      <Router>
          <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/dashboard' element={<Dashboard/>}>
                 <Route path='user' element={<User/>}/>
                 <Route path='addfriend' element={<AddFriend/>}/>
                 <Route path='viewfriend' element={<ViewFriend/>}/>
              </Route>
          </Routes>
      </Router>
    </>
  )
}
export default App;