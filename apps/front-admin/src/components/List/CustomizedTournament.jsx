import { useState } from "react";
import "./CustomziedList.css"
import DetailedTournamentModal from "./DetailedTournamentModal";
import { formatDateStr } from '../../helper'
import CustomizedContentBox from '../Textbox/CustomizedContentBox'

const CustomizedTournament = (props) => {
    const {name, date, time, capacity, description, image, updated_at} = props.data;
    
    const [openModal, setOpenModal] = useState(false)

    // const date = new Date(updated_at);
    // const dateStr = (date.getMonth() + 1) + "." + date.getDate() + "." + date.getFullYear()

    const openEditDialog = () => {
        setOpenModal(true)
    }
    return (
        <div className="customized-list w-[100%]">
            <div className="list-img">
                <img src={image ? `${process.env.REACT_APP_SERVER_URL}images/${image}` : `${process.env.REACT_APP_SERVER_URL}images/default`} alt="tournament_events" width={200} height={200} className="m-auto"/>
            </div>
            <div className="list-body">
                <div className="list-body-title lg:text-[32px] md:text-[28px] sm:text-[20px]  cursor-pointer"  onClick={()=>openEditDialog()}>{name}</div>
                <div className="mb-[10px]">
                    <span className="text-[16px] text-justify break-all bg-opacity-5 mr-[10px]">{formatDateStr(date)},</span>
                    <span className="text-[16px] text-justify break-all bg-opacity-5 mr-[10px]">{time},</span>
                    <span className="text-[16px] text-justify break-all bg-opacity-5 mr-[10px]">{capacity}</span>
                </div>
                <div></div>
                <div className="list-body-content lg:text-[18px] md:text-[17px] sm:text-[15px]" style={{whiteSpace: 'pre-wrap'}}>
                    <CustomizedContentBox>
                        {description}
                    </CustomizedContentBox>
                </div>
                <div className="float-right text-[16px] text-justify break-all bg-gradient bg-opacity-5 p-2 mt-[10px]">{formatDateStr(updated_at)}</div>
            </div>
            {openModal && <DetailedTournamentModal row={props.data} refreshData={props.refreshData} openModal={openModal} closeModal={()=>setOpenModal(false)} />}
        </div>
    )
}

export default CustomizedTournament;