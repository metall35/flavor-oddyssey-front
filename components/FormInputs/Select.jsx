import { memo, useRef, useState } from "react";

const CustomSelect = memo(({ label, name, options, onChange, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const handleOptionClick = (option) => {
        // Si la opción tiene `data`, la enviamos completa; si no, solo el `value`
        onChange(option.data || option.value);
        setIsOpen(false);
    };

    return (
        <label className="block relative" htmlFor={name}>
            <span className="text-neutral-500 block text-sm pl-1 pb-2">
                {label}
            </span>

            {/* Input visual del select */}
            <div
                className={`pr-4 pl-2 py-2 bg-white text-sm border border-neutral-300 rounded-lg shadow-sm cursor-pointer w-full relative ${isOpen ? 'ring-flavor-2 ring-1' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                ref={selectRef}
            >
                <span className={`block ${value === '' ? 'text-neutral-400/60' : 'text-black'}`}>
                    {value ? options.find(opt => opt.value === value)?.label : 'Seleccione una opción'}
                </span>

                {/* Flecha SVG */}
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>

            {/* Opciones del select como un dropdown personalizado */}
            {isOpen && (
                <ul className="absolute z-10 mt-1 text-center w-full bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`px-1 py-2 text-sm cursor-pointer hover:bg-andes/10 ${option.value === value ? 'bg-neutral-200' : ''}`}
                            onClick={() => handleOptionClick(option)} // Pasamos toda la opción
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </label>
    );
});

export default CustomSelect;