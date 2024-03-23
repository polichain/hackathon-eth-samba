import { Button, Typography, colors } from "@mui/material";
import { Pagination } from "~~/types/pagination";

interface RoleSelectorPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const RoleSelectorPage: React.FC<RoleSelectorPageProps> = ({ setCurrentPage }) => {
  const handleRoleSelect = (page: Pagination) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h1" component="h2" color="#3396FF">
          You are:
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            variant="outlined"
            onClick={() => handleRoleSelect(Pagination.UserRent)}
            sx={{ p: "40px 80px", fontSize: "120px", margin: "0 100px" }}
          >
            <Typography variant="h5" fontWeight="600">
              User
            </Typography>
          </Button>

          <Button
            variant="outlined"
            onClick={() => handleRoleSelect(Pagination.AdmRent)}
            sx={{ p: "40px 80px", fontSize: "120px", margin: "0 100px" }}
          >
            <Typography variant="h5" fontWeight="600">
              Admin
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};
