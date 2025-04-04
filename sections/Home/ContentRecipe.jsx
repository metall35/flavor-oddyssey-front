import React from "react";
import WideCard from "@/components/Cards/WideCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { TitleH2 } from "@/components/AuxComponents/Title";

const ContentRecipe = ({ data }) => {
    return (
        <div className="lg:px-26 md:px-12 px-4 w-full mt-12">
            <TitleH2 text="¡Explora tus gustos!" />
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                navigation
                modules={[Navigation]}
                className="mySwiper"
            >
                {data.map((value, index) => (
                    <SwiperSlide key={index} className="p-4">
                        <WideCard data={value} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ContentRecipe;
