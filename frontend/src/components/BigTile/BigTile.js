import React from 'react';
import style from './BigTile.module.scss';
import photo11 from './leftlogo.svg'
import photo12 from './girl.svg'
import {Link} from 'react-router-dom';

const BigTile = () => {
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

export default BigTile;