import Dropdowns from '@/components/CustomDropdown'
import Input from '@/components/Input'
import React from 'react'

interface ProfessionalInformationProps {
	input: {
		value1: string;
	};
	handleOnChange: (key: string, value: string) => void;
}

const ProfessionalInformation: React.FC<ProfessionalInformationProps> = ({ input, handleOnChange }) => {
	return (
		<div className='w-full mt-[20px] flex flex-col gap-[32px]'>
			<div className='flex flex-col  md:flex-row gap-[20px] w-full justify-between'>
				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Employee'} type={''} />
				<Dropdowns label={''} right={''} options={["Full-Time", "Part-Time", "Contract", "Remote", "Intern", "Outsourced"]} />
				<Dropdowns label={''} right={''} options={["Full-Time", "Part-Time", "Contract", "Remote", "Intern", "Outsourced"]} />

			</div>
			<div className='flex flex-col  md:flex-row gap-[20px] w-full justify-between'>
				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Joining Date'} type={''} />
				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Manager'} type={''} />
			</div>
			<div className='flex flex-col  md:flex-row gap-[20px] w-full justify-between '>
				<div className='w-[100%] md:w-[50%]' >
					< Input value={input.value1}
						handleOnChange={(e) => handleOnChange("value1", e.target.value)}
						label={''} placeholder={'Start Date'} type={''} />
				</div>
				<div className='w-[50%]' />
			</div>
		</div>
	)
}

export default ProfessionalInformation
