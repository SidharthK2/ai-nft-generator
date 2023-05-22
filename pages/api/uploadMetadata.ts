import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var config: AxiosRequestConfig = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer PINATA JWT",
    },
    data: JSON.stringify(req.body),
  };
  const response = await axios(config);
  console.log(response.data);
  res.status(200).json(response);
}
