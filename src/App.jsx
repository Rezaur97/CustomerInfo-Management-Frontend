import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CustomerForm from './components/CustomerForm';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter >
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/create" element={<CustomerForm />} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App