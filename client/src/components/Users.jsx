import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { profile, admin } from "../assets";
import { useStateContext } from "../context";

const Users = () => {
  const { allUsers, setAllUsers, getAllUsers, deleteUser } = useStateContext();

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (id, role) => {
    // alert(`Deleted ${id}`);
    if (role === "admin") {
      toast.info("Admin Cannot be Deleted", {
        position: "top-left",
      });
    } else {
      deleteUser(id);
      let filteredUsers = allUsers.filter((item) => item._id !== id);
      // console.log("FILTERED: ", filteredUsers);
      setAllUsers(filteredUsers);
    }
  };

  // {
  //   allUsers ? console.log(allUsers) : "";
  // }

  return (
    <div>
      {allUsers ? (
        <>
          <div className="ml-4 font-semibold text-[20px] mt-4">
            All Users: ({allUsers.length})
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user) => (
              <React.Fragment key={Math.random()}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.email}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.role === "user" ? (
                      <>
                        <div>
                          <img src={profile} alt="user" className="h-6 w-6" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <img src={admin} alt="admin" className="w-6 h-6" />
                        </div>
                      </>
                    )}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleDelete(user._id, user.role)}
                    >
                      Delete User
                    </button>
                  </th>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
