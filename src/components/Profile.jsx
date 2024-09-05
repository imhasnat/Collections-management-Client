import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const contactData = {
    //   name: user.name,
    //   email: user.email,
    //   phone,
    // };

    try {
      // const response = await fetch(
      //   `https://collections-management-server.onrender.com/salesforce/auth?name=${name}&phone=${phone}&email=${email}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      // const data = await response.json();
      // console.log("Response from backend:", data);
      // console.log(contactData);

      const response = await axios.post(
        "https://collections-management-server.onrender.com/oauth2/callback",
        {
          name,
          phone,
          email,
          user_id: user.id,
        },
        { withCredentials: true }
      );

      window.location.href = response.data.authUrl;

      togglePopup();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="px-6 py-10">
      <div className="max-w-md mx-auto rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-6 p-6">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt="profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Role: {user.role}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
        <button
          onClick={togglePopup}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-b-lg hover:bg-blue-600 transition duration-200"
        >
          Connect to Salesforce
        </button>
      </div>

      {/* Modal Popup */}
      {showPopup && (
        <div className="">
          <div className="fixed inset-0 flex sm:left-0 md:left-32 px-7 items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Create Contact
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First Name"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-100"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-100"
                  disabled
                  required
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:text-gray-100"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={togglePopup}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Create Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
