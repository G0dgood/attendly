import React from 'react'
import Image from "next/image";
import { QRCodeSVG } from 'qrcode.react';
import { SVGLoader } from '@/components/SVGLoader';


const QrScanner = ({ dataQR, isLoadingQR }: any) => {
	const data = dataQR?.data;




	return (
		<div className="flex flex-col items-start h-full justify-between gap-5 w-[100%] bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] p-[10px]">
			<div className="flex flex-col justify-between w-full h-full">
				<div className='w-full h-full flex	flex-row justify-center items-center gap-2'>
					{isLoadingQR ? <SVGLoader width={"40px"} height={"40px"} color={"#0866FF"} /> :

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
					}
				</div>
			</div>
		</div>
	)
}

export default QrScanner
