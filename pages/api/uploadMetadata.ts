import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const JWT = `Bearer ${process.env.PINATA_JWT}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var config: AxiosRequestConfig = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: JWT,
    },
    data: JSON.stringify(req.body),
  };
  const response: AxiosResponse = await axios(config);
  console.log("mtdta res from server: ", response.data);
  res.status(200).json(response.data);
}
