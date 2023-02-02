import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/combinedReducers";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { getUserRequest } from "@/modules/user/Actions";
import { Box } from "@chakra-ui/react";

const AdminAuth = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!auth.token) {
      window.location.href = "/auth/signin";
    } else if (
      user?.data?.active === false &&
      user?.data?.role !== "SUPER_ADMIN"
    ) {
      window.location.href = "/auth/signin";
      Cookie.remove("token");
      window.localStorage.removeItem("login");
      toast.error("Can not login");
    }
  }, [auth, user]);

  return <Box bg='#F3F2F7'>{children}</Box>;
};

export default AdminAuth;
