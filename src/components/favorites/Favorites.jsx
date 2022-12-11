import React from "react";
import FavoritesItem from "./item/FavoritesItem.jsx";
import axios from "axios";
import style from './favorites.module.css';
import { AppContext } from "../../App.jsx";

const Favorites = (props) =>{

  const context = React.useContext(AppContext)
    const onAddOverlay = (obj) => {
        axios.post('https://6384b47a3fa7acb14ffdedd5.mockapi.io/cart', obj)
        context.setOverlayItems([...props.overlayItems, obj]);
      }
    
      const onDeleteFav = (id)=> {
        console.log(id);
        axios.delete(`https://6384b47a3fa7acb14ffdedd5.mockapi.io/favorites/${id}`)
        context.setFavorites((fav) => fav.filter(item => item.id !==id));
      }
    
        return(
            <div className={style.cart_section}>
                <div className={style.search}>
                <h1>Избранные товары</h1>
                
                </div>
                
                <div className={style.cart}>
                {
                props.favorites.map(obj =>{
                 return(
                    <FavoritesItem 
                        key={obj.id}
                        id={obj.id}
                        title={obj.title} 
                        price={obj.price}
                        img={obj.img}
                        
                        onDeleteFav={ (id)=>{
                            onDeleteFav(id)
                            
                          }
                        }
    
                        onPlus={(cartObj) =>{
                          console.log(cartObj)
                          onAddOverlay(cartObj)
                        }
                        }
                    />
                  
                )
              })
            }
                </div>
            </div>           
        )
}

export default Favorites;