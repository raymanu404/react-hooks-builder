import React from 'react';

const list = (props) =>{
    console.log("Rendering the list... ");

    return (
     props.items.map( item => {
         return(                     
            <li 
                key={item.id} 
                onClick={()=>props.onClick(item.id)}
                style={{display:'flex',cursor:'pointer'}}>
                {item.name}
            </li>  
    )}))
};

export default list;