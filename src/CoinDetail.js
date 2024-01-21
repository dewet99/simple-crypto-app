import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SparklineChart } from './Sparkline';
import React from 'react';

export function CoinDetail() {
    let { id } = useParams()
    const [coinDetails, setCoinDetails] = useState([]);
    const [error, setError] = useState(null)

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
            setError(false);

        } catch (error) {
            console.error('Failed to fetch coins:', error.message)
            setError(true);
        }
    }

    const GoBackButton = () => {
        let navigate = useNavigate();

        const goBack = () => {
            navigate(-1);
        };

        return (
            <button onClick={goBack}>Back to Dashboard</button>
        );
    };

    // Component to display each item in the "Coin Details" page
    const DetailItem = ({ label, value, isCurrency, isPercentage, localeString, priceChange }) => {
        const formatValue = () => {
            if (isCurrency) {
                return `ZAR ${value.toLocaleString(localeString)}`;
            }
            if (isPercentage) {
                return `${value.toLocaleString(localeString)}%`;
            }
            return value.toLocaleString(localeString);
        };
        const valueClass = priceChange ? `${priceChange >= 0 ? 'positive-change' : 'negative-change'}` : '';

        return (
            <div className='detail-item-container'>
                <span className='detail-item-label'>{label}</span>
                <span className={`detail-item-value ${valueClass}`}>{formatValue(value)}</span>
            </div>
        );
    };

    const CoinDetailContainer = React.memo(({ coinDetails, localeString }) => {
        if (!coinDetails.market_data) {
            return <div className='coin-detail-container'>Loading...</div>;
        }

        const { market_data, name, image } = coinDetails;

        return (
            <div className='coin-detail-container'>
                <div className='coin-detail-header-row'>
                    <img src={image?.small} className='coin-detail-header' alt={`${name} logo`} />
                    <h1 className='coin-detail-name'> {name}</h1>
                </div>
                <DetailItem label="Market Rank:" value={market_data.market_cap_rank} isCurrency={false} localeString={localeString} />
                <DetailItem label="Price:" value={market_data.current_price.zar} isCurrency={true} localeString={localeString} />
                <DetailItem label="Market Cap:" value={market_data.market_cap.zar} isCurrency={true} localeString={localeString} />
                <DetailItem label="24hr Trading Vol:" value={market_data.total_volume.zar} isCurrency={true} localeString={localeString} />
                <DetailItem label="Fully Diluted Valuation:" value={market_data.fully_diluted_valuation.zar} isCurrency={true} localeString={localeString} />
                <DetailItem label="Circulating Supply:" value={market_data.circulating_supply} isCurrency={false} localeString={localeString} />
                <DetailItem label="Total Supply:" value={market_data.total_supply} isCurrency={false} localeString={localeString} />
                {market_data.max_supply ? <DetailItem label="Max Supply:" value={market_data.max_supply} isCurrency={false} localeString={localeString} /> : ''}
                <DetailItem
                    label="7d Change - ZAR Relative:"
                    value={market_data.price_change_percentage_7d_in_currency.zar}
                    isCurrency={false}
                    isPercentage={true}
                    localeString={localeString}
                    priceChange={market_data.price_change_percentage_7d_in_currency.zar}
                />
                <DetailItem
                    label="7d Change - USD Relative:"
                    value={market_data.price_change_percentage_7d_in_currency.usd}
                    isCurrency={false}
                    isPercentage={true}
                    localeString={localeString}
                    priceChange={market_data.price_change_percentage_7d_in_currency.usd}
                />
            </div>
        );
    });

    const DetailPage = () => {
        return (
            <section>
                <GoBackButton />
                <div className='layout-container'>
                    <div className='details-and-sparkline-container'>
                        <CoinDetailContainer coinDetails={coinDetails} localeString={'zar'} />
                        <SparklineChart coinDetails={coinDetails} />
                    </div>
                </div>
            </section>
        );
    }

    if (!error) {
        return (
            <DetailPage />
        );
    } else {
        return (
            <h1>Error fetching from API, wait a minute or two and try again</h1>
        );
    }


}