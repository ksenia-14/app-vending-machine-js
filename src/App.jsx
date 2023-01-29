import React from 'react';
import Machine from './components/machine/Machine';
import MoneySection from './components/moneySection/MoneySection';
import MoneySurrender from './components/surrenderSection/SurrenderSection';
import Cash from './components/cash/Cash';
import style from './App.module.css';

export const AppContext = React.createContext({}) // контекст

function App() {
  const [render, setRender] = React.useState(0);  // state для обновления рендера
  const [balance, setBalance] = React.useState(0);  // state для суммы внесенных денег
  const [surrender, setSurrender] = React.useState(0) // state для суммы сдачи 
  const [message, setMessage] = React.useState('Внесите деньги') // сообщение на экране 

  /**
   * Информация о продуктах
   * num - номер кнопки на автомате
   * quantity - число товаров в автомате
   * title - название товара
   * imgSrc - адрес изображения
   */
  const initProducts = [ // информация о продуктах
    { num: 0, quantity: 5, surrender: 0, price: 100, title: 'Coca-cola', imgSrc: './img/cola.png' },
    { num: 1, quantity: 5, surrender: 0, price: 100, title: 'Fanta', imgSrc: './img/fanta.png' },
    { num: 2, quantity: 5, surrender: 0, price: 100, title: 'Sprite', imgSrc: './img/sprite.png' },
    { num: 3, quantity: 5, surrender: 0, price: 150, title: 'Чипсы бол.', imgSrc: './img/chips.png' },
    { num: 4, quantity: 5, surrender: 0, price: 100, title: 'Чипсы мал.', imgSrc: './img/chips-mini.png' },
    { num: 5, quantity: 5, surrender: 0, price: 50, title: 'Шоколадка Choco', imgSrc: './img/choc-choco.png' },
    { num: 6, quantity: 5, surrender: 0, price: 100, title: 'Шоколадка Yummy', imgSrc: './img/choc-yummy.png' },
    { num: 7, quantity: 5, surrender: 0, price: 300, title: 'Шоколадка Milka', imgSrc: './img/big-choc.png' }
  ]
  const [products, setProducts] = React.useState(initProducts)

  /**
   * Информация о банкнотах и монетах
   * cost - стоимость банкноты/монеты
   * cash - количество в автомате
   * surrender - количество в сдаче
   * imgSrc - адрес изображения
   */
  const initBanknotes = [ // информация о банкнотах
    { id: 0, cost: 50, cash: 6, surrender: 0, imgSrc: './img/50rub.jpg' },
    { id: 1, cost: 100, cash: 5, surrender: 0, imgSrc: './img/100rub.jpg' },
    { id: 2, cost: 500, cash: 10, surrender: 0, imgSrc: './img/500rub.jpg' },
    { id: 3, cost: 1000, cash: 0, surrender: 0, imgSrc: './img/1000rub.jpg' },
  ]
  const [banknotes, setBanknotes]  = React.useState(initBanknotes)
  const initCoins = [ // информация о монетах
    { id: 0, cost: 1, cash: 50, surrender: 0, imgSrc: './img/1rub.jpg' },
    { id: 1, cost: 2, cash: 25, surrender: 0, imgSrc: './img/2rub.jpg' },
    { id: 2, cost: 5, cash: 10, surrender: 0, imgSrc: './img/5rub.jpg' },
    { id: 3, cost: 10, cash: 5, surrender: 0, imgSrc: './img/10rub.jpg' },
  ]
  const [coins, setCoins] = React.useState(initCoins)

  /** ********************************************************
  * @brief  Обнуление сдачи.
  * @param  Нет.
  */
  const resetSurrender = () => {
    banknotes.map(el => el.surrender = 0)
    coins.map(el => el.surrender = 0)
    products.map(el => el.surrender = 0)
  }

  // обновление рендера
  const updateRender = () => {
    setRender(render + 1)
  }

  React.useEffect(() => { }, [render])

  return (
    <AppContext.Provider value={{
      initProducts, products, setProducts,
      initBanknotes, banknotes, setBanknotes,
      initCoins, coins, setCoins,
      updateRender,
      balance, setBalance,
      message, setMessage,
      surrender, setSurrender,
      resetSurrender,
    }}>
      <div className={style['main-container']}>
        <Machine />
        <MoneySection />
        <MoneySurrender />
        <Cash />
      </div>
    </AppContext.Provider>
  );
}

export default App;
