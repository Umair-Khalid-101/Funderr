import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { profile, admin, search } from "../assets";
import { useStateContext } from "../context";

const Users = () => {
  const { allUsers, setAllUsers, getAllUsers, deleteUser } = useStateContext();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  // SEARCH FUNCTION
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

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
          <div
            className="xl:w-[90vw] lg:w-[85vw] md:w-[80vw] w-[75vw]
      flex justify-end"
          >
            <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
              <input
                type="text"
                placeholder="Search User"
                className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
                onChange={handleSearch}
              />
              <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
                <img
                  src={search}
                  alt="search"
                  className="w-[15px] h-[15px] object-contain"
                />
              </div>
            </div>
          </div>
          <div className="ml-4 font-semibold text-[20px] mb-2">
            All Users: ({allUsers.length})
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            {allUsers
              ?.filter((user) => {
                if (searchInput === "") {
                  return user;
                } else if (
                  user.name.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((user) => (
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
