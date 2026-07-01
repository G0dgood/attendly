import React, { useState } from 'react'
import Image from "next/image";
import { QRCodeSVG } from 'qrcode.react';
import { SVGLoader } from '@/components/SVGLoader';


const QrScanner = ({ dataQR, isLoadingQR }: any) => {
	const data = dataQR?.data;
	const [isFullscreen, setIsFullscreen] = useState(false);

	const downloadQR = (svgId: string = "qr-svg") => {
		const svg = document.getElementById(svgId);
		if (!svg) return;
		const svgData = new XMLSerializer().serializeToString(svg);
		const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
		const svgUrl = URL.createObjectURL(svgBlob);
		
		const img = new window.Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = 800; // High resolution PNG
			canvas.height = 800;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.fillStyle = "#FFFFFF";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				const padding = 40;
				ctx.drawImage(img, padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);
				
				const pngUrl = canvas.toDataURL("image/png");
				const downloadLink = document.createElement("a");
				downloadLink.href = pngUrl;
				downloadLink.download = "qr-code.png";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
			}
			URL.revokeObjectURL(svgUrl);
		};
		img.src = svgUrl;
	};

	return (
		<div className="flex flex-col items-center h-full justify-center gap-4 w-[100%] bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] p-4">
			{isLoadingQR ? (
				<div className="flex-1 flex items-center justify-center">
					<SVGLoader width={"40px"} height={"40px"} color={"#0866FF"} />
				</div>
			) : data?.token ? (
				<div className="flex flex-col items-center justify-center w-full h-full gap-3">
					<div className="flex items-center justify-center p-2 bg-gray-50 border border-gray-100 rounded-md">
						<QRCodeSVG id="qr-svg" value={data?.token} size={150} level="H" />
					</div>
					<div className="flex gap-2 w-full max-w-[200px] justify-center">
						<button 
							onClick={() => downloadQR("qr-svg")}
							className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 hover:text-blue-800 transition rounded-none cursor-pointer"
						>
							<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
							</svg>
							Download
						</button>
						<button 
							onClick={() => setIsFullscreen(true)}
							className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition rounded-none cursor-pointer"
						>
							<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
							</svg>
							Full View
						</button>
					</div>
				</div>
			) : (
				<div className="flex-1 flex items-center justify-center w-full">
					<Image
						src={require("../../../public/Barcode.svg")}
						alt="barcode"
						className="w-[100%] h-[200px] object-contain"
					/>
				</div>
			)}

			{isFullscreen && data?.token && (
				<div className="fixed inset-0 bg-black/80 z-[9999] flex flex-col items-center justify-center p-4">
					<button
						onClick={() => setIsFullscreen(false)}
						className="absolute top-6 right-6 text-white hover:text-gray-300 transition duration-200 cursor-pointer bg-black/40 p-2 rounded-full"
						aria-label="Close fullscreen"
					>
						<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					<div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center gap-6 max-w-full max-h-full">
						<h3 className="text-xl font-bold text-gray-800">Scan QR Code</h3>
						<div className="p-4 bg-gray-50 border border-gray-100 rounded-md">
							<QRCodeSVG id="qr-svg-fullscreen" value={data?.token} size={400} level="H" />
						</div>
						<button
							onClick={() => downloadQR("qr-svg-fullscreen")}
							className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-none transition cursor-pointer"
						>
							<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
							</svg>
							Download PNG
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default QrScanner
