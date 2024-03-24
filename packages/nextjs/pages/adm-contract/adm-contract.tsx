import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Pagination } from "~~/types/pagination";

interface AdmContractPageProps {
  setCurrentPage: (page: Pagination) => void;
}

const handleClick = () => {
  alert("escolhe outro botão");
};

export const AdmContractPage: React.FC<AdmContractPageProps> = ({ setCurrentPage }: AdmContractPageProps) => {
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>HELLO</div>;
};
