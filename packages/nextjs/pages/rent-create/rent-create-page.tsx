import { useEffect, useState } from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Pagination } from "~~/types/pagination";

interface RentCreatePageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const RentCreatePage: React.FC<RentCreatePageProps> = ({ setCurrentPage }: RentCreatePageProps) => {
  const [Insurance, setInsurance] = useState("");
  const [RentAmount, setRentAmount] = useState("");
  const [Duration, setDuration] = useState("");
  const [RenterAddress, setRenterAddress] = useState("");

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "Rent",
    functionName: "createNewContract",
    args: [RenterAddress, BigInt(Insurance), BigInt(RentAmount), BigInt(Duration)],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h1" component="h2" color="#FF6600">
          Contract Info:
        </Typography>
        <br></br>
        <br></br>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            background: "rgba(170, 170, 170, 1)",
            borderRadius: "10px",
            height: "30vh",
            width: "30%",
            margin: "auto",
            textAlign: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              color="warning"
              id="renterAddr"
              label="Renter Wallet Addres"
              defaultValue="0xE891B06c6D7314736a08f379c25DC970c8bC2C1d"
              value={RenterAddress}
              onChange={e => setRenterAddress(e.target.value)}
            />
            <br></br>
            <TextField
              id="insurance"
              color="warning"
              label="Insurance Amont"
              type="number"
              value={Insurance}
              onChange={e => setInsurance(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br></br>
            <TextField
              id="rent"
              color="warning"
              label="Rent Amont"
              type="number"
              value={RentAmount}
              onChange={e => setRentAmount(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br></br>
            <TextField
              id="duration"
              color="warning"
              label="Duration (months)"
              type="number"
              value={Duration}
              onChange={e => setDuration(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br></br>
          </div>
        </Box>
        <br></br>
        <br></br>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            variant="outlined"
            color="warning"
            //onClick={() => setCurrentPage(Pagination.RentCreate)}
            onClick={() => writeAsync()}
            sx={{ p: "40px 80px", fontSize: "120px", margin: "0 100px" }}
          >
            <Typography variant="h5" fontWeight="600">
              Create Contract
            </Typography>
          </Button>

          <Button
            variant="outlined"
            color="warning"
            onClick={() => setCurrentPage(Pagination.AdmRent)}
            sx={{ p: "40px 80px", fontSize: "120px", margin: "0 100px" }}
          >
            <Typography variant="h5" fontWeight="600">
              Go Back
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};
