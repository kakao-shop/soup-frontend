import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import '../../../css/DefaultItem.css'

function DefaultItem({props,isLogin}) {

    const [productList, setProductList] = useState([
        {
            id: "상품 아이디",
            score: "상품 가중치",
            site: "쇼핑몰 사이트",
            prdName: "상품 이름",
            webUrl: "상품 URL",
            price: "가격",
            purchase: 0,
            cat: "대분류카테고리",
            subcat: "소분류카테고리",
            imgSrc: "이미지"
        }
    ]);

    useEffect(() => {
        const getProductList = async () => {
            try {
                axios.get('http://localhost:8000/', {
                        headers: {
                            'x-access-token': localStorage.getItem('access_token')
                        }
                    }
                ).then(function (response) {
                    console.log("result");
                    setProductList(response.data.result.recommendResult);
                }).catch(function (error) {
                    alert('error');
                    console.log(error);
                });

            } catch (e) {
                alert('error');
                console.log(e);
            }
        };
        getProductList();
    }, []);


    const user = {
        nickname: localStorage.getItem('nickname')
    }

    const result = user.nickname === null ? <h3 style={{width: "100%"}}>인기 상품</h3> :
        <div><h3 id="nickname" style={{display: "inline-block", margin: "0 10px 0 0"}}>{user.nickname}</h3><span>님을 위한 추천 상품</span>
        </div>;

    return (
        <main className="DefaultItem container">
            <div className="default-item">
                {result}
                <div className="item-list">
                    {productList.map((item, index) => (
                        <div key={"default" + index} className="item">
                            <Link to={item.url} className="item-link">
                                <img src={item.imgSrc} alt="Item"
                                     className="item-img"/>
                                <strong className="item-name">{item.prdName}</strong>
                                <span className="item-desc">{item.site}</span>
                                <span className="item-price">{item.price}원</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default DefaultItem;
