import React from 'react'

interface PageHeaderProps {
	text: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ text }) => {
	return (
		<h1 className='font-semibold text-[20px] leading-[150%] text-[#3A4050]"'>{text}</h1>
	)
}

export default PageHeader