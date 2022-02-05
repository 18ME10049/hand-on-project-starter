import React from 'react';
import photo11 from './Photo11.svg'
import photo12 from './Photo12.svg'
import style from './Header.module.scss';
import {Link} from 'react-router-dom'

const Header = () => {
  return <div>
  <div className={style.box}>
  <img className={style.image11} src={photo11} alt="" />
  <img className={style.image12} src={photo12} alt="" />
  <h2 className={style.text}>BACKGROUND IMAGE REMOVE</h2>
  </div>
  <h2 className={style.texth2}>100% automatic and free</h2>
  <Link to="/bg-remover">
          <button type="button" className={style.btn}>View App
         </button>
  </Link>
</div>;
};

export default Header;
