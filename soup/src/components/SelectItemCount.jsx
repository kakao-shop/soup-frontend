import axios from "axios";
export function urlSendHandler(a) {
        console.log("test", a);
        axios       
                      .post("/search/select/item", {
                        url: `${a}`,
                      }, {
                          headers: {
                              "x-access-token": localStorage.getItem(
                                  "access_token"
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