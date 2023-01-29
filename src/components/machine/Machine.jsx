import React from 'react';
import { AppContext } from '../../App';
import style from './machine.module.css';

/** Компонент - вендинговый автомат */
const Machine = () => {
  const context = React.useContext(AppContext)  // использование контекста
  const shortid = require('shortid') // генерация ключей
  const [selectedProduct, setSelectedProduct] = React.useState(10)  // state для выбранного продукта

  /** ********************************************************
   * @brief  Покупка товара.
   * @param  numProduct - номер товара.
   */
  const buyProduct = (numProduct) => {
    let quantity = context.products[numProduct].quantity
    let price = context.products[numProduct].price
    if (quantity > 0) { // наличие товара
      if (context.balance >= price) { // проверка баланса
        context.products[numProduct].quantity = quantity - 1
        setSelectedProduct(numProduct)
        context.setMessage('Куплен товар ' + (numProduct + 1))
        context.setBalance(context.balance - price)
      }
      else {
        context.setMessage('Не хватает средств')
      }
    }
    else {
      context.setMessage('Товар закончился')
    }
    context.updateRender()
  }

  /** ********************************************************
 * @brief  Получение сдачи.
 * @param  Нет.
 */
  const getSurrender = () => {
    context.resetSurrender()
    let balance = context.balance
    let surrender = balance // сумма сдачи

    console.log(context.banknotes)

    // выдача сдачи деньгами
    for (let i = context.banknotes.length - 2; i >= 0; i--) {
      while ((context.banknotes[i].cash > 0) && // купюра в наличии
        (balance >= context.banknotes[i].cost) // баланс больше или равен купюре
      ) {
        context.banknotes[i].surrender = context.banknotes[i].surrender + 1
        context.banknotes[i].cash = context.banknotes[i].cash - 1
        balance = balance - context.banknotes[i].cost
      }
    }
    for (let i = context.coins.length - 1; i >= 0; i--) {
      while ((context.coins[i].cash > 0) && // монета в наличии
        (balance >= context.coins[i].cost) // баланс больше или равен монете
      ) {
        context.coins[i].surrender = context.coins[i].surrender + 1
        context.coins[i].cash = context.coins[i].cash - 1
        balance = balance - context.coins[i].cost
      }
    }

    // если денег не хватило
    if (balance !== 0) {
      let productsSort = Array.from(context.products);
      productsSort.sort((a, b) => (b.price - a.price))
      for (let i = 0; i < productsSort.length; i++) {
        while ((productsSort[i].quantity > 0) &&
          (productsSort[i].price <= balance)) {
          productsSort[i].quantity = productsSort[i].quantity - 1
          productsSort[i].surrender = productsSort[i].surrender + 1

          balance = balance - productsSort[i].price
        }
      }
    }

    context.setBalance(balance)
    context.setSurrender(surrender - balance)

    if (balance === 0) {
      context.setMessage('Сдача получена')
    }
    else {
      console.log(context.banknotes.filter(el => el.cash > 0))
      context.setMessage('Не хватает мелких купюр. Дополните до ' + 
        context.banknotes.filter(el => el.cash > 0)[0].cost
      )
    }

    context.updateRender()
  }

  React.useEffect(() => { }, [context.render])

  return (
    <div className={style['machine']}>
      <div className={style['main-part']}>
        <div className={style['products-section']}>
          {context.products
            .filter(el => el.num < 7)
            .map(el => {
              return (
                <div key={shortid.generate()} className={style['product-item']}>
                  <p className={style['product-number']}>{el.num + 1} - {el.price} руб.</p>
                  {el.quantity ? <img className={style['product-img']} src={el.imgSrc} alt={el.title} /> : null}
                  <div className={style['shelf']}></div>
                </div>
              )
            })}
          <div className={style['product-item-double']}>
            <p className={style['product-number']}>{context.products[7].num + 1} - {context.products[7].price} руб.</p>
            {context.products[7].quantity ?
              <img className={style['product-img']} src={context.products[7].imgSrc} alt={context.products[7].title} />
              : null}
            <div className={style['shelf']}></div>
          </div>
        </div>
        <div className={style['delivery-section']}>
          {(selectedProduct === 10) ?
            null :
            <img className={style['product-img']}
              src={context.products[selectedProduct].imgSrc}
              alt={context.products[selectedProduct].title} />
          }
        </div>
      </div>

      <div className={style['operation-section']}>
        <div className={style['display']}>
          <p>Внесено: {context.balance}</p>
          <p>{context.message}</p>
        </div>
        <div className={style['money-in']}></div>
        {context.products.map(el => (
          <div key={shortid.generate()}
            className={style['btn']}
            onClick={() => buyProduct(el.num)}
          >
            {el.num + 1}
          </div>
        ))}
        <div className={style['btn-surrender']}
          onClick={getSurrender}
        >
          Получить сдачу</div>
      </div>
    </div>

  )
}

export default Machine