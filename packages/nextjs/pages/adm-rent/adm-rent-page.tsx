import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Pagination } from "~~/types/pagination";

interface AdmRentPageProps {
  setCurrentPage: (page: Pagination) => void;
}

const handleClick = () => {
  alert("escolhe outro botão");
};

export const AdmRentPage: React.FC<AdmRentPageProps> = ({ setCurrentPage }: AdmRentPageProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h1" component="h2" color="#3396FF">
          You want:
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage(Pagination.RentCreate)}
            sx={{ p: "40px 80px", fontSize: "120px", margin: "0 100px" }}
          >
            <Typography variant="h5" fontWeight="600">
              Create Contract
            </Typography>
          </Button>

          <Button
            variant="outlined"
            onClick={handleClick}
            sx={{ p: "40px 80px", fontSize: "120px", margin: "0 100px" }}
          >
            <Typography variant="h5" fontWeight="600">
              Show Contracts
            </Typography>
          </Button>

          <br></br>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage(Pagination.RoleSelector)}
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
