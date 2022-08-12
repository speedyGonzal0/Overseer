import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login/Login.js';

function App() {
  return (
    <main className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
