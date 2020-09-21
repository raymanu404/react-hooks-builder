import React , { useContext } from 'react';

import AuthContext from '../auth-context';

const Header = props =>{
    const auth  = useContext(AuthContext);

    return (
    <header>
        
        <button onClick={props.onLoadAuth}>Auth</button> | {' '}
        {auth.status ? (
        <button onClick={props.onLoadTodos}>Todo List</button>
        ) : null}
    </header>
    )
};

export default Header;