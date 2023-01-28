import React from "react";

const RecentDonations = ({ campaignDonations }) => {
  // console.log("Donations: ", campaignDonations);
  return (
    <div className="lg:mt-4 xl:mr-8 lg:mr-4">
      <div className="font-semibold text-[20px] mb-[-15px]">
        Recent Donations:
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                From
              </th>
            </tr>
          </thead>
          <tbody>
            {campaignDonations?.map((donation) => (
              <React.Fragment key={Math.random()}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {donation.amount}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white overflow-hidden"
                  >
                    {donation.from}
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

export default RecentDonations;
