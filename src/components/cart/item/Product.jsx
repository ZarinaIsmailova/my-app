import style from './product.module.css';
import React from 'react';
import { AppContext } from '../../../App';

const Product = (props) => {

    const context = React.useContext(AppContext)  
    const [added, setAdded] = React.useState(context.isAdded);
    const [fav, setFav] = React.useState(false);

    const onClickFav =()=>{
      setFav(!fav);
      let id = props.id
      let myId = props.myId
      let title = props.title
      let description = props.description
      let price = props.price
      let img = props.img
      props.favBtn({id, myId, title, description, price, img});
    }

    const onClickAdd =()=>{
      setAdded(!added);
      let id = props.id
      let myId = props.myId
      let title = props.title
      let description = props.description
      let price = props.price
      let img = props.img
      props.onPlus({id, myId, title, description, price, img});
    }
    return(
        <div className={style.cart_item}>
          {
          context.isFav(props.myId) == true ?

          <button className={style.fav_btn_add} 
          onClick = {onClickFav}>Добавлен в избранное</button>
          :
          <button className={style.fav_btn} 
          onClick = {onClickFav}>Добавить в избранное</button>

          }
                <img className={style.cart_img} src={props.img}></img>
                <p className={style.cart_title}>{props.title}</p>
                <p className={style.cart_description}>Сочи из Москвы - 7 ночей<br/>05.12.2022 - 2 взрослых</p>
                <p className={style.price}>Цена</p>
                <div className={style.cart_price}>
                  <span>{props.price}</span>
                  <button className={style.add_cart} onClick = {onClickAdd}>{context.isAdded(props.myId) ? <img width={15} src={context.isAdded(props.myId) ? '/img/icon.png':''} alt=""/>:'Оставить заявку'}
                  </button>
                </div>
              </div>
    )
}
export default Product