import React , { useState , useEffect ,useMemo } from 'react';
import axios from 'axios';

const Todo = props => {
    const [ userInput, setUserInput] =  useState('');
    const [ todoList, setTodoList ] = useState([]); //e de recomandat sa ai state separate

    useEffect( ()=>{
            axios.get('https://react-hooks-e3510.firebaseio.com/todos.json')
            .then(result =>{
                const todoData = result.data;
                const todos = [];
                for(let key in todoData){
                    todos.push({
                        id:key,
                        name:todoData[key].name
                       })}
                
                setTodoList(todos);   
               
            }).catch(error =>{
                console.log(error);
            });
             return ()=>{
               console.log('CleanUp');
                
             }
    }, []); 
    const mouseMoveHandler = event =>{
        console.log(event.clientX, event.clientY);
    }
    // useEffect(()=>{
    //     document.addEventListener('mousemove',mouseMoveHandler);
    //     return ()=>{
    //         document.removeEventListener('mousemove',mouseMoveHandler);
    //     };
    // },[]);

    const inputChangeHandler = (event) =>{
       
        setUserInput(event.target.value);
    };

    const todoAddHandler = () =>{
        axios.post('https://react-hooks-e3510.firebaseio.com/todos.json',{name:userInput})
            .then(res =>{
                const dataItem ={
                    id:res.data.name,
                    name:userInput,
                }
               setTodoList(todoList.concat(dataItem))
              
            }).catch(error =>{
                console.log(error);
            })
    };
 
    const todoLists = todoList
                        .map( (todo , index) => {          
                                return (  
                                <li key={todo.id} style={{display:'flex'}}>
                                    {todo.name}
                                </li>  
                             )})

    return ( 
     <React.Fragment>
        <input 
            type="text" 
            placeholder="Todo" 
            onChange={inputChangeHandler} 
            value={(todoList.name ) !== userInput  ? userInput : ' '} 
        />
        <button 
            type="button" 
            onClick={todoAddHandler}> Add
        </button>
        
        <ul >  
            {todoLists}
        </ul>
    </React.Fragment>   
    );

};

export default Todo;