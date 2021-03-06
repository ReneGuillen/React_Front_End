import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';
import 'react-app-polyfill/stable'
import FavCoin from './FavCoin';
import { RiAddCircleFill, RiCloseCircleFill, RiContactsBookLine} from 'react-icons/ri';
import {AiFillGithub, AiOutlineGithub, AiFillStar} from 'react-icons/ai';

//Retrieves crypto-coins from gecko API and connects to the back end / database.
function App() {
  
  const [search, setSearch] = useState('')
  const [user, username] = useState([])
  const [coins, setCoins] = useState([]);
  const [favCoins, setFavCoins] = useState([]);

  //API get request to get all coins from gecko site up to 50 per page.
  useEffect(() =>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
    ).then(res => {
      setCoins(res.data);
    }).catch(error => console.log(error));
  }, []);

  //Call back-end to get all coins from user's list on database.
  useEffect(() =>{
    axios.get('https://cryptocurrency-watcher.herokuapp.com/showCoins'
    ).then(res => {
      username(res.data);
    }).catch(error => console.log(error));
  }, []);

  //Set search imput to new react state.
  const handleChange = e => {
    setSearch(e.target.value)
  }

  //Filter coins based on user input search using react state.
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  //Method to add coin to fav list using react stated.
  const addCoin = coinObj => {
    axios.get('https://cryptocurrency-watcher.herokuapp.com/addStock?stock=' + coinObj.name);
    const newArray = coins.filter((coin) => coin.name !== coinObj.name);
    setCoins(newArray);
    const newArray2 = [coinObj, ...favCoins];
    setFavCoins(newArray2);
  }

  //Method to remove coin from fav list using react state.
  const removeCoin = coinObj => {
    axios.get('https://cryptocurrency-watcher.herokuapp.com/deleteStock?stock=' + coinObj.name);
    const dblist = user.filter((item) => item !== coinObj.name);
    username(dblist);
    const newArray = favCoins.filter((coin) => coin.name !== coinObj.name);
    setFavCoins(newArray);
    const newArray2 = [coinObj, ...coins];
    setCoins(newArray2);
  };

  return (
    <div className="app">
      <div className="navbar">
        <h1 className="welcome" ><AiOutlineGithub size="30px"/>  Hello {userLogin}</h1>
        <a href="https://cryptocurrency-watcher.herokuapp.com/logout" className="log-button">
          <h1 className="txt-logo">Logout</h1>
          </a>
      </div>
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text"> Crypto Watcher</h1>
            <form>
              <input type="text" placeholder="Search"
              className="coin-input" onChange={handleChange}/>
            </form>
        </div>
        <AiFillStar className="star-icon" size="35px" color="yellow"></AiFillStar>
        <div className="favorite-list">
          {filteredCoins.length <= 0 ? (
                <h1 className="fav-txt">Add coins to your fav list! : )</h1>
                ) : (filCoins.map(coin => {
                  return (
                    <FavCoin
                      key={coin.id} 
                      name={coin.name} 
                      symbol={coin.symbol}
                      image={coin.image}
                      marketcap={coin.market_cap}
                      price={coin.current_price}
                      priceChange={coin.price_change_percentage_24h}
                      volume={coin.total_volume}
                      icon={<RiCloseCircleFill onClick={() => removeCoin(coin)} className="react-icon2"/>}
                      />
                  )
                }))
          }
        </div>
        <h1 className="fav-tag"> All Coins </h1>
        <div className="all-coins">
          {filteredCoins.map(coin => {
            return (
              <Coin 
              key={coin.id} 
              name={coin.name} 
              symbol={coin.symbol}
              image={coin.image}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
              icon={<RiAddCircleFill onClick={() => addCoin(coin)} className="react-icon"/>}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
