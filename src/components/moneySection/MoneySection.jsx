import React from 'react';
import { AppContext } from '../../App';
import style from './moneySection.module.css';

const MoneySection = () => {
  const context = React.useContext(AppContext)  // использование контекста
  const shortid = require('shortid'); // генерация ключей 

  /** ********************************************************
  * @brief  Внесение денег.
  * @param  banknoteCost - стоимость купюры.
  */
  const moneyInput = (banknoteCost) => {
    let curSum = Number(context.balance) // текущая сумма денег в автомате
    console.log('moneyInput '+curSum)
    let id_add = context.banknotes.filter(el => el.cost === banknoteCost)[0].id // id банкноты
    if ((curSum + Number(banknoteCost)) <= 1000) { // лимит автомата
      context.setBalance(curSum + Number(banknoteCost)) // пополнение баланса
      context.banknotes[id_add].cash = context.banknotes[id_add].cash + 1
    } else {
      context.resetSurrender()
      context.banknotes[id_add].surrender = context.banknotes[id_add].surrender + 1
      context.setMessage('Макс. баланс 1000')
    }
    context.updateRender()
  }

  return (
    <div className={style['money-section']}>
      <p>Внести деньги</p>
      {context.banknotes.map(el => {
        return (
          <img key={shortid.generate()}
            className={style['banknote']}
            src={el.imgSrc}
            alt={el.name}
            onClick={() => moneyInput(el.cost)}
          />
        )
      })}
    </div>
  )
}

export default MoneySection