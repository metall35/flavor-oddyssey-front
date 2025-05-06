import { useState } from "react";
import toast from "react-hot-toast";

const useHandlePhotoChange = ({ initialPhoto, updatePhoto, zustand = false }) => {
    const [img, setImg] = useState(initialPhoto);

    const handlePhotoChange = e => {
        const file = e.target.files[0];
        const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

        if (file) {
            if (file.size > maxFileSize) {
                toast.error("El archivo es demasiado grande.")
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (zustand) {
                    updatePhoto({
                        photo: e.target.files[0],
                    })
                } else {
                    updatePhoto((prevState) => ({
                        ...prevState,
                        photo: e.target.files[0],
                    }));
                }
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    return {
        img,
        handlePhotoChange
    }
}

export default useHandlePhotoChange