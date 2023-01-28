import React, { useEffect, useState } from "react";

import { useStateContext } from "../../context";
import { Loader, Notifications } from "../../components";

const UserNotifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { getUserNotifications } = useStateContext();

  useEffect(() => {
    setIsLoading(true);
    getUserNotifications();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="xl:min-w-[90vw] lg:min-w-[85vw] md:min-w-[80vw] min-w-[75vw]">
        <Loader type="Notifications" />
      </div>
    );
  }

  return (
    <div className="xl:w-[90vw] lg:w-[88vw] md:w-[85vw] w-[70vw] mt-8">
      <Notifications />
    </div>
  );
};

export default UserNotifications;
