import './App.css'
import { ToastContainer} from 'react-toastify';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return(
    <>
      <ToastContainer position='bottom-right' autoClose={2000}/>

      <Router>
          <Routes>
              <Route path=''/>
          </Routes>
      </Router>
    </>
  )
}
export default App;