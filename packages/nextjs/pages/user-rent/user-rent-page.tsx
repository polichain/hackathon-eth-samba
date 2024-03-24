import React from "react";
import { Button, Typography } from "@mui/material";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Pagination } from "~~/types/pagination";

interface UserRentPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const UserRentPage: React.FC<UserRentPageProps> = ({ setCurrentPage }: UserRentPageProps) => {
  const { address } = useAccount();

  const RentData = useScaffoldContractRead({
    contractName: "Rent",
    functionName: "getContracts",
    args: [address],
  });

  const ContractState = useScaffoldContractRead({
    contractName: "Rent",
    functionName: "getContractState",
    args: [address],
  });

  const InsuranceAmount = useScaffoldContractRead({
    contractName: "Rent",
    functionName: "getInsuranceAmount",
    args: [address],
  });

  const { writeAsync: payInsuranceAsync } = useScaffoldContractWrite({
    contractName: "Rent",
    functionName: "payInsurance",
    value: parseEther((InsuranceAmount.data && InsuranceAmount.data.toString()) || "0"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: abortContractAsync } = useScaffoldContractWrite({
    contractName: "Rent",
    functionName: "abortContract",
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const handleAccept = async () => {
    try {
      await payInsuranceAsync();
      console.log("Insurance paid successfully!");
    } catch (error) {
      console.error("Error paying insurance:", error);
    }
  };

  const handleTermination = async () => {
    try {
      await abortContractAsync();
      console.log("Contract terminated successfully!");
    } catch (error) {
      console.error("Error abortating contract", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h1" component="h2" color="#FF6600" fontFamily={"Roboto"}>
          Your Contract:
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="body1">{RentData.data}</Typography>
          {ContractState.data === 1 && (
            <Button variant="outlined" color="success" onClick={handleAccept} sx={{ mt: 2 }}>
              <Typography variant="h5" fontWeight="600" color={"#83E509"}>
                Accept
              </Typography>
            </Button>
          )}
          {ContractState.data === 2 && (
            <Button variant="outlined" color="error" onClick={handleTermination} sx={{ mt: 2 }}>
              <Typography variant="h5" fontWeight="600" color={"#CF0E0E"}>
                Termination
              </Typography>
            </Button>
          )}
          <Button
            variant="outlined"
            color="warning"
            onClick={() => setCurrentPage(Pagination.RoleSelector)}
            sx={{ mt: 2 }}
          >
            <Typography variant="h5" fontWeight="600" color={"#FF6600"}>
              Go Back
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};
