import React from 'react';
import { AppContext } from '../../App';
import style from './cash.module.css';

const Cash = () => {
  const context = React.useContext(AppContext)  // использование контекста
  const shortid = require('shortid'); // генерация ключей

  /** ********************************************************
  * @brief  Сброс сдачи до начальных значений.
  * @param  Нет.
  */
  const setInitMoney = () => {
    context.setBanknotes(context.initBanknotes)
    context.setCoins(context.initCoins)
  }

  /** ********************************************************
  * @brief  Восполнение количества продуктов до начальных значений.
  * @param  Нет.
  */
  const setInitProducts = () => {
    context.setProducts(context.initProducts)
  }

  React.useEffect(() => {

  }, [context.render])

  return (
    <div className={style['main-container']}>
      <p>Количество денег в автомате</p>
      <table>
        <tbody>
          <tr>
            <td>Номинал</td>
            <td>Количество</td>
          </tr>
          {context.banknotes.map(el => {
            return (
              <tr key={shortid.generate()}>
                <td>{el.cost} руб.</td>
                <td>{el.cash}</td>
              </tr>
            )
          })}
          {context.coins.map(el => {
            return (
              <tr key={shortid.generate()}>
                <td>{el.cost} руб.</td>
                <td>{el.cash}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p>Количество товаров в автомате</p>
      <table>
        <tbody>
          <tr>
            <td>Название</td>
            <td>Количество</td>
          </tr>
          {context.products.map(el => {
            return (
              <tr key={shortid.generate()}>
                <td>{el.title}</td>
                <td>{el.quantity}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={setInitMoney}>Добавить сдачу в автомат</button>
      <button onClick={setInitProducts}>Добавить товары в автомат</button>
    </div>
  )
}

export default Cash