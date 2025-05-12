import Dropdowns from '@/components/CustomDropdown';
import Input from '@/components/Input'
import React from 'react'

interface PersonalInformationProps {
	input: {
		value1: string;
		// Add other fields as needed
	};
	handleOnChange: (field: string, value: string) => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ input, handleOnChange }) => {
	return (
		<div className='w-full mt-[20px] flex flex-col gap-[32px]'>
			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>
				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'First Name'} type={''} />
				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Middle Name'} type={''} />
				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Last Name'} type={''} />
			</div>
			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>

				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Mobile Number'} type={''} />


				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Email Address'} type={''} />

			</div>
			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>

				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Date of Birth'} type={''} />

				<Dropdowns label={'Marital Status'} right={''} options={["Full-Time", "Part-Time", "Contract", "Remote", "Intern", "Outsourced"]} />
			</div>
			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>
				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Nationality'} type={''} />
				<Dropdowns label={'Gender'} right={''} options={["Full-Time", "Part-Time", "Contract", "Remote", "Intern", "Outsourced"]} />
			</div>

			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>
				< Input value={input.value1}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Address'} type={''} />

			</div>
			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>
				<Dropdowns label={'City'} right={''} options={["Full-Time", "Part-Time", "Contract", "Remote", "Intern", "Outsourced"]} />
				<Dropdowns label={'State'} right={''} options={["Full-Time", "Part-Time", "Contract", "Remote", "Intern", "Outsourced"]} />
			</div>
		</div>
	)
}

export default PersonalInformation