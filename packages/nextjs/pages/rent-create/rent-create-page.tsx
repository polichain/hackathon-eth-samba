import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Pagination } from "~~/types/pagination";

interface RentCreatePageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const RentCreatePage: React.FC<RentCreatePageProps> = ({ setCurrentPage }: RentCreatePageProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h1" component="h2" color="#3396FF">
          Contract Info:
        </Typography>
        <br></br>
        <br></br>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="renterAddr"
              label="Renter Wallet Addres"
              defaultValue="0xE891B06c6D7314736a08f379c25DC970c8bC2C1d"
            />
            <br></br>
            <TextField
              id="insurance"
              label="Insurance Amont"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br></br>
            <TextField
              id="rent"
              label="Rent Amont"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br></br>
            <TextField
              id="duration"
              label="Duration (months)"
              type="number"
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
            //onClick={() => setCurrentPage(Pagination.RentCreate)}
            sx={{ p: "40px 80px", fontSize: "120px", margin: "0 100px" }}
          >
            <Typography variant="h5" fontWeight="600">
              Create Contract
            </Typography>
          </Button>

          <Button
            variant="outlined"
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
