
const GeneralButton = (props) => {

    return (
        <button className={`w-32 h-14 py-2 text-center ${props.classes}  rounded-lg block text-white cursor-pointer shadow-md`} {...props}>
            {props.text}
        </button>
    )

}

export default GeneralButton