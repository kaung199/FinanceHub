import React, { useEffect, useState } from "react";
import "./index.css";
import useFetchAllData from "./hooks/useFetchAllData";
import useIncomeHistory from "./hooks/useIncomeHistory";
import useOutcomeHistory from "./hooks/useOutcomeHistory";

import User from "./component/user";
import DetailedModal from "./component/modal/detail";
import Getstart from "./component/getstart";
import useCreateUser from "./hooks/useAddUser";
import useDeleteUser from "./hooks/usedeleteUser";
import useUpdateInOutHistory from "./hooks/useUpdateInOutHistory";

function App() {
  const url = "http://localhost:3001/users/";

  // fetch all user data
  const [users, setUsers] = useState([]);
  const { data, loading, error } = useFetchAllData(url);
  const [userNameAndId, setUserNameAndId] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }

    // let nameAndId = data.map((user) => {
    //   return { name: user.name, id: user.id };
    // });

    // setUserNameAndId(nameAndId);
  }, [data]);

  useEffect(() => {
    if (users && Array.isArray(users)) {
      const nameAndId = users.map(({ name, id }) => ({ name, id })); // Extract name and id from users
      setUserNameAndId(nameAndId); // Update the nameAndId state
    }
  }, [users]);

  // update income history
  const { addIncomeHistory, loadingAddIncome, errorAddIncome } =
    useIncomeHistory(url);
  const addIncome = async (userId, newIncome) => {
    const addIncomeSuccess = await addIncomeHistory(userId, newIncome);
    if (addIncomeSuccess) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id == userId) {
            return {
              ...user,
              incomeHistory: [...user.incomeHistory, newIncome],
            };
          }

          return user;
        })
      );
    }
  };

  // update outcome history
  const { addOutcomeHistory } = useOutcomeHistory(url);
  const addOutcome = async (userId, newOutcome) => {
    try {
      const success = await addOutcomeHistory(userId, newOutcome);

      if (success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user.id == userId) {
              // Update or add the new outcome in the outcomeHistory array
              const updatedOutcomeHistory = user.outcomeHistory.map((outcome) =>
                outcome.relatedUserId === newOutcome.relatedUserId
                  ? {
                      ...outcome,
                      amount:
                        Number(outcome.amount) + Number(newOutcome.amount),
                    }
                  : outcome
              );

              // Check if the newOutcome.relatedUserId is not in the existing history
              const isNewOutcome = !user.outcomeHistory.some(
                (outcome) => outcome.relatedUserId === newOutcome.relatedUserId
              );

              if (isNewOutcome) {
                updatedOutcomeHistory.push(newOutcome);
              }

              return {
                ...user,
                outcomeHistory: updatedOutcomeHistory,
              };
            }

            return user;
          })
        );
      }
    } catch (error) {
      console.error("Failed to add outcome:", error);
    }
  };

  // add new user
  const { addUser, loadingAddUser, errorAddUser } = useCreateUser(url);
  const addNewUser = async (newUser) => {
    const addUserSuccess = await addUser(newUser);
    if (addUserSuccess) {
      setUsers((prevUsers) => [...(prevUsers || []), newUser]);
    }
  };

  // delete user
  const { deleteUser, loadingDeleteUser, errorDeleteUser } = useDeleteUser(url);
  const deleteUserById = async (id) => {
    const deleteUserSuccess = await deleteUser(id);
    if (deleteUserSuccess) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  // update income and outcome history
  const {
    updateIncomeHistory,
    updateOutcomeHistory,
    loadingUpdateInOut,
    errorUpdateInOut,
  } = useUpdateInOutHistory(url);

  const handleUpdateIncome = async (userId, ioRelatedId, newAmount) => {
    const updatedHistory = await updateIncomeHistory(
      userId,
      ioRelatedId,
      newAmount
    );
    if (updatedHistory) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              incomeHistory: user.incomeHistory.map((income) =>
                income.ioRelatedId === ioRelatedId
                  ? { ...income, amount: Number(newAmount) }
                  : income
              ),
            };
          }
          return user;
        })
      );
    }
  };

  const handleUpdateOutcome = async (userId, ioRelatedId, newAmount) => {
    const updatedHistory = await updateOutcomeHistory(
      userId,
      ioRelatedId,
      newAmount
    );
    if (updatedHistory) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              outcomeHistory: user.outcomeHistory.map((outcome) =>
                outcome.ioRelatedId === ioRelatedId
                  ? { ...outcome, amount: Number(newAmount) }
                  : outcome
              ),
            };
          }
          return user;
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg">
        Finance Hub
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {users.length !== 0 &&
          users.map((user) => (
            <User
              user={user}
              userNameAndId={userNameAndId}
              key={user.id}
              addIncome={addIncome}
              addOutcome={addOutcome}
              users={users}
              addNewUser={addNewUser}
              deleteUserById={deleteUserById}
              handleUpdateIncome={handleUpdateIncome}
              handleUpdateOutcome={handleUpdateOutcome}
            />
          ))}
        <DetailedModal />
      </div>
      {users.length === 0 && <Getstart users={users} addNewUser={addNewUser} />}
    </div>
  );
}

export default App;
