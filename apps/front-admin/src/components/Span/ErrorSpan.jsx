
const BaseErrorSpan = ({spanClass, errorMessage, ...rest}) => {
  return (
    <span
        className={`text-danger text-[14px] ml-[0.5rem] ${spanClass}`}
        {...rest}
    >
        {errorMessage}
    </span>
  )
}

export default BaseErrorSpan