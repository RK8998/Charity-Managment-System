import AdminLogin from './Admin/AdminLogin';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Admin/Navbar';
import Home from './Admin/Home';
import Donation from './Admin/Donation';
import DonationView from './Admin/DonationView';
import Doner from './Admin/Doner';
import DonerView from './Admin/DonerView';
import Payment from './Admin/Payment';
import AddPayment from './Admin/AddPayment';
import PaymentView from './Admin/PaymentView';
import Category from './Admin/Category';
import AddCategory from './Admin/AddCategory';
import AdminProfile from './Admin/AdminProfile';
import DonerDonation from './Admin/DonerDonation';


// User Route
import UserNav from './User/UserNavbar';
import UserHome from './User/UserHome';
import UserLogin from './User/UserLogin';
import UserRegistration from './User/UserRegistration';
import UserDonate from './User/UserDonate';
import UHome from './User/UHome';
import UserProfile from './User/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route excat path='/admin' element={<AdminLogin/>}/>
        
        <Route excat path='/adminNav' element={<Navbar/>}>
          <Route index element={<Home/>}/> 
          <Route excat path="AdminProfile/" element={<AdminProfile/>} />
          <Route excat path='Doner' element={<Doner/>}/>
          <Route excat path="Doner/DonerDonation/:email" element={<DonerDonation/>} />
          <Route excat path='Donation' element={<Donation/>}/> 
          <Route excat path='Donation/view/:id' element={ <DonationView/>} />  
          <Route excat path='Payment' element={<Payment/>} />
          <Route excat path='Doner/view/:id' element={ <DonerView/>} />
          <Route excat path='Payment/add_Payment_Method' element={ <AddPayment/>} />
          <Route excat path='Payment/view/:id' element={ <PaymentView/>} />
          <Route excat path='Category' element={<Category/>} />
          <Route excat path='Category/add_Category' element={<AddCategory/>} />
        </Route>  
        
        {/* User Route */}
         
        <Route excat path='/' element={<UserHome/>}>
          
        </Route>
        <Route excat path='/Login' element={<UserLogin/>} />
        <Route excat path='/Registration' element={<UserRegistration/>} />
        
        <Route excat path='/userNav' element={<UserNav/>}>
          <Route index element={<UHome/>}/> 
          <Route excat path='userDonate' element={<UserDonate/>}/>
          <Route excat path='userProfile' element={<UserProfile/>}/>
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
