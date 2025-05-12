interface NavButtonsProps {
	active: boolean;
	label: string;
	onClick?: () => void;
}

const NavButtons: React.FC<NavButtonsProps> = ({ active, label, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`box-border flex flex-row items-center px-[24px] py-[8px] gap-[8px] w-full h-[40px] flex-none self-stretch
        ${active
					? '!bg-[rgba(0,45,179,0.2)] border-l-[2px] !border-[#002DB3] !text-[#002DB3] font-medium !text-[14px] leading-[150%]'
					: 'bg-transparent border-l-[2px] border-transparent font-medium text-[14px] leading-[150%] text-[#3A4050] !hover:bg-[#F5F7FA]'}`}
		>
			{label}
		</button>
	);
};

export default NavButtons
