import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Users } from './Users';
import { DeleteUser } from './DeleteUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path='/delete' element={<DeleteUser/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
