
const NotifyError = ({ status, message }) => {
    return (
        <>
            {status && <p className="italic text-red-500 text-sm">{message}</p>}
        </>
    )
}

export default NotifyError