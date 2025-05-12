import React from 'react'

interface PageHeaderProps {
	text: string;
	textsup?: string;
	textsupSmall?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ text, textsup, textsupSmall }) => {
	return (
		<div>
			<h1 className='font-semibold text-[22px] leading-[150%] text-[#3A4050]"'>{text}</h1>
			<p className="  font-medium text-[14px] leading-[21px] text-[#6D7280]">{textsup}</p>
			<p className="  font-medium text-[12px] leading-[21px] text-[#6D7280]">{textsupSmall}</p>
		</div>
	)
}

export default PageHeader