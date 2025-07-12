import { Routes, Route } from 'react-router-dom';
import Header from '@/components/HeaderComponent/Header';
import Footer from '@/components/FooterComponent/Footer';

import Home from '@/pages/Home';
import CreditCard from '@/pages/CreditCard';
import Product from '@/pages/Product';
import Account from '@/pages/Account';
import Resources from '@/pages/Resources';

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <h1 className='visually-hidden'>Get your own bank card</h1>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/credit-card' element={<CreditCard />} />
          <Route path='/product' element={<Product />} />
          <Route path='/account' element={<Account />} />
          <Route path='/resources' element={<Resources />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
