import { useEffect, useState } from "react";
import { getCoinList } from "../../services/cryptoApi.js";
import Pagination from "../modules/Pagination.jsx";
import Search from "../modules/Search.jsx";
import TableCoin from "../modules/TableCoin";
import Chart from "../modules/Chart.jsx";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(getCoinList(page, currency))
        .then((res) => res.json())
        .then((json) => setCoins(json));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }

    // const getData = async () => {
    //   const res = await fetch(getCoinList());
    //   const json = await res.json();
    //   setCoins(json);
    // };
    // getData();
  }, [page, currency]);
  return (
    <>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin
        currency={currency}
        coins={coins}
        isLoading={isLoading}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} currency={currency} />}
    </>
  );
}

export default HomePage;
