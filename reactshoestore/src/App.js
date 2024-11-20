
import './App.css';
import Dashboard from './components/Dashboard';
import StartSell from './components/StartSell';
import Layout from './pages/Layout';
import Login from './pages/Login'
import SellDetails from './components/sellDetails';

import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import OrderDetail from './components/OrderDetail';
import OrderReport from './components/OrderReport';
import AddItem from './components/addItem';
import ItemListing from './components/ItemListing';
import AddType from './components/AddType';
import CategoryReport from './components/CategoryReport';


function App() {
  return (
    <>
     

<Router>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path='/layout' element={<Layout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path='startsell' element={<StartSell/>}/>
      <Route path='addorders' element={<SellDetails/>}/>
      <Route path='Orderdetail' element={<OrderDetail/>}/>
      <Route path='Orderreport' element={<OrderReport/>}/>
      <Route path='additem' element={<AddItem/>}/>
      <Route path='itemlisting' element={<ItemListing/>}/>
      <Route path='addtype' element={<AddType/>}/>
      <Route path='category' element={<CategoryReport/>}/>
      
      
    </Route>
  </Routes>
</Router>
    
    </>   
    
  );
}

export default App;
