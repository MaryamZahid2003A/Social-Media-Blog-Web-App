import useGlobalStore from "./Store/GlobalStore";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ children }) {
  const { user, loading } = useGlobalStore();

  console.log('PrivateRoute: user:', user, 'loading:', loading); // 👈 Add this

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
