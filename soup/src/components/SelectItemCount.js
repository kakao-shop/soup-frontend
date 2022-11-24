import axios from "axios";
export function urlSendHandler(a) {
        console.log("test", a.prdName);
        axios       
                      .post("/search/select/item", {
                        score: `${a.score}`,
                        site: `${a.site}`,
                        prdName: `${a.prdName}`,
                        webUrl: `${a.webUrl}`,
                        price: `${a.price}`,
                        purchase: `${a.purchase}`,
                        cat: `${a.cat}`,
                        subcat: `${a.subcat}`,
                        imgSrc: `${a.imgSrc}`
                      }, {
                          headers: {
                              "x-access-token": localStorage.getItem(
                                  "accessToken"
                              )
                            },
                      })
                      .then(function(response) {
                          console.log(response);
                      })
                      .catch(function(error) {
                          console.log(error);
                      });
      }