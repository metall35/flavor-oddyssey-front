import { memo } from "react"

const Input = memo(({ type, name, label, required, value, onChange, error, disabled }) => {

    const requiredStyle = required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ''

    return (
        <label htmlFor={name} className="block grid-cols-1">
            <span className={`${requiredStyle} text-neutral-500 block text-sm pl-1 pb-2`}>
                {label}
            </span>
            <input
                type={type} name={name} id={name}
                placeholder={label}
                value={value}
                onChange={onChange}
                className={`w-full py-3 px-6 border shadow-lg rounded-2xl focus:outline-none ${error.status && "ring-2 ring-red-400"} 
                            focus:ring-2 focus:ring-flavor-2 bg-white/60 text-sm sm:text-base`}
                disabled={disabled}
            />

        </label>
    )

})

export default Input