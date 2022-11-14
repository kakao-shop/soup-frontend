import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from "react-router-dom";


const Search = ({ steps, previousStep, triggerNextStep }) => {
    const [result, setResult] = useState([]);
    const [search, setSearch] = useState('');
    const [param, setParam] = useState('');
    const [idx, setIdx] = useState('');

    const componentDidMount = async () => {
        setIdx(steps.triggerMaker.value);
        const search = previousStep.value;
        const param = previousStep.metadata.param;
        setParam(param);
        setSearch(search);
        if (param == 'category') {
            await axios.get("/search/subcat", {
                params: {
                    category: `${search}`
                }
            })
                .then((response) => {
                    setResult(response.data.result.result.content);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else {
            await axios.get(`/search/collections/${search}`)
                .then((response) => {
                    setResult(response.data.result.result.content);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    useEffect(() => {
        componentDidMount();
    }, []);

    if (!result) return null;

    const triggerNext = () => {
        triggerNextStep();
    };

    return (
        <div className="searchResult">
            <div style={{
                textAlign: 'center',
                marginTop: 20
            }}
            >
                <div>
                    {result.map(re => (
                        <div key={re.id}>{re.prdName}</div>
                    ))}
                </div>
                <Link className='btn btn' to={`/${param}`} state= {{idx: `${idx}`, subcat: `${search}`}}>더보기</Link>

                <button onClick={triggerNext}>처음으로</button>
            </div>

        </div>
    );

}

export default Search;