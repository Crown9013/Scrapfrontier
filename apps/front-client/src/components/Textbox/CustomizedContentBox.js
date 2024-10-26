import { useState } from 'react'

export const MAX_CONTENT_LEN = 150

const CustomizedContentBox = (props) => {

	const { children } = props
	const [readMore, setReadMore] = useState(false)

	return (
		<>
			{children.length > 150 ? (readMore ? `${children}  ` : `${children.substring(0, 150)}... `) : children}
			{(children.length > 150) && <button className="lg:text-[14px] md:text-[13px] sm:text-[11px] text-[#919191]" onClick={() => setReadMore(!readMore)}>{readMore ? `Show less` : " Read More"}</button>}
		</>
	)
}

export default CustomizedContentBox;