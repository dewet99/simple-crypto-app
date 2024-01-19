import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function CoinDetail () {
    let {id} = useParams()
    const [coinDetails, setCoinDetails] = useState([]);

    useEffect(() => {
        fetchCoinByID();
      }, [id])

    const fetchCoinByID = async () => {
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
    
        } catch (error) {
          console.error('Failed to fetch coins:', error.message)
        }
    
      }

      return (
        <section>
          <div>Hehe I show coin detoil harea</div>
        </section>
      );

    
}