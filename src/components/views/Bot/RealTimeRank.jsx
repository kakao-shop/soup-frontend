import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { reissuanceAccessToken } from "../../jwtTokenModules";

import "../../../css/RealTimeRank.css";

export default function RealTimeRank({ steps, previousStep, triggerNextStep }) {
    const [Rank, setRank] = useState([]);
    const [StartTime, setStartTime] = useState(0);
    const [EndTime, setEndTime] = useState(0);

    useEffect(() => {
        axios
            .get("/search/rank", {
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            })
            .then((response) => {
                setStartTime(response.data.result.startTime);
                setEndTime(response.data.result.endTime);
                setRank(response.data.result.result);
            })
            .catch((error) => {
                if (error.response.data.code === 4002) {
                    reissuanceAccessToken(error);
                } else {
                    toast.error('실시간 검색어 순위 정보를 불러올 수 없습니다. 😥', {
                        autoClose: 700,
                        transition: Slide,
                        hideProgressBar: true
                    });
                    console.log(error);
                }
            });
    }, []);
    return (
        <div className="RealTimeRank">
            <h3>실시간 검색어 👑</h3>
            <div className="rank-date">
                {StartTime} ~ {EndTime} 집계
            </div>
            <div className="rank-container">
                {Rank.length > 0 ? (
                    Rank.map((term, index) => (
                        <div className="rank-data" key={term.key}>
                            <div className="rank">{index + 1}</div>
                            <div className="term">{term.key}</div>
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
            <button
                onClick={(e) => triggerNextStep()}
                className="again-btn btn"
            >
                처음으로
            </button>
            <ToastContainer 
                    position= "top-right" 
                    autoClose= {700} 
                    transition= "Slide"
                    hideProgressBar 
                    closeOnClick
                    rtl={false}
                    pauseOnHover 
                    draggable= {false} />
        </div>
    );
}
