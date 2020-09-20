import React , { useState , useEffect } from 'react';
import axios from 'axios';

const Todo = props => {
    const [ userInput, setUserInput] =  useState('');
    const [ todoList, setTodoList ] = useState([]); //cica e de recomandat sa ai state separate

    // const [todoState ,setTodoState ] = useState({
    //     userInput:' ',
    //     todoList:[]
    // })

    useEffect( ()=>{
        axios.get('https://react-hooks-e3510.firebaseio.com/todos.json')
             .then(result =>{
                 console.log(result.data);
                const todoData = result.data;
                const todos = [];
                for(const key in todoData){
                    todos.push({
                        id:key,
                        name:todoData[key].name
                    })
                }
                
                setTodoList(todos);   

             }).catch(error =>{
                 console.log(error);
             })
    }, []); //daca e empty array e ComponentDidMount daca e vreun state se rerendeaza la acel state 

    const inputChangeHandler = (event) =>{
        // setTodoState({
        //     userInput:event.target.value,
        //     todoList:todoState.todoList,
        // });
        setUserInput(event.target.value);
    };

    const todoAddHandler = () =>{
        // setTodoState({
        //     userInput: todoState.userInput,
        //     todoList: todoState.todoList.concat(todoState.userInput),
        // });
        setTodoList(todoList.concat(userInput)); //e mai clean asa
        axios.post('https://react-hooks-e3510.firebaseio.com/todos.json',{name:userInput})
            .then(res =>{
                console.log(res);
            }).catch(error =>{
                console.log(error);
            })
    };
    
    
    return ( 
     <React.Fragment>
        <input 
            type="text" 
            placeholder="Todo" 
            onChange={inputChangeHandler} 
            value={todoList[todoList.length -1 ] !== userInput  ? userInput : ' '} 
        />
        
        <button 
            type="button" 
            onClick={todoAddHandler}> Add
        </button>
        <ul >
            
            {todoList.map((todo,id) =>
                 <li key={todo.id}>{todo.name}</li>         
            )}
        </ul>
    </React.Fragment>
    );

};

export default Todo;