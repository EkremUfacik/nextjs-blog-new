import Login from "@/app/login/page";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";

const withAuth = (Component) => {
  const Auth = (props) => {
    const { userId, expDate } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // if (userId === "loadUserId") {
    //   return (
    //     <div className="mt-28 ">
    //       <Image
    //         className="animate-spin mx-auto"
    //         src={moon}
    //         width={100}
    //         alt=""
    //       />
    //     </div>
    //   );
    // }

    const expiryDate = new Date(expDate).getTime();
    const now = new Date().getTime() + 3000 * 60 * 60;

    if (!userId || now > expiryDate) {
      // localStorage.removeItem("token");
      dispatch(logout());
      return <Login />;
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
