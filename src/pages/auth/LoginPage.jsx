import { Link } from "react-router-dom";
import { MdOutlineEmail, MdOutlineKey } from "react-icons/md";
import Input from "../../components/Input.jsx";
import { Button, Spinner } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";
import {useLoginUser} from "../../hooks/UserAuthHook.jsx";
import { useEffect } from "react";
import {toast} from "react-toastify";

export default function LoginPage() {

    const { login, isLoginPending, isLoginError, isLoginSuccess } = useLoginUser();

    useEffect(() => {
        if (isLoginSuccess) {
            toast.success('Logged in successfully')
        } else if (isLoginError) {
            toast.error("Login failed")
        }
    }, [isLoginSuccess, isLoginError]);

    const LoginSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        password: yup.string().trim().required("Password is required"),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            login(values)
        }
    })
    return (
        <>
            <div
                className={"w-[calc(100%-30px)] md:w-[400px] bg-black-primary rounded-xl p-6 flex flex-col items-center gap-3 text-white shadow-lg shadow-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                <img src="../../assets/images/gitlab-logo.png" className={"w-[100px] relative -top-[10px]"}
                    alt="Gitlab Logo" />
                <div className={"relative -top-[20px] text-center"}>
                    <h2 className={"text-3xl mb-3"}>Welcome Back</h2>
                    <p className={"text-gray-400"}>
                        Don&apos;t have an account yet? <Link className={"text-white"} to={"/auth/signup"}>Sign up</Link>
                    </p>
                </div>
                <form onSubmit={formik.handleSubmit} className={"w-full flex flex-col gap-5"}>
                    <div>
                        <Input id="email" type="email" icon={<MdOutlineEmail size={19} color={"#ffffff"} />}
                            placeholder="Email address" onChange={formik.handleChange} value={formik.values.email} />
                        {formik.touched.email && formik.errors.email ? (
                            <p id="standard_error_help"
                                className="mt-2 text-xs text-red-600 dark:text-red-400">{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <div>
                        <Input id="password" type="password" icon={<MdOutlineKey size={19} color={"#ffffff"} />}
                            placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
                        {formik.touched.password && formik.errors.password ? (
                            <p id="standard_error_help"
                                className="mt-2 text-xs text-red-600 dark:text-red-400">{formik.errors.password}</p>
                        ) : null}
                    </div>
                    <Button disabled={isLoginPending} type={"submit"} color={"blue"}>{isLoginPending ? (
                        <>
                            <Spinner aria-label="Spinner button example" size="sm" light={"on"} color={"purple"} />
                            <span className="pl-3">Logging in...</span>
                        </>
                    ) : "Login"}</Button>
                </form>
            </div>
        </>
    )
}