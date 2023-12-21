import { useEffect, useState } from "react";
import { getCoinList } from "../../services/cryptoApi.js";
import TableCoin from "../modules/TableCoin";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  useEffect(() => {
    fetch(getCoinList())
      .then((res) => res.json())
      .then((json) => setCoins(json));
      setIsLoading(false);

    // const getData = async () => {
    //   const res = await fetch(getCoinList());
    //   const json = await res.json();
    //   setCoins(json);
    // };
    // getData();
  }, []);
  return (
    <>
      <TableCoin coins={coins} isLoading={isLoading}/>
    </>
  );
}

export default HomePage;
