import './App.css';
import Entry from "./entry";
import Header from "./Header";
import {Route, Routes} from "react-router-dom";
import Layout from './Layout';
import HomePage from './pages/HomePage';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={

          <HomePage/>

        } />
        <Route path={'/login'} element={
          

          <div>Login Page</div>
    
        } />


      </Route>
    </Routes>
  );
}

export default App;
