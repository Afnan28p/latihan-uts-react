import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom"; // Mengimpor BrowserRouter, Route, dan NavLink dari react-router-dom

// Lazy loading untuk komponen Home dan GundamList
const Home = React.lazy(() => import("./components/Home"));
const GundamList = React.lazy(() => import("./components/Gundam/List"));
const GundamCreate = React.lazy(() => import("./components/Gundam/Create"));
const GundamEdit = React.lazy(() => import("./components/Gundam/Edit"));


const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/gundam">
                  Gundam
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/gundam"
              element={
                  <GundamList />
              }
            />
            <Route
              path="/gundam/create"
              element={
                  <GundamCreate />
              }
            />
            <Route
              path="/gundam/edit/:id"
              element={
                  <GundamEdit />
              }
            />
          </Routes>
        </Suspense>

        <div>&copy; 2024 Mahasiswa</div>
      </div>
    </Router>
  );
};

export default App;