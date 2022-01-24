// import logo from './logo.svg';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import React  from 'react';
import DashBoard from './pages/DashBoardPage/DashBoardPage';
import LoginPage from './pages/LoginPage/loginPage';
import SignupPage from './pages/SignupPage/signupPage';
// import "react-bootstrap/dist/react-bootstrap.min.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/"  element={< DashBoard />} />
          <Route path="/loginPage"  element={< LoginPage />} />
          <Route path="/signupPage"  element={< SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;