import React, { useState , useEffect } from 'react';

import Todo from './components/Todo';
import Auth from './components/Auth';
import Header from './components/Header';
import AuthContext from './auth-context';

const App = ( props ) => {
  const [page,setPage] = useState('auth');
  const [authStatus,setAuthStatus] = useState(false);


  const switchPage = (pageName) =>{
    setPage(pageName);
  };

  const login = () =>{
    setAuthStatus(true);
  }


  return (  
    <AuthContext.Provider value={{status:authStatus, login:login}}>
      <Header 
        onLoadTodos={()=>switchPage('todos')} 
        onLoadAuth={()=>switchPage('auth')}/>
      <hr />
      {page === 'auth' ? <Auth /> : 
       page === 'todos'? <Todo /> :null}
      
    </AuthContext.Provider>
  );
}

export default App;
