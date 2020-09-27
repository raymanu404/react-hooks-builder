import React , { useState , useEffect ,useReducer} from 'react';
import axios from 'axios';

const Todo = props => {
    const [ userInput, setUserInput] =  useState('');//e de recomandat sa ai state-uri separate
    const [clicked, setClicked ] = useState(false);

    const todoListReducer = (state , action )=>{
        switch(action.type){
            case 'ADD':
                return state.concat(action.payload);
            case 'REMOVE':
                return state.filter(key => key.id !== action.payload);
            case 'SET':
                return action.payload;               
            default:
                return state;
        }
    };
    const [todoList , dispatch ] = useReducer(todoListReducer,[]);

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
                
                dispatch({type:'SET',payload:todos});   
               
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
       
        setClicked(false);
        setUserInput(event.target.value);
    };

    const todoAddHandler = () =>{
        axios.post('https://react-hooks-e3510.firebaseio.com/todos.json',{name:userInput})
            .then(res =>{
                const dataItem ={
                    id:res.data.name,
                    name:userInput,
                }
               dispatch({type:'ADD',payload:dataItem});
              
              
            }).catch(error =>{
                console.log(error);
            });
            setClicked(true);   
    };
    const todoRemoveHandler = (id) =>{
        axios.delete(`https://react-hooks-e3510.firebaseio.com/todos/${id}.json`)
                .then(response =>{
                    dispatch({type:'REMOVE', payload:id});
                })
                .catch(error =>console.log(error));              
    }
    const todoLists = todoList.map( (todo , index) => {          
                                return (  
                                <li 
                                    key={todo.id} 
                                    onClick={()=>todoRemoveHandler(todo.id)}
                                    style={{display:'flex',cursor:'pointer'}}>
                                    {todo.name}
                                </li>  
                             )})

    return ( 
     <React.Fragment>
        <input 
            type="text" 
            placeholder="Todo" 
            onChange={inputChangeHandler} 
            value={!clicked ? userInput : ' '} 
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