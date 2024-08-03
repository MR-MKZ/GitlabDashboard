import { Link } from "react-router-dom";
import { MdOutlineEmail, MdOutlineKey, MdOutlinePerson } from "react-icons/md";
import Input from "../../components/Input.jsx";
import { Button, Spinner } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRegisterUser } from "../../hooks/UserAuthHook.jsx";

export default function RegisterPage() {

    // const [password, setPassword] = useState()
    const { register, isRegisterPending } = useRegisterUser();

    const SignupSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        username: yup.string().matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers.").required("Username is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            register({
                username: values.username,
                email: values.email,
                password: values.password,
                role: "user"
            });
        }
    })

    return (
        <>
            <div
                className={"w-[calc(100%-30px)] md:w-[400px] bg-black-primary rounded-xl p-6 flex flex-col items-center gap-3 text-white shadow-lg shadow-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                <img src="../../assets/images/gitlab-logo.png" className={"w-[100px] relative -top-[10px]"}
                    alt="Gitlab Logo" />
                <div className={"relative -top-[20px] text-center"}>
                    <h2 className={"text-3xl mb-3"}>Create Account</h2>
                    <p className={"text-gray-400"}>Do you have an account? <Link className={"text-white"} to={"/auth/login"}>Login</Link></p>
                </div>
                <form onSubmit={formik.handleSubmit} className={"w-full flex flex-col gap-5"}>
                    <div>
                        <Input id="username" type="text" icon={<MdOutlinePerson size={19} color={"#ffffff"} />}
                            placeholder="Username" onChange={formik.handleChange} value={formik.values.username} />
                        {formik.touched.username && formik.errors.username ? (
                            <p id="standard_error_help"
                                className="mt-2 text-xs text-red-600 dark:text-red-400">{formik.errors.username}</p>
                        ) : null}
                    </div>
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
                    <div>
                        <Input id="confirmPassword" type="password" icon={<MdOutlineKey size={19} color={"#ffffff"} />}
                            placeholder="Repeat Password" onChange={formik.handleChange} value={formik.values.confirmPassword} />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <p id="standard_error_help"
                                className="mt-2 text-xs text-red-600 dark:text-red-400">{formik.errors.confirmPassword}</p>
                        ) : null}
                    </div>
                    {/* <Button type={"submit"} color={"blue"}>Create Account</Button> */}
                    <Button disabled={isRegisterPending} type={"submit"} color={"blue"}>{isRegisterPending ? (
                        <>
                            <Spinner aria-label="Spinner button example" size="sm" light={"on"} color={"purple"} />
                            <span className="pl-3">Creating account ...</span>
                        </>
                    ) : "Create Account"}</Button>
                </form>
            </div>
        </>
    )
}