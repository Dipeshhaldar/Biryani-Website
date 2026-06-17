import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Cart } from './components/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { AdminDashboard } from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <footer className="bg-surface2 text-white py-6 mt-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p>&copy; 2026 Kilo Biryani. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

