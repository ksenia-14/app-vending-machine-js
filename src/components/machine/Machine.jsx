import React from 'react';
import { AppContext } from '../../App';
import style from './machine.module.css';

/** Компонент - вендинговый автомат */
const Machine = () => {
  const context = React.useContext(AppContext)  // использование контекста
  const shortid = require('shortid'); // генерация ключей
  const numProducts = [1, 2, 3, 4, 5, 6, 7, 8]  // кнопки автомата

  /** ********************************************************
  * @brief  Внесение денег.
  * @param  banknote - стоимость купюры.
  */
  const moneyInput = (banknote) => {

    context.updateRender()
  }

  /** ********************************************************
   * @brief  Покупка товара.
   * @param  numProduct - номер товара.
   */
  const buyProduct = (numProduct) => {
    let quantity = context.products[numProduct].quantity
    if (quantity > 0) {
      quantity = quantity - 1
    }
    else {
      console.log('Товара нет')
    }
    context.updateRender()
  }

  /** ********************************************************
 * @brief  Получение сдачи.
 * @param  Нет.
 */
  const getSurrender = () => {

    context.updateRender()
  }

  return (
    <div className={style['machine']}>
      <div className={style['main-part']}>
        <div className={style['products-section']}>
          {context.products.map((el, index) => {
            return (
              index === 7 ? null :
                <div key={shortid.generate()} className={style['product-item']}>
                  <p className={style['product-number']}>{el.num} - {el.price} руб.</p>
                  <img className={style['product-img']} src={el.imgSrc} alt={el.title} />
                  <div className={style['shelf']}></div>
                </div>
            )
          })}
          <div className={style['product-item-double']}>
            <p className={style['product-number']}>{context.products[7].name}</p>
            <img className={style['product-img']} src={context.products[7].imgSrc} alt={context.products[7].title} />
            <div className={style['shelf']}></div>
          </div>
        </div>
        <div className={style['delivery-section']}></div>
      </div>

      <div className={style['operation-section']}>
        <div className={style['display']}>
          <p>Внесите деньги</p>
        </div>
        <div className={style['money-in']}></div>
        {numProducts.map(el => (
          <div key={shortid.generate()} className={style['btn']}>{el}</div>
        ))}
        <div className={style['btn-surrender']}>Получить сдачу</div>
      </div>
    </div>
  )
}

export default Machine