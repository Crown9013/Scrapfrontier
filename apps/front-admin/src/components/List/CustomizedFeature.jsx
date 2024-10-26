import { useState } from "react";
import "./CustomziedList.css"
import DetailedFeatureModal from "./DetailedFeatureModal";
import { formatDateStr } from '../../helper'
import CustomizedContentBox from '../Textbox/CustomizedContentBox'

const CustomizedList = (props) => {
    const {title, content, image, updated_at} = props.data;
    
    const [openModal, setOpenModal] = useState(false)

    return (
        <div className="customized-list w-[100%]">
            <div className="list-img">
                <img src={image ? `${process.env.REACT_APP_SERVER_URL}images/${image}` : `${process.env.REACT_APP_SERVER_URL}images/default`} alt="feautred" width={200} height={200} className="m-auto"/>
            </div>
            <div className="list-body">
                <div className="list-body-title lg:text-[32px] md:text-[28px] sm:text-[20px]  cursor-pointer"  onClick={()=>setOpenModal(true)}>{title}</div>
                <div className="list-body-content lg:text-[18px] md:text-[17px] sm:text-[15px]" style={{whiteSpace: 'pre-wrap'}}>
                    <CustomizedContentBox>
                        {content}
                    </CustomizedContentBox>
                </div>
                <div className="float-right text-[18px] text-justify break-all bg-gradient bg-opacity-5 p-2 mt-[10px]">{formatDateStr(updated_at)}</div>
            </div>
            {openModal && <DetailedFeatureModal row={props.data} refresh={props.refresh} openModal={openModal} closeModal={()=>setOpenModal(false)}></DetailedFeatureModal>}
        </div>
    )
}

export default CustomizedList;