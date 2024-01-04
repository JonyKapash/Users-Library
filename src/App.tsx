import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { fetchUsers } from "./store/thunks/users";
import UsersTable from "./components/UsersTable/UsersTable";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.users);

  useEffect(() => {
    const fetchAndLogUsers = async () => {
      const response = await dispatch(fetchUsers() as any);
      const { payload } = response;
    };

    fetchAndLogUsers();
  }, [dispatch]);

  return (
    <>
      <h1>Users Library</h1>
      <UsersTable users={users} />
    </>
  );
}

export default App;
