import { useState, useEffect } from 'react';
import { Coin } from './Coin.js'

export const Dashboard = () => {
    const [topCoins, setTopCoins] = useState([]);

    useEffect(() => {
        fetchTopCoins();

        // Set up an interval to refresh data every 60 seconds
        const intervalId = setInterval(fetchTopCoins, 60000); // 60000 ms = 60 seconds

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);

    }, [])

    const fetchTopCoins = async () => {
        const cacheKey = 'topCoinsData';
        const cachedData = sessionStorage.getItem(cacheKey);

        if (cachedData) {
            setTopCoins(JSON.parse(cachedData));
        }
        else {

            const url = new URL('https://api.coingecko.com/api/v3/coins/markets');
            const params = {
                vs_currency: 'zar',
                order: 'market_cap_desc',
                per_page: 2,
                page: 1,
                sparkline: false,
                price_change_percentage: '1h,24h,7d',
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
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();

                setTopCoins(data);

                // Cache data
                sessionStorage.setItem(cacheKey, JSON.stringify(data));

            } catch (error) {
                console.error('Failed to fetch coins:', error.message)

                const fallBackData = sessionStorage.getItem(cacheKey);
                if (fallBackData) {
                    setTopCoins(JSON.parse(fallBackData));
                }
            }
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
                    coinRank={index + 1}
                    coin={coin}
                />
            ))}
        </section>
    );
}