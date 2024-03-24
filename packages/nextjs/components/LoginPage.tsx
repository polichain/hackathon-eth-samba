import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Pagination } from "~~/types/pagination";

interface LoginPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setCurrentPage }: LoginPageProps) => {
  return (
    <div className="d-flex flex-column align-items-center pt-3 gap-3">
      <Typography variant="h5">
        To connect, click on the &apos;Connect Wallet&apos; button and select your wallet.
      </Typography>
    </div>
  );
};
