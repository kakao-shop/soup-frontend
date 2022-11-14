import React, { useState, useRef } from 'react';
import { Link, useLocation, NavLink } from "react-router-dom";
import ItemList from './ItemList';
import axios from 'axios';
import Pagination from 'react-js-pagination';

import Header from '../Header';
import Nav from '../Nav';
import "../../../css/SubCategoryList.css";
import { useEffect } from 'react';

// import '../../../css/CategoryPage.css';
import '../../../css/ItemList.css';
import '../../../css/Pagination.css';


function CategoryView({isLogin, setIsLogin}) {
  // const [pageSize, setPageSize] = useState(10);
  // const [totalCount, setTotalCount] = useState(115);
  // const [currentPage, setCurrentPage] = useState(1);

  const categoryList = [
    {
      main: "과일",
      sub: {
        item: ["감/홍시", "사과", "귤", "포도", "열대과일", "견과/밤", "키위", "배", "토마토", "자몽", "아보카도", "바나나", "기타만감류", "메론", "오렌지", "레몬/라임", "무화과", "베리류", "파인애플", "수박", "딸기", "기타과일", "견과/밤/대추"]
      },
    },
    {
      main: "채소",
      sub: {
        item: ["마/우엉", "무/열무", "토마토", "버섯", "배추/절임배추", "샐러드", "샐러드채소", "감자", "호박", "나물", "옥수수", "고추", "양파", "파프리카", "당근", "인삼/더덕/약선재료", "오이", "반찬채소", "쌈채소", "쪽파", "브로콜리", "연근", "생강", "가지", "피망", "양상추", "얼갈이", "토란", "아스파라거스", "기타채소", "대파"]
      },
    },
    {
      main: "축산",
      sub: {
        item: ["가공육", "돼지고기", "소고기", "계란/알류", "수입육", "닭", "한우", "기타정육", "기타축산", "오리고기"]
      },
    },
    {
      main: "수산/건어물",
      sub: {
        item: ["건어물", "김/파래김", "어패류", "새우", "갑각류", "구색선어", "오징어/문어", "갈치/삼치/고등어", "알/해삼", "낙지/쭈꾸미", "연어/참치", "가자미", "동태/명태", "기타수산"]
      },
    },
    {
      main: "즉석식품/양념",
      sub: {
        item: ["즉석밥", "죽/스프", "카레/짜장", "소금/설탕", "스팸/햄", "도시락", "참치캔", "라면", "통조림", "소스", "오일/기름", "고춧가루", "깨", "다시다/미원", "사리얼", "고추장/된장/간장", "맛술/액젓", "식초/물엿", "제빵믹스", "기타즉석", "시럽/잼", "케찹/마요네즈", "드레싱"]
      },
    },
    {
      main: "냉장/냉동식품",
      sub: {
        item: ["김치/젓갈", "밀키트", "면류", "요거트/요구르트", "국/탕/찜", "만두", "반찬/절임류", "아이스크림", "볶음/구이", "우유", "돈까스/너겟/치킨", "과일/야채음료", "두부/유부", "맛집", "어묵/유부/크래미", "피자/핫도그", "베이컨/소시지", "냉동과일", "안주/전류", "치즈/버터", "볶음밥/덮밥/죽", "떡볶이/떡사리", "젤리/푸딩", "감자튀김/치즈스틱", "떡갈비/함박스테이크", "닭가슴살", "두유", "튀김류", "샌드위치/버거", "기타식품", "베이커리"]
      },
    },
    {
      main: "생수/음료",
      sub: {
        item: ["커피", "건강식품", "탄산", "차", "과일/야채음료", "생수/탄산수", "기타음료", "코코아/핫초코", "전통음료", "꿀", "이온음료"]
      },
    },
    {
      main: "과자/빵",
      sub: {
        item: ["초콜릿", "과자", "쿠키", "시리얼", "튀김", "빵", "간식류소시지", "떡", "아이스크림", "캔디", "소스"]
      },
    },
    {
      main: "쌀/잡곡",
      sub: {
        item: ["쌀", "잡곡", "현미", "흑미", "견과", "건조식품", "건조과일", "깨", "콩", "조", "유기농", "씨앗"]
      }
    }
  ]
  const [category, setcategory] = useState("사과");
  const [size, setsize] = useState("10");
  const [sort, setsort] = useState("price,desc");
  // const [page, setpage] = useState("1");
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages]= useState(0);
  const page = useRef(0);
  const [product, setProduct] = useState([
    {
      id: "",
      score: "이미지URL",
      site: "상품 가격(원)",
      prdName: "상품 가격(원)",
      webUrl: "대분류카테고리",
      price: "소분류카테고리",
      purchase: 0,
      cat: "",
      subcat: "",
      imgSrc: ""
    }
  ]);

  const location = useLocation();
  const num = location.state;

  const subList = categoryList[num].sub.item;
  const [subcat, setSubcat] = useState("");


  const getProduct = (e) => {
    const cat = e.target.innerText;
    setcategory(cat);
    page.current = 0;
    axios.get('/search/subcat', {
      params: {
        category: `${cat}`,
        size: `${size}`,
        sort: `${sort}`,
        page: `${page.current}`
      }
  })
  .then(function (response) {
    setProduct(response.data.result.result.content)
    setTotalElements(response.data.result.result.totalElements);
    setTotalPages(response.data.result.result.totalPages);
  }).catch(function (error) {
      alert('error');
      console.log(error);  
  });
  };

  const handlePageChange = (Page) => {
    page.current = Page-1;
    axios.get('/search/subcat', {
      params: {
        category: `${category}`,
        size: `${size}`,
        sort: `${sort}`,
        page: `${page.current}`
      }
  })
  .then(function (response) {
    console.log(response)
    setProduct(response.data.result.result.content)
    console.log(page);
  }).catch(function (error) {
      alert('error');
      console.log(error);  
  });
  }


  return (
    <div>
        <Header setIsLogin={setIsLogin} isLogin={isLogin}/>
        <Nav />
        <div className="CategoryView container">
          <div className="SubCategoryList container">
            <h2>{categoryList[num].main}</h2>
              <div className="subCategoryBox">
               {subList.map((sub, index) => (
                <button className="subBtn" key={`cateSub${index + 1}`} onClick={getProduct}>{sub}</button>
                ))}  
              </div>
            </div>
      
            <div className="ItemList">
      <div className="msg">
        <h3>{category}</h3><span>의 특가 상품이 검색되었습니다.</span>
      </div>
       <div className="itemList">
        {product.map((data, index) => (
          <a href={data.webUrl} target="_blank">
          <div className="list-item" key={`상품목록${index+1}`}>
              <div className="item-img">
                <img src={data.imgSrc} style={{ width: "120px", height: "120px"}} alt="item" />
              </div>
            <div className="item-info">
                <div>
                <strong className="item-name">{data.prdName}</strong>
                <div className="item-price">{data.price}원</div>
              </div>
            </div>
            <div className="item-desc">
              <div><span>카테고리</span><span>{data.cat}&lt;{data.subcat}</span></div>
              <div><span>구매횟수</span><span>{data.purchase}</span></div>
              <div><span>판매처</span><span>{data.site}</span></div>
            </div>
          </div>
          </a>
        
        ))}
      </div>
    </div>
    <Pagination 
              activePage={page.current+1}
              itemsCountPerPage={30}
              totalItemsCount={totalElements}
              pageRangeDisplay={totalPages}
              onChange={handlePageChange}
              innerClass="page-ul"
              itemClass="page-li"
              activeClass="page-active"
              activeLinkClass="pagelink-active"

            ></Pagination>
        </div>
    </div>
    
)
}

export default CategoryView;