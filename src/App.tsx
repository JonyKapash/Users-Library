import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { fetchUsers } from "./store/thunks/users";
import UsersTable from "./components/UsersTable/UsersTable";
import { RootState } from "./store/store";

function App() {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    const fetchAndLogUsers = async () => {
      if (users.length === 0) {
        const response = await dispatch(fetchUsers() as any);
        const { payload } = response;
        console.log("payload", payload);
      }
    };

    fetchAndLogUsers();
  }, [dispatch, users]);

  return (
    <>
      <h1>Users Library</h1>
      <UsersTable users={users} />
    </>
  );
}

export default App;
