import { useEffect, useState } from "react";
import { AdmRentPage } from "../components/AdmRentPage";
import { LoginPage } from "../components/LoginPage";
import { RentCreatePage } from "../components/RentCreatePage";
import { RoleSelectorPage } from "../components/RoleSelectorPage";
import { UserRentPage } from "../components/UserRentPage";
import { useAccount } from "wagmi";
import { Pagination } from "~~/types/pagination";

export function App() {
  const { isConnected, address } = useAccount();
  const [currentPage, setCurrentPage] = useState<Pagination>(Pagination.Login);

  useEffect(() => {
    if (!isConnected) {
      setCurrentPage(Pagination.Login);
    } else {
      setCurrentPage(Pagination.RoleSelector);
    }
  }, [isConnected]);

  return (
    <div>
      {currentPage === Pagination.AdmRent && <AdmRentPage setCurrentPage={setCurrentPage} />}
      {currentPage === Pagination.Login && <LoginPage setCurrentPage={setCurrentPage} />}
      {currentPage === Pagination.RoleSelector && <RoleSelectorPage setCurrentPage={setCurrentPage} />}
      {currentPage === Pagination.RentCreate && <RentCreatePage setCurrentPage={setCurrentPage} />}
      {currentPage === Pagination.UserRent && <UserRentPage setCurrentPage={setCurrentPage} />}
    </div>
  );
}
