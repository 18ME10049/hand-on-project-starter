// import logo from './logo.svg';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import React  from 'react';
import DashBoard from './pages/DashBoardPage/DashBoardPage';
import LoginPage from './pages/LoginPage/loginPage';
import SignupPage from './pages/SignupPage/signupPage';
// import "react-bootstrap/dist/react-bootstrap.min.js";
import BgRemover from './pages/BgRemover/bg-remover';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/"  element={< DashBoard />} />
          <Route path="/loginPage"  element={< LoginPage />} />
          <Route path="/signupPage"  element={< SignupPage />} />
          <Route path="/bg-remover" element={<BgRemover/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;