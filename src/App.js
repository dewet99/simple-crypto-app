import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Component } from 'react';

// const coins = 

const Dashboard = () => {
  const [topCoins, setTopCoins] = useState([]);

  useEffect(() => {
    fetchTopCoins();
  }, [])

  const fetchTopCoins = async () => {
    const url = new URL('https://api.coingecko.com/api/v3/coins/markets');
    const params = {
      vs_currency: 'zar',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: false,
      price_change_percentage: '1h,24h,7d',
      precision: '2',
    };
    url.search = new URLSearchParams(params).toString();


    try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

      if (!response.ok) {
        throw new Error('Error: ${response.status}');
      }
      const data = await response.json();

      setTopCoins(data);

    } catch (error) {
      <div>Too many requests, wait a few minutes and try again UwU</div>
    }

  }


  const dashboardHeader = () => {
    return (
      <div className='coin-container'>
        <div className='coin-row'>
          <div className='header-id'>Coin Rank</div>
          <div className='header-name'>Coin Name</div>
          <div className='header-price'>Price (ZAR)</div>
          <div className='header-default'>1h</div>
          <div className='header-default'>24h</div>
          <div className='header-default'>7d</div>
        </div>
      </div>
    );
  }

  return (
    <section>
      {dashboardHeader()}
      {topCoins.map((coin, index) => (
        <Coin
          key={coin.id}
          coinRank = {index+1}
          coin={coin}
        />
      ))}
    </section>
  );
}

function Coin({coinRank, coin }) {

  return (
    <div className='coin-container'>
      <div className='coin-row'>
        <div className='coin-rank'>{coinRank}</div>
        <div className='coin-name'><img src = {coin.image} alt = {coin.id} className = 'header-name' /> {coin.name}</div>
        <div className='coin-price'>{coin.current_price}</div>
        <div className={`coin-default ${coin.price_change_percentage_1h_in_currency >= 0 ? 'positive-change' : 'negative-change'}`}>
          {parseFloat(coin.price_change_percentage_1h_in_currency.toFixed(2))}%
        </div>
        <div className={`coin-default ${coin.price_change_percentage_24h >= 0 ? 'positive-change' : 'negative-change'}`}>
        {parseFloat(coin.price_change_percentage_24h.toFixed(2))}%
        </div>
        <div className={`coin-default ${coin.price_change_percentage_7d_in_currency >= 0 ? 'positive-change' : 'negative-change'}`}>
        {parseFloat(coin.price_change_percentage_7d_in_currency.toFixed(2))}%
        </div>
      </div>
    </div>

    // {<>{coinName} has a price of {coinPrice} {coinCurrency}</>}
  );
}

export default Dashboard;