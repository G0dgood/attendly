"use client";
import React from 'react'
import Image from "next/image";

const Search = () => {
	return (
		<div className=' !bg-[#fff] w-full md:w-[320px] h-[40px] flex flex-row items-center px-[14px] py-[10px] gap-[8px] border border-[#E5E7EB]  '>
			<button>
				<Image
					src={require("../public/DashboardIcon/search-refraction.svg")}
					alt="search"
				/>
			</button>

			<input type="text" placeholder='Search'
				className='border-none	outline-none w-full h-full placeholder:text-[#6D7280] placeholder:font-normal placeholder:text-[14px] placeholder:leading-[150%]'
			/>
		</div>
	)
}

export default Search
