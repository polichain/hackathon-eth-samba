import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { AdmRentPage } from "~~/pages/adm-rent";
import { LoginPage } from "~~/pages/login";
import { RoleSelectorPage } from "~~/pages/role-selector";
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
    </div>
  );
}
