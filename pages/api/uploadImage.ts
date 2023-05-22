import axios from "axios";
import axiosRetry from "axios-retry";
import FormData from "form-data";
import { NextApiRequest, NextApiResponse } from "next";
const JWT = `Bearer ${process.env.PINATA_JWT}`;

const uploadToPinata = async (sourceUrl: string) => {
  const axiosInstance = axios.create();

  axiosRetry(axiosInstance, { retries: 5 });
  const data = new FormData();

  const response = await axiosInstance(sourceUrl, {
    method: "GET",
    responseType: "stream",
  });
  data.append(`file`, response.data);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          //@ts-ignore
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          Authorization: JWT,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await uploadToPinata(req.body);
  res.status(200).json(response);
}
