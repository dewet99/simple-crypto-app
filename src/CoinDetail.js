import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SparklineChart } from './Sparkline';

export function CoinDetail() {
    let { id } = useParams()
    const [coinDetails, setCoinDetails] = useState([]);
    let localeString = 'en-US'

    useEffect(() => {
        fetchCoinByID();

    }, [id])

    const fetchCoinByID = async () => {

        const url = new URL(`https://api.coingecko.com/api/v3/coins/${id}`);
        const params = {
            sparkline: true,
            vs_currency: 'zar',
        
            localisation: 'zar'
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

        } catch (error) {
            console.error('Failed to fetch coins:', error.message)
        }
    }

    const SparklineWrapper = () => {
        const fillColor = coinDetails.market_data?.price_change_percentage_7d_in_currency.usd >= 0 ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';
        const lineColor = coinDetails.market_data?.price_change_percentage_7d_in_currency.usd >= 0 ? 'rgb(0, 255, 0)' : 'rgb(255, 0, 0)';

        return (
            <div className='sparkline-container'>
                {coinDetails.market_data?.sparkline_7d.price.length > 0 &&
                    <SparklineChart
                        sparklineData={coinDetails.market_data?.sparkline_7d.price}
                        lineColor={lineColor}
                        fillColor={fillColor}
                        titleData={coinDetails.name + ' 7D Price Change - USD'}
                    />}
                <div className='smalltext'>*The the sparkline displays the 7-day price change in USD, whereas the 7D change on the left is in ZAR and factors in the exchange rate.</div>

                
            </div>
        );
    }



    const coinDetailContainer = () => {
        return (
            <div className='coin-detail-container'>
                <div className='coin-detail-header-row'>
                    <img src={coinDetails.image?.small} className='coin-detail-header' />
                    <h1 className='coin-detail-name'> {coinDetails.name}</h1>
                </div>
                <div className='coin-detail-price'>ZAR {coinDetails.market_data?.current_price.zar.toLocaleString(localeString)}</div>
                <div className='detail-item-container'>
                    <span className='detail-item-label'>Market Cap:</span>
                    <span className='detail-item-value'>ZAR {coinDetails.market_data?.market_cap.zar.toLocaleString(localeString)}</span>
                </div>
                <div className='detail-item-container'>
                    <span className='detail-item-label'>24 Hour Trading Vol:</span>
                    <span className='detail-item-value'>ZAR {coinDetails.market_data?.total_volume.zar.toLocaleString(localeString)}</span>
                </div>
                <div className='detail-item-container'>
                    <span className='detail-item-label'>Fully Diluted Valuation:</span>
                    <span className='detail-item-value'>ZAR {coinDetails.market_data?.fully_diluted_valuation.zar.toLocaleString(localeString)}</span>
                </div>
                <div className='detail-item-container'>
                    <span className='detail-item-label'>Circulating Supply:</span>
                    <span className='detail-item-value'>{coinDetails.market_data?.circulating_supply?.toLocaleString(localeString)}</span>
                </div>
                <div className='detail-item-container'>
                    <span className='detail-item-label'>Total Supply:</span>
                    <span className='detail-item-value'>{coinDetails.market_data?.total_supply?.toLocaleString(localeString)}</span>
                </div>
                <div className='detail-item-container'>
                    <span className='detail-item-label'>Max Supply:</span>
                    <span className='detail-item-value'>{coinDetails.market_data?.max_supply?.toLocaleString(localeString)}</span>
                </div>
                <div className='detail-item-container'>
                    <span className='detail-item-label'>7d Change - ZAR Relative:</span>
                    <span className={`detail-item-value ${coinDetails.market_data?.price_change_percentage_7d_in_currency.zar >= 0 ? 'positive-change' : 'negative-change'}`}>{coinDetails.market_data?.price_change_percentage_7d_in_currency.zar}%</span>
                </div>
            </div>
        );
    }

    return (
        <section>
            <div className='layout-container'>
                <div className='details-and-sparkline-container'>
                    {coinDetailContainer()}
                    {SparklineWrapper()}
                </div>
            </div>
            
        </section>

    );


}