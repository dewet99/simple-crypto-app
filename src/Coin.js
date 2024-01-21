import { useNavigate } from 'react-router-dom'

export function Coin({ coinRank, coin }) {
  let navigate = useNavigate();

  const goToCoinDetail = () => {
    navigate(`/coin/${coin.id}`);
  }

  return (
    <div className='coin-container' >
      <div className='coin-row'>
        <div className='coin-rank'>{coinRank}</div>
        <div className='coin-name' onClick={goToCoinDetail}><img src={coin.image} alt={coin.id}/> {coin.name}</div>
        <div className='coin-price'>{coin.current_price.toLocaleString('zar')}</div>
        <div className={`coin-default ${coin.price_change_percentage_1h_in_currency >= 0 ? 'positive-change' : 'negative-change'}`}>
          {parseFloat(coin.price_change_percentage_1h_in_currency.toFixed(2))}%
        </div>
        <div className={`coin-default ${coin.price_change_percentage_24h_in_currency >= 0 ? 'positive-change' : 'negative-change'}`}>
          {parseFloat(coin.price_change_percentage_24h.toFixed(2))}%
        </div>
        <div className={`coin-default ${coin.price_change_percentage_7d_in_currency >= 0 ? 'positive-change' : 'negative-change'}`}>
          {parseFloat(coin.price_change_percentage_7d_in_currency.toFixed(2))}%
        </div>
      </div>
    </div>

  );
}