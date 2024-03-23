import { Pagination } from "~~/types/pagination";

interface UserRentPageProps {
  setCurrentPage: (page: Pagination) => void;
}

export const UserRentPage: React.FC<UserRentPageProps> = ({ setCurrentPage }: UserRentPageProps) => {
  return <div></div>;
};
