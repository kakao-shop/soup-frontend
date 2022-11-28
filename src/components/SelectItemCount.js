import axios from "axios";
export function urlSendHandler(a) {
    axios
        .post(
            "/search/select/item",
            {
                score: `${a.score}`,
                site: `${a.site}`,
                prdName: `${a.prdName}`,
                webUrl: `${a.webUrl}`,
                price: `${a.price}`,
                purchase: `${a.purchase}`,
                cat: `${a.cat}`,
                subcat: `${a.subcat}`,
                imgSrc: `${a.imgSrc}`
            },
            {
                headers: {
                    "x-access-token": localStorage.getItem("accessToken")
                }
            }
        )
        .then((response) => {})
        .catch((error) => console.log(error));
}
