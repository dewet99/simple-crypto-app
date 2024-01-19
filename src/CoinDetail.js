import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function CoinDetail() {
    let { id } = useParams()
    const [coinDetails, setCoinDetails] = useState([]);

    useEffect(() => {
        fetchCoinByID();

        // Set up an interval to refresh data every 60 seconds - because API rate limiter
        const intervalId = setInterval(fetchCoinByID, 60000); // 60000 ms = 60 seconds

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);

    }, [id])

    const fetchCoinByID = async () => {
        
        // Cache data to prevent API call rate limit. Because free version of API.
        const cacheKey = `coinDetailsData_${id}`;
        const cachedData = sessionStorage.getItem(cacheKey);

        if (cachedData) {
            setCoinDetails(JSON.parse(cachedData));
        }
        else {
            const url = new URL(`https://api.coingecko.com/api/v3/coins/${id}`);
            const params = {
                vs_currency: 'zar',
                localization: 'false',
                developer_data: 'false',
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

                setCoinDetails(data);
                sessionStorage.setItem(cacheKey, JSON.stringify(data));

            } catch (error) {
                console.error('Failed to fetch coins:', error.message)

                const fallBackData = sessionStorage.getItem(cacheKey);
                if (fallBackData) {
                    setCoinDetails(JSON.parse(fallBackData));
                }
            }
        }
        

    }

    return (
        <div className='coin-detail-container'>
            <div className='coin-detail-header-row'>
                <img src = {coinDetails.image?.small} className='coin-detail-header'/>
                <h1 className='coin-detail-name'> {coinDetails.name}</h1>
            </div>
            <div className='coin-detail-price'>ZAR {coinDetails.market_data?.current_price.zar}</div>
            <div className='coin-detail-info'>Market cap: ZAR {coinDetails.market_data?.market_cap.zar}</div>
        </div>
    );


}