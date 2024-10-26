import React, {useRef} from "react";
import { Scrollbar, Mousewheel, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDateStr }  from '../../helper'
import CustomizedContentBox from '../Textbox/CustomizedContentBox'
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';
const Carousel = ({items, interval =5000}) => {

    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);
    const swiperRef = useRef();

    return (
        <div className="w-full">
            <div className="flex justify-between">
                <span className="font-bebas lg:text-[46px] md:text-[46px] sm:text-[32px]">featured</span>
                <div className="flex items-center">
                    <button  className="carousel__btn carousel__btn--prev" onClick={()=>swiperRef.current?.slidePrev()}>
                        &lt;
                    </button>
                    <button  className="ml-2 carousel__btn carousel__btn--next" onClick={()=>swiperRef.current?.slideNext()}>
                        &gt;
                    </button>
                </div>
            </div>
            <div className="flex mt-[20px]">
                <Swiper
                    modules={[Scrollbar, Mousewheel, Autoplay, Navigation]}
                    loop={true}
                    pagination={{ clickable: true }}
                    centeredSlides={true}
                    grabCursor={true}
                    scrollbar={{ draggable: true }}
                    navigation={{
                        nextEl: ".image-swiper-button-next",
                        prevEl: ".image-swiper-button-prev",
                        disabledClass: "swiper-button-disabled"
                    }}
                    mousewheel={{
                        invert: false,
                    }}
                    autoplay={{
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.navigation.nextEl = navigationNextRef.current;
                        swiper.navigation.prevEl = navigationPrevRef.current;
                        swiperRef.current = swiper;
                    }}
                    >
                        {items?.map((item, index) => {
                            return (
                            <SwiperSlide key={index}>
                                <div className="flex lg:flex-row md:flex-row sm:flex-col pe-3">
                                    <div className="flex justify-center items-center">
                                        <img src = {`${process.env.REACT_APP_SERVER_URL}images/${item.image}`} alt={`Slide ${index}`} className="max-w-[320px] w-[270px] mb-auto pt-1"/>

                                    </div>
                                    <div className=" my-[5px] lg:ml-[20px] md:ml-[20px] sm:ml-0" style={{display: 'flex', flexDirection: 'column', justifyContent: 'start'}}>
                                        <span className="float-left text-[32px] text-justify break-all">{item.title}</span>
                                        <span className="float-left text-[16px] text-justify break-all mt-[10px] mb-[10px]">
                                            <CustomizedContentBox>{item.content}</CustomizedContentBox>
                                        </span>
                                        <span className="float-right text-[18px] text-justify break-all bg-gradient bg-opacity-5 p-2 mt-[10px]" style={{marginTop: 'auto', marginLeft: 'auto', width: 'fit-content'}}>
                                            {formatDateStr(item.updated_at)}
                                        </span>    
                                    </div>
                                </div>
                            </SwiperSlide>
                                
                            );
                        })}
                </Swiper>
            </div>
            
         </div>
            
    );
}

export default Carousel