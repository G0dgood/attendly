
'use client';
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiMail, FiLock } from "react-icons/fi";
// import ssd_logo from '../../assets/svg/ssd_logo.svg';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useUserPrivileges } from "@/utils/userPrivileges";
import { SVGLoader } from "@/components/SVGLoader";
import { toast } from "sonner";



const Login = () => {
  const router = useRouter()
  const { isSuperAdmin } = useUserPrivileges();
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");



  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (res?.ok) {
      toast.success("Login successful!");
      router.push('/dashboard');
    } else {
      toast.error("Invalid email or password");
    }
  };

  useEffect(() => {
    if (isSuperAdmin) {
      router.push('/dashboard');
    }
  }, [isSuperAdmin]);


  return (
    <div id="login-wrapper">
      <div className='img_licence-containers_login'>
        {/* <img src={ssd_logo} alt='icon' className='ssd_logo_login' /> */}
      </div>
      <div className="login-form-container">
        <div className="form-container_text">
          <h1>Welcome back</h1>
          <p>Enter your credentials to access your account.</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="form-ctrl">
            <FiMail />
            <input
              className="input-group"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-ctrl">
            <FiLock />
            <input
              className="input-group"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span id="i-FaEye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button type="submit" className="login_btn cursor-pointer">
            {loading ? <SVGLoader width={"20px"} height={"20px"} color={"#FFF"} /> : "Login"}
          </button>
        </form>
      </div>
      <div className="forgot_your_pass cursor-pointer">Forgot your password?</div>
    </div>
  );
};

export default Login;




