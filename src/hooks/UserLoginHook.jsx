import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/index.js";

export default function useLoginUser({ email, password }) {
    console.log(email, password)
    const { mutate: loginUserMutation } = useMutation({
        mutationFn: ({email, password}) => loginUser({ email, password }),
        mutationKey: ["user", { email, password }],
        onSuccess: (data) => {
            console.log(data)
        }
    })

    return { login: loginUserMutation }
}