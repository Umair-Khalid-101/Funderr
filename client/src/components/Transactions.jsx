import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState();

  const config = {
    apiKey: "PBOq6Sp5OkVAcPP4bMnMHOclngNxG4O5",
    network: Network.ETH_GOERLI,
  };
  const alchemy = new Alchemy(config);

  const getTransactions = async (address) => {
    const data = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: address,
      category: ["external", "internal", "erc20", "erc721", "erc1155"],
    });
    // console.log(data);
    setTransactionsData(data);
  };

  const getWalletAddress = async () => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        // Return the address of the wallet
        // console.log(res);
        getTransactions(res[0]);
        // console.log("Transactions: ", transactionsData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletAddress();
  }, []);

  return (
    <>
      {transactionsData ? (
        <>
          <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      To
                    </th>
                    <th scope="col" className="px-6 py-3">
                      From
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsData.transfers.map((transaction) => (
                    <React.Fragment key={Math.random()}>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {transaction.to}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {transaction.from}
                        </th>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {transaction.value} ETH
                        </th>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="font-semibold flex items-center 
            justify-center min-h-screen min-w-full text-[20px]"
          >
            NO TRANSACTIONS YET
          </div>
        </>
      )}
    </>
  );
};

export default Transactions;
