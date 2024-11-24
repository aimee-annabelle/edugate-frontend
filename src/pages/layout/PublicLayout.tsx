import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

export default function PublicLayout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
