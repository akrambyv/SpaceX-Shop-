import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Main from './components/Main/Main';
import Account from './components/Main/Account';
import FirstMain from './components/Main/FirstMain';
import Collection from './components/Main/Collection';
import Basket from './components/Main/Basket';
import Header from './components/Header/Header';

function App() {
    const [data, setData] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };


    const updateCartItems = (items) => {
        setCartItems(items);
    };

    useEffect(() => {
        fetch("../data/data.json")
            .then(res => res.json())
            .then(item => setData(item.shop));
    }, []);

    return (
        <>
            <Header cartItems={cartItems} />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<FirstMain data={data} addToCart={addToCart} />} />
                    <Route path='/collections' element={<Collection data={data} addToCart={addToCart} />} />
                    <Route path='/:category/:sub' element={<Main data={data} addToCart={addToCart} />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/cart' element={<Basket items={cartItems} setItems={updateCartItems} />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
