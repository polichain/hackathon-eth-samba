import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { AdmRentPage } from "~~/pages/adm-rent";
import { LoginPage } from "~~/pages/login";
import { RentCreatePage } from "~~/pages/rent-create";
import { RoleSelectorPage } from "~~/pages/role-selector";
import { UserRentPage } from "~~/pages/user-rent";
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
