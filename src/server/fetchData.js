import axios from "axios";
import { useEffect, useState } from "react";

// Send a request to the API
const FetchData = async (url) => {
  try {
    const req = await axios.get(url);
    if (req.status === 200) {
      const res = req.data;
      // Make the current quantity default 1
      const data = res.map((data) => ({
        ...data,
        quantity: 1,
      }));
      return data;
    }
  } catch (err) {}
};

export default FetchData;

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    FetchData(url).then((data) => {
      setData(data);
    });
  }, [url]);
  return data;
};
