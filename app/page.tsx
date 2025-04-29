'use client';
import Image from "next/image";
import { useState } from "react";
import { SVGLoader } from "../components/SVGLoader";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()




  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

  };


  const handleLogin = () => {
    router.push('/employee')
  }



  return (
    <div className="image-container flex flex-col items-center justify-center h-screen ">


      {/* <div className="w-[500px] border shadow-xl rounded-[10px] h-[500px] bg-[#FCFCFD] shadow-md rounded-md py-[64px] overflow-hidden">
        <div className="  rounded-t-md px-[96px]">
          <Image
            src={require("../public/img/logo.png")}
            alt="Logo"
          />
        </div>
        <div className="flex flex-col  px-[160px] mt-[100px]">
          <div className="flex flex-col gap-[8px] mb-[64px] w-[160px] h-[269px]">
            <h1 className="tw-[180px] h-[36px] font-lato font-medium text-[24px]  text-[#3A4050]">Welcome Back</h1>
            <p className="w-[180px] h-[24px] font-lato font-normal text-[16px]  text-[#6D7280]">Please Login to continue.</p>
          </div>
        </div> 
      </div> */}
      <div className="w-[420px] shadow-xl rounded-[8px] p-[24px] bg-[#fff] ">
        <div className="">
          <Image
            src={require("../public/img/logo.png")}
            alt="Logo"
          />
        </div>
        <div className="p-[20px]">
          <div className="flex flex-col mb-[25px] w-[160px] mt-[20px] ">
            <h1 className="tw-[180px] h-[36px]  font-medium text-[24px]  text-[#3A4050]">Welcome Back</h1>
            <p className="w-[180px] h-[24px]  font-normal text-[16px]  text-[#6D7280]">Please Login to continue.</p>
          </div>
          {/* <h3 className="text-center text-[30px] font-medium">Welcome back!</h3>
        <p className="text-center">
          Log back in to have access to your media plans
        </p> */}
          <form onSubmit={handleSubmit} className=" space-y-[16px] flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="" className="font-lato font-normal text-[14px]  text-[#3A4050]">Email Address</label>
              <input
                type="email"
                className="p-[10px] rounded-[8px] border w-full outline-none"
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="" className="font-lato font-normal text-[14px]  text-[#3A4050]">Password</label>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  className="p-[10px] rounded-[8px] border w-full outline-none"
                  placeholder="**********"
                  required
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
                <div
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setVisible(!visible)}>
                  {!visible ? <IoEyeSharp size={17} color="#fff" /> : <IoEyeOffSharp size={17} color="#fff" />}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-lato font-normal text-[14px]  text-[#3A4050]">Remember me</p>
              </div>
              <div>
                <p className="font-lato font-normal text-[14px]  text-[#3A4050]">Forgot password?</p>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className=" text-[#fff] bold rounded-[8px] w-full p-[10px] h-[40px] bg-[#002DB3] text-white text-[16px] font-semibold flex justify-center items-center"
              disabled={loading}
            >
              {/* {loading ? <SVGLoader width={"25px"} height={"25px"} color={"#FFF"} /> : "Login"} */}
              Login
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}


