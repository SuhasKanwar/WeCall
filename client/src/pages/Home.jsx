import React from "react";

const Home = () => {
  return (
    <div className="container">
        <div>
            <input type="email" placeholder="Enter your email" />
            <input type="text" placeholder="Enter your room code" />
            <button>Enter Room</button>
        </div>
    </div>
  );
};

export default Home;