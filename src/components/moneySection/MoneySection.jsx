import React from 'react';
import { AppContext } from '../../App';
import style from './moneySection.module.css';

const MoneySection = () => {
  const context = React.useContext(AppContext)  // использование контекста
  const shortid = require('shortid'); // генерация ключей
  return (
    <div className={style['money-section']}>
      <p>Внести деньги</p>
      {context.banknotes.map(el => {
        return (
          <img key={shortid.generate()} className={style['banknote']} src={el.imgSrc} alt={el.name} />
        )
      })}
    </div>
  )
}

export default MoneySection