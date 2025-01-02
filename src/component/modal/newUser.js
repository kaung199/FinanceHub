import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
export default function NewUser({ close, users, addNewUser }) {
  let [userName, setUserName] = useState("");

  let newUser = (e) => {
    e.preventDefault();
    let userId = "1";

    if (users && users.length > 0) {
      userId = Math.max(...users.map((user) => Number(user.id))) + 1;
    }

    let newUser = {
      id: String(userId),
      name: userName,
      incomeHistory: [],
      outcomeHistory: [],
    };

    addNewUser(newUser);
    setUserName("");
    close();
  };

  return ReactDom.createPortal(
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>

      {/* Modal Content */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            close();
          }
        }}
      >
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
              <h2 className="text-2xl font-bold mb-4">Add New User</h2>

              <form onSubmit={newUser}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    User Name
                  </label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    id="username"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={close}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      !userName ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!userName}
                  >
                    Add
                  </button>
                </div>
              </form>
              <button
                onClick={close}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}
