import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Pagination } from "~~/types/pagination";

interface UserRentPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const UserRentPage: React.FC<UserRentPageProps> = ({ setCurrentPage }: UserRentPageProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h1" component="h2" color="#3396FF">
          Your Contract:
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
