import { Button, Typography } from "@mui/material";
import { Pagination } from "~~/types/pagination";

interface RoleSelectorPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const RoleSelectorPage: React.FC<RoleSelectorPageProps> = ({ setCurrentPage }: RoleSelectorPageProps) => {
  return (
    <div className="d-flex justify-content-center gap-3 p-3">
      <Button
        variant="outlined"
        onClick={() => {
          setCurrentPage(Pagination.UserRent);
        }}
      >
        <Typography variant="subtitle2" fontWeight="600">
          User
        </Typography>
      </Button>

      <Button
        variant="outlined"
        onClick={() => {
          setCurrentPage(Pagination.AdmRent);
        }}
      >
        <Typography variant="subtitle2" fontWeight="600">
          Admin
        </Typography>
      </Button>
    </div>
  );
};
