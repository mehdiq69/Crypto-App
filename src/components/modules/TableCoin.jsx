import React from "react";

import { RotatingLines } from "react-loader-spinner";
import { marketChart } from "../../services/cryptoApi";

import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import styles from "./TableCoin.module.css";

function TableCoin({ coins, isLoading, currency, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                currency={currency}
                coin={coin}
                key={coin.id}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ currency, coin, setChart }) => {
  const {
    id,
    name,
    image,
    symbol,
    total_volume,
    price_change_percentage_24h: price_change,
    current_price,
  } = coin;
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id, currency));
      const json = await res.json();
      setChart({ ...json, coin: coin });
    } catch (error) {
      setChart(null);
      console.log(error);
    }
  };
  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {(currency === "usd" && "$ ") ||
          (currency === "eur" && "€ ") ||
          (currency === "jpy" && "¥ ")}
        {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
};
