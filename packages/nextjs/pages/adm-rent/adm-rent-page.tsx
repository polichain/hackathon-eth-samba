import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Pagination } from "~~/types/pagination";

interface AdmRentPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const AdmRentPage: React.FC<AdmRentPageProps> = ({ setCurrentPage }: AdmRentPageProps) => {
  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom color="primary">
          <Button>Create Rent</Button>
        </Typography>
      </Paper>
    </Container>
  );
};
