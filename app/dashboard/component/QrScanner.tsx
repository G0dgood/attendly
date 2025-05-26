import React from 'react'
import Image from "next/image";
import { QRCodeSVG } from 'qrcode.react';


const QrScanner = ({ dataQR }: any) => {
	const data = dataQR?.data;




	return (
		<div className="flex flex-col items-start h-full justify-between gap-5 w-[100%] bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] p-[10px]">
			<div className="flex flex-col justify-between w-full">
				<div className="flex items-center justify-center p-2">
					{data?.token ? (
						<QRCodeSVG value={data?.token} size={310} level="H" />
					) : (
						<Image
							src={require("../../../public/Barcode.svg")}
							alt="barcode"
							className="w-[100%] h-[90%]  object-contain"
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default QrScanner
