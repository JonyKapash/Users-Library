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
      const response = await dispatch(fetchUsers());
      const { payload } = response;
      console.log(payload);
      console.log(users);
    };

    fetchAndLogUsers();
  }, [dispatch]);

  return (
    <>
      <h1>Users List</h1>
      <UsersTable users={users} />
    </>
  );
}

export default App;
