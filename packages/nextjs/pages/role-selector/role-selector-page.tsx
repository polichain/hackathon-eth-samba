import { Box, Button, Typography, colors } from "@mui/material";
import { Pagination } from "~~/types/pagination";

interface RoleSelectorPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const RoleSelectorPage: React.FC<RoleSelectorPageProps> = ({ setCurrentPage }) => {
  const handleRoleSelect = (page: Pagination) => {
    setCurrentPage(page);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      textAlign="center"
      fontFamily="Roboto, sans-serif" // Use a sophisticated font like Roboto
    >
      <Typography variant="h1" component="h2" color="#FF6600">
        {" "}
        {/* Dark yellow color */}
        You are:
      </Typography>
      <br />
      <br />
      <Button
        variant="outlined"
        color="warning"
        onClick={() => handleRoleSelect(Pagination.UserRent)}
        sx={{ p: "40px 80px", fontSize: "40px", margin: "0 20px" }}
      >
        <Typography variant="h5" fontWeight="600">
          User
        </Typography>
      </Button>

      <Button
        variant="outlined"
        color="warning"
        onClick={() => handleRoleSelect(Pagination.AdmRent)}
        sx={{ p: "40px 80px", fontSize: "40px", margin: "0 20px" }}
      >
        <Typography variant="h5" fontWeight="600">
          Admin
        </Typography>
      </Button>
    </Box>
  );
};
