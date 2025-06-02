import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
      <hr />
      <main>
        <Outlet /> {/* Child routes will render here */}
      </main>
      <footer>
        <p>© 2023 Banking App</p>
      </footer>
    </div>
  );
};
export default Layout;
