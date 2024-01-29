import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1>Welcome to CRUD Laravel React</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
