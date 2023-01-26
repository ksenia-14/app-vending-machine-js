import React from 'react';
import Machine from './components/machine/Machine';
import MoneySection from './components/moneySection/MoneySection';
import MoneySurrender from './components/moneySurrender/MoneySurrender';
import Cash from './components/cash/Cash';
import style from './App.module.css';

export const AppContext = React.createContext({}) // контекст

function App() {
  const [render, setRender] = React.useState(0);  // state для обновления рендера

  /**
   * Информация о продуктах
   * num - номер кнопки на автомате
   * quantity - число товаров в автомате
   * title - название товара
   * imgSrc - адрес изображения
   */
  let products = [ // информация о продуктах
    { num: 1, quantity: 10, price: 60, title: 'Coca-cola', imgSrc: './img/cola.png' },
    { num: 2, quantity: 10, price: 60, title: 'Fanta', imgSrc: './img/fanta.png' },
    { num: 3, quantity: 10, price: 60, title: 'Sprite', imgSrc: './img/sprite.png' },
    { num: 4, quantity: 10, price: 100, title: 'Чипсы бол.', imgSrc: './img/chips.png' },
    { num: 5, quantity: 10, price: 70, title: 'Чипсы мал.', imgSrc: './img/chips-mini.png' },
    { num: 6, quantity: 10, price: 50, title: 'Шоколадка Choco', imgSrc: './img/choc-choco.png' },
    { num: 7, quantity: 10, price: 60, title: 'Шоколадка Yummy', imgSrc: './img/choc-yummy.png' },
    { num: 8, quantity: 10, price: 300, title: 'Шоколадка Milka', imgSrc: './img/big-choc.png' }]

  /**
   * Информация о банкнотах и монетах
   * cost - стоимость банкноты/монеты
   * cash - количество в автомате
   * surrender - количество в сдаче
   * imgSrc - адрес изображения
   */
  const banknotes = [ // информация о банкнотах
    { cost: 50, cash: 0, surrender: 0, imgSrc: './img/50rub.jpg' },
    { cost: 100, cash: 10, surrender: 0, imgSrc: './img/100rub.jpg' },
    { cost: 500, cash: 10, surrender: 0, imgSrc: './img/500rub.jpg' },
    { cost: 1000, cash: 10, surrender: 0, imgSrc: './img/1000rub.jpg' },
  ]
  const coins = [ // информация о монетах
    { cost: 1, cash: 50, surrender: 0, imgSrc: './img/1rub.jpg' },
    { cost: 2, cash: 50, surrender: 0, imgSrc: './img/2rub.jpg' },
    { cost: 5, cash: 50, surrender: 0, imgSrc: './img/5rub.jpg' },
    { cost: 10, cash: 50, surrender: 0, imgSrc: './img/10rub.jpg' },
  ]

  // обновление рендера
  const updateRender = () => {
    setRender(render + 1)
  }

  React.useEffect(() => { }, [render])

  return (
    <AppContext.Provider value={{
      products,
      banknotes, coins,
      updateRender,
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
