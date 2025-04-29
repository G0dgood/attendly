"use client";
import Image from "next/image";


const Header = () => {



  return (
    <div id="header" className="!flex !justify-between !items-center">
      <div></div>
      <div className="flex items-center gap-[20px]">
        <Image
          src={require("../public/DashboardIcon/Bell_light.svg")}
          alt="bell"
        // className="w-[149px] h-[55px]"
        />
        <div className="flex items-center gap-[10px]">
          <div className="w-[40px] h-[40px] bg-[#F2F4F7] border border-[#E5E7EB] rounded-full box-border
          flex items-center justify-center">
            <Image
              src={require("../public/DashboardIcon/Avatar.svg")}
              alt="avatar"
            // className="w-[40px] h-[40px] rounded-full"
            />
          </div>

          <div>
            <h3 className="font-medium text-[14px] leading-[150%] text-[#3A4050]">Mike Doe</h3>
            <p className="font-normal text-[12px] leading-[150%] text-[#3A4050]">HR</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;
