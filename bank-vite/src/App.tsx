import Header from '@/components/HeaderComponent/Header';
import Home from '@/pages/Home';
import Footer from '@/components/FooterComponent/Footer';

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <h1 className='visually-hidden'>Get your own bank card</h1>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
