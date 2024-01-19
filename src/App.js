import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Component } from 'react';

// const coins = 

export default class Dashboard extends Component{
  
  dashboardHeader(){
    return (
      <div className='coin-container'>
      <div className='coin-row'>
        <div className='header-name'>Coin Name</div>
        <div className='header-id'>Coin ID</div>
        <div className='header-price'>Price</div>
        <div className='header-volume'>Volume</div>
      </div>
    </div>
  
    // {<>{coinName} has a price of {coinPrice} {coinCurrency}</>}
    );
  }

  render() {
    return (
      <section>
      {this.dashboardHeader()}
      <Coin 
        coinID={9909185341081}
        coinName='Bitcoin'
        coinPrice={123}
        coinCurrency='ZAR'
      />
      <Coin 
        coinID={9909185341081}
        coinName='Eth'
        coinPrice={600000}
        coinCurrency='ZAR'
      />
      <Coin 
        coinID={9909185341081}
        coinName='Doge'
        coinPrice={600000}
        coinCurrency='ZAR'
      />
      </section>
    );
  } 
}

function Coin({coinID, coinName, coinPrice, coinCurrency}) {

  return (
    <div className='coin-container'>
      <div className='coin-row'>
        <div className='coin-name'>{coinName}</div>
        <div className='coin-id'>{coinID}</div>
        <div className='coin-price'>{coinCurrency} {coinPrice}</div>
        <div className='coin-volume'>{coinName}</div>
      </div>
    </div>

  // {<>{coinName} has a price of {coinPrice} {coinCurrency}</>}
  );
}

