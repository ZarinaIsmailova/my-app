import style from './footer.module.css'
const Footer=() =>{
    return(
        <footer>
        <div className={style.logo} >
          LIVE-TYR
        </div>
        <p>
         Единый многоканальный номер: +7(495)151-88-08
        
        <br/>
        <br/>
        Уполномеченные агенства ООО "Туристическая компания КаприС"
        </p>
      </footer>
    )
}
export default Footer