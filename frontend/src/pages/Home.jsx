import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth_redux/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  if (!auth || !auth.isLoggedIn || !auth.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-4">You are not logged in</h2>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-purple-700 text-white rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const { user } = auth;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-6 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user.fullname}
        </h1>

        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Role:</b> {user.role}</p>

        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="mt-6 w-full py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
