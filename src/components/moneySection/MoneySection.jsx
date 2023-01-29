import React from 'react';
import { AppContext } from '../../App';
import style from './moneySection.module.css';

const MoneySection = () => {
  const context = React.useContext(AppContext)  // использование контекста
  const shortid = require('shortid'); // генерация ключей 
  const [sumAll, setSumAll] = React.useState(0)  // сумма всех средств в автомате

  /** ********************************************************
  * @brief  Внесение денег.
  * @param  banknoteCost - стоимость купюры.
  */
  const moneyInput = (banknoteCost) => {
    let curSum = Number(context.balance) // текущая сумма денег в автомате

    getSumAll()
    console.log('В автомате всего: '+ sumAll)

    if ((context.products.filter(el => el.quantity > 0).length === 0) &&
      (context.balance === 0)) {
      context.setMessage('Все товары закончились')
      return
    }
    
    if (sumAll < (curSum + Number(banknoteCost))) {
      context.setMessage('В автомате не хватает средств')
      console.log('Баланс: '+ Number(curSum))
    }
    else {
      console.log('Баланс: '+ Number(curSum + Number(banknoteCost)))
      let id_add = context.banknotes.filter(el => el.cost === banknoteCost)[0].id // id банкноты
      if ((curSum + Number(banknoteCost)) <= 1000) { // лимит автомата
        context.setBalance(curSum + Number(banknoteCost)) // пополнение баланса
        context.banknotes[id_add].cash = context.banknotes[id_add].cash + 1
        context.setMessage('')
      } else {
        context.resetSurrender()
        context.banknotes[id_add].surrender = context.banknotes[id_add].surrender + 1
        context.setMessage('Макс. баланс 1000')
      }
      context.updateRender()
    }
  }

  /** ********************************************************
  * @brief  Сумма доступная для выдачи в автомате.
  * @param  Нет.
  */
  const getSumAll = () => {
    let sum = 0
    for (let i = 0; i < context.banknotes.length - 1; i++) {
      sum = sum + context.banknotes[i].cost * context.banknotes[i].cash
    }
    for (let i = 0; i < context.coins.length; i++) {
      sum = sum + context.coins[i].cost * context.coins[i].cash
    }
    for (let i = 0; i < context.products.length; i++) {
      sum = sum + context.products[i].price * context.products[i].quantity
    }
    setSumAll(sum)
  }

  React.useEffect(() => { 
    getSumAll()
  }, [context.render])

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