import './App.css';
import Header from './components/header/Header.jsx';
// import Banner from './components/banner/Banner.jsx';
// import Cart from './components/cart/Cart.jsx';
import Footer from './components/footer/Footer.jsx';
import Overlay from './components/overlay/Overlay.jsx';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';
import Favorites from './components/favorites/Favorites';
import Home from './components/Home';
import Form from './components/form/Form';

export const AppContext = React.createContext({})

function App() {
  //состояние корзины
  const [overlayOpen, setOverlayOpen] = React.useState(false)
  //хранение данных туров
  const [tyrs, setTyrs] = useState([])
  //для хранения объектов корзины
  const [overlayItems, setOverlayItems] = React.useState([])
  //Для поиска
  const [search, setSearch] = React.useState('')
  //Для хранения избранных заявок
  const [favorites, setFavorites] = React.useState([])

  React.useEffect(() => {
    async function axiosData(){

      const toursData = await axios.get('https://6384b47a3fa7acb14ffdedd5.mockapi.io/typs')
        
      const cartData = await axios.get('https://6384b47a3fa7acb14ffdedd5.mockapi.io/cart')
       
      const favoritesData = await axios.get('https://6384b47a3fa7acb14ffdedd5.mockapi.io/favorites')

      setTyrs(toursData.data)
      setOverlayItems(cartData.data)
      setFavorites(favoritesData.data)
    }
      axiosData();
    
  
  }, [])
  
  const deleteItems = (id) => {
      console.log(id);
      axios.delete(`https://6384b47a3fa7acb14ffdedd5.mockapi.io/cart/${id}`)
      setOverlayItems((objDelete) => objDelete.filter(item => item.id !== id))
  }

  const isAdded =(myId)=>{
      return overlayItems.some((objIsAdded) => objIsAdded.myId === myId)
  }

  const isFav =(myId) =>{
      return overlayItems.some((objIsFav) => objIsFav.myId === myId)
  }

  return (
    <AppContext.Provider
    value={{
      tyrs,
      setTyrs,
      overlayItems,
      setOverlayItems,
      favorites,
      setFavorites,
      isAdded,
      isFav
    }}
    >
    <div className="App">
      { overlayOpen ? 
    <Overlay 

      total_price = {
        overlayItems.reduce((elements = overlayItems.length, obj) => elements + obj.price, 0)
      }

      overlayProp = {overlayItems} 
      closeOverlay = {() => setOverlayOpen(false)}
      deleteItems = {deleteItems}
      />: null}
    
    

    <Header openOverlay = {() => setOverlayOpen(true)} overlayItems={overlayItems}/>
      <Routes>
        <Route path='/favorites'
          element={
            <Favorites
            favorites={favorites}
            setFavorites={setFavorites}
            item={tyrs}
            overlayItems={overlayItems} 
            setOverlayItems={setOverlayItems}
            />
          }
        />  
        <Route path='/'
          element={
            <Home
              item={tyrs} 
              overlayItems={overlayItems} 
              setOverlayItems={setOverlayItems}
              setSearch={setSearch}
              search={search}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        /> 

        <Route path='/form'
        element={
          <Form/>
        } 
        />   
      </Routes>
      <Footer/>
      
    </div>
    </AppContext.Provider>
  );
}

export default App;
