import React from 'react';
import { AppContext } from '../../App';
import style from './moneySurrender.module.css';

const MoneySurrender = () => {
  const context = React.useContext(AppContext)  // использование контекста
  const shortid = require('shortid'); // генерация ключей
  return (
    <div className={style['money-section']}>
      <p className={style['title']}>Сдача</p>
      {context.banknotes.map(el => {
        return (
          <div key={shortid.generate()} className={style['money-string']}>
            <img className={style['banknote']} src={el.imgSrc} alt={el.name} />
            <p className={style['quantity']}>x{el.surrender}</p>
          </div>
        )
      })}

      <div className={style['coin-section']}>
        {context.coins.map(el => {
          return (
            <div key={shortid.generate()} className={style['money-string']}>
              <img className={style['coin']} src={el.imgSrc} alt={el.name} />
              <p className={style['quantity']}>x{el.surrender}</p>
            </div>
          )
        })}

      </div>
    </div >
  )
}

export default MoneySurrender