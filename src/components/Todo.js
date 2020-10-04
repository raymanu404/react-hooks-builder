import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import { useFormInput } from '../hooks/useFormInput';
import List from './List';

const Todo = props => {
    const [userInput, setUserInput] = useState('');//e de recomandat sa ai state-uri separate

    const todoInputRef = useRef(null);
    const todoInput = useFormInput();

    const todoListReducer = (state, action) => {
        switch (action.type) {
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
    const [todoList, dispatch] = useReducer(todoListReducer, []);

    useEffect(() => {
        axios.get('https://react-hooks-e3510.firebaseio.com/todos.json')
            .then(result => {
                const todoData = result.data;
                const todos = [];
                for (let key in todoData) {
                    todos.push({
                        id: key,
                        name: todoData[key].name
                    })
                }
                if (todoInput.validity === false){
                    dispatch({ type: 'SET', payload: todos });
                    
                }
                
            }).catch(error => {
                console.log(error);
            });
        return () => {
            console.log('CleanUp');
        }
    }, []);
    // const mouseMoveHandler = event => {
    //     console.log(event.clientX, event.clientY);
    // }
    // useEffect(()=>{
    //     document.addEventListener('mousemove',mouseMoveHandler);
    //     return ()=>{
    //         document.removeEventListener('mousemove',mouseMoveHandler);
    //     };
    // },[]);

    // const userInput = todoInputRef.current.value;

    const todoAddHandler = () => {
        axios.post('https://react-hooks-e3510.firebaseio.com/todos.json', { name: todoInput.value })
            .then(res => {
                const dataItem = {
                    id: res.data.name,
                    name: todoInput.value,
                }
                if (todoInput.validity) {
                    dispatch({ type: 'ADD', payload: dataItem });
                }

            }).catch(error => {
                console.log(error);
            });
     
        
    };
    const todoRemoveHandler = (id) => {
        axios.delete(`https://react-hooks-e3510.firebaseio.com/todos/${id}.json`)
            .then(response => {
                dispatch({ type: 'REMOVE', payload: id });
            })
            .catch(error => console.log(error));
    }

    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="Todo"
                // ref={todoInputRef}
                style={{ backgroundColor: todoInput.validity === true ? 'transparent' : '#fc5c65' }}
                onChange={todoInput.onChange}
                value={todoInput.value}
            />
            <button
                type="button"
                onClick={todoAddHandler}> Add
        </button>
            {useMemo(() =>
                <ul>
                    <List
                        items={todoList}
                        onClick={todoRemoveHandler} />
                </ul>, [todoList])
            }
        </React.Fragment>
    );

};

export default Todo;