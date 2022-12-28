import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {YogaForm} from './components/YogaForm';
import {Payment} from './components/Payment';
import {CheckPayment} from './components/CheckPayment';
import Main from './components/Main';
import Date from './components/Date';

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      <Routes>
          <Route path='/' exact element={<Main/>}></Route>
          <Route path='/form' exact element={<YogaForm/>}></Route>
          <Route path='/date' exact element={<Date/>}></Route>
          <Route path='/payment' exact element={<Payment/>}></Route>
          <Route path='/checkpayment' exact element={<CheckPayment/>}></Route>

        </Routes>
      
      </Router>
    </div>
  );
}

export default App;
