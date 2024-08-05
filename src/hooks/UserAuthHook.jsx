import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, loginUser, checkLogin } from "../api/index.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const useLoginUser = () => {
    const { mutate, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: ({ email, password }) => loginUser({ email, password }),
        onSuccess: (data) => {
            Cookies.set("token", data.token, { expires: 1 })
            setTimeout(() => {
                window.location.href = "/"
            }, 2000);
        }
    })

    return { login: mutate, isLoginPending: isPending, isLoginError: isError, loginError: error, isLoginSuccess: isSuccess }
}

export const useRegisterUser = () => {
    const { mutate, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: ({ username, email, password, role }) => createUser({ username, email, password, role }),
        onSuccess: (data) => {
            Cookies.set("token", data.token, { expires: 1 })
            setTimeout(() => {
                window.location.href = "/"
            }, 2000)
        }
    })

    return { register: mutate, isRegisterPending: isPending, isRegisterError: isError, registerError: error, isRegisterSuccess: isSuccess }
}

export const useLoginCheck = () => {
    const { data: userData, isError, isLoading, isSuccess } = useQuery({
        queryFn: checkLogin,
        queryKey: ["user"],
        retry: 0
    })

    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            navigate('/auth/login');
        }
    }, [isError, isLoading, navigate, isSuccess])

    return { userData, isDataLoading: isLoading, isUserFetchSuccess: isSuccess }
}