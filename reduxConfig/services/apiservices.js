import axios from "axios";

const getAPI = (url, contentType = `application/json`) => {
  return axios({
    method: "get",
    url: `${url}`,
    headers: {
      "content-type": contentType,
    },
  })
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

export default { getAPI };
