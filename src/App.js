import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import AddEmployee from './pages/AddEmployee';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/add' element={<AddEmployee />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
