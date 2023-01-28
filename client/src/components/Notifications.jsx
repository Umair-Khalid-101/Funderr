import React from "react";

import { Unread, Read } from "../assets";
import { useStateContext } from "../context";

const Notifications = () => {
  const { userNotifications, setUserNotifications, markAsRead } =
    useStateContext();
  const handleRead = async (id, notification) => {
    notification.status = "read";
    let updatedNotifications = userNotifications.map((item) => {
      return item._id === id ? { ...item, status: "read" } : item;
    });
    // console.log("UpdatedNotifications: ", updatedNotifications);
    setUserNotifications(updatedNotifications);
    markAsRead(id);
  };

  return (
    <>
      {userNotifications ? (
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Notification
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {userNotifications.map((notification) => (
                  <React.Fragment key={Math.random()}>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {notification.message}
                      </th>
                      <td className="px-6 py-4">
                        {notification.status === "unread" ? (
                          <div className="flex items-center">
                            <div className="mr-2">{notification.status}</div>
                            <img
                              src={Unread}
                              alt="unread"
                              className="w-5 h-5"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="mr-2">{notification.status}</div>
                            <img src={Read} alt="read" className="w-6 h-6" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() =>
                            handleRead(notification._id, notification)
                          }
                        >
                          {notification.status === "unread"
                            ? "Mark As Read"
                            : ""}
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div
            className="min-h-screen xl:min-w-[90vw] lg:min-w-[85vw] md:min-w-[80vw] min-w-[75vw]
        flex justify-center items-center"
          >
            <div className="flex-col items-center justify-center">
              <div className="text-black font-semibold text-[20px]">
                You don't have any Notifications!!!
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Notifications;
