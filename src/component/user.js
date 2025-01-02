import React, { useEffect, useState } from "react";
import Income from "./income/income";
import Outcome from "./outcome/outcome";
import DetailedModal from "./modal/detail";
import NewUser from "./modal/newUser";
import SingleListIncome from "./income/singleListIncome";

export default function User({
  user,
  userNameAndId,
  addIncome,
  addOutcome,
  users,
  addNewUser,
  deleteUserById,
  handleUpdateIncome,
  handleUpdateOutcome,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddUserModal, setAddUserModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  let deleteUser = (id) => {
    deleteUserById(id);
    setShowConfirmModal(false);
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2
          className="text-2xl font-bold mb-4 cursor-pointer hover:text-yellow-700 transition duration-300"
          onClick={() => setIsOpen(true)}
          title="Click to View Details"
        >
          {user.name}
        </h2>
        <Income
          incomeHistory={user.incomeHistory}
          user={user}
          userNameAndId={userNameAndId}
          addIncome={addIncome}
          addOutcome={addOutcome}
        />
        <Outcome outcomeHistory={user.outcomeHistory} />
      </div>

      {isOpen && (
        <DetailedModal
          key={user.id}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <>
            {/* Overlay */}
            <div className="fixed inset-0 z-40 bg-black bg-opacity-75"></div>

            {/* Modal Content */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsOpen(false);
                }
              }}
            >
              <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-full overflow-auto z-50">
                {/* Modal Header */}
                <div className="flex justify-between items-center bg-gray-100 px-6 py-4 border-b">
                  <h2 className="text-xl font-bold text-gray-800">
                    {user.name}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-red-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                {/* Modal Body */}
                <div className="px-6 py-4 space-y-4">
                  <h3 className="text-xl font-semibold text-green-500 mb-4">
                    Inflow Details
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="px-6 py-3 text-left text-gray-800 font-medium">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-gray-800 font-medium">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-gray-800 font-medium">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.incomeHistory.map((item, index) => (
                          <tr
                            key={item.ioRelatedId}
                            className="border-b hover:bg-green-50"
                          >
                            <td className="px-6 py-3">{item.name}</td>
                            <td className="px-6 py-3">{item.date}</td>
                            <SingleListIncome
                              key={item.ioRelatedId}
                              user={user}
                              item={item}
                              handleUpdateIncome={handleUpdateIncome}
                              handleUpdateOutcome={handleUpdateOutcome}
                            />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Outflow Details */}
                  <h3 className="text-xl font-semibold text-red-500 mt-8 mb-4">
                    Outflow Details
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                      <thead>
                        <tr className="bg-red-100">
                          <th className="px-6 py-3 text-left text-gray-800 font-medium">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-gray-800 font-medium">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-gray-800 font-medium">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.outcomeHistory.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b hover:bg-green-50"
                          >
                            <td className="px-6 py-3">{item.name}</td>
                            <td className="px-6 py-3">{item.date}</td>
                            <td className="px-6 py-3 text-red-500 cursor-pointer hover:text-yellow-700 transition duration-300 text-right">
                              {item.amount} MMK
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end px-6 py-4 border-t bg-gray-100 space-x-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowConfirmModal(true);
                    }}
                    className="px-4 py-2 bg-red-500 rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setAddUserModal(true);
                    }}
                    className="px-4 py-2 bg-green-500 rounded hover:bg-yellow-400"
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </>
        </DetailedModal>
      )}

      {isAddUserModal && (
        <NewUser
          close={() => setAddUserModal(false)}
          users={users}
          addNewUser={addNewUser}
        />
      )}

      {showConfirmModal && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40 bg-black bg-opacity-60"></div>

          {/* Modal Content */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowConfirmModal(false);
              }
            }}
          >
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold text-red-900">
                  Confirm Deletion !!
                </h2>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{user.name}</span>? This action
                cannot be undone.
              </p>

              {/* Footer */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteUser(user.id);
                    setShowConfirmModal(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
