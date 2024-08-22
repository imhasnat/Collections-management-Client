import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import Table from "../components/Table";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome back {user?.name}</h2>
      <Link to={"/registration"}>Sign Up</Link> <br />
      <Link to={"/login"}>Sign In</Link> <br />
      <Link to={"/collection"}>Collection</Link> <br />
    </div>
  );
};

export default HomePage;
