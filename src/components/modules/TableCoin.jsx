import React from "react";

import { RotatingLines } from "react-loader-spinner";

import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

function TableCoin({ coins, isLoading }) {
  return (
    <>
      {isLoading ? (
        <RotatingLines />
      ) : (
        <table>
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
              <TableRow coin={coin} key={coin.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default TableCoin;

const TableRow = ({ coin }) => (
  <tr>
    <td>
      <div>
        <img src={coin.image} alt={coin.name} />
        <span>{coin.symbol.toUpperCase()}</span>
      </div>
    </td>
    <td>{coin.name}</td>
    <td>${coin.current_price.toLocaleString()}</td>
    <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
    <td>{coin.total_volume.toLocaleString()}</td>
    <td>
      <img
        src={coin.price_change_percentage_24h > 0 ? chartUp : chartDown}
        alt={coin.name}
      />
    </td>
  </tr>
);
