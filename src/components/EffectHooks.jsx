import React from 'react'
import BasicButton from '../components/BasicButton';

/*
clean up function in effect hook (useLayoutEffect, useEffect)
- not run in component first-render
- will run trước thằng effect khi component re-render
- will run after component unmount

*/

// memory A
function randomCount() {
  console.log('randomCount')
  return 10;
}



function EffectHooks() {
  const [count, setCount] = React.useState(randomCount); //  React.useState(10);
  const [todos, setTodos] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);


  // fetch todo
  React.useEffect(() => {
    async function fetchTodo() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`);
      const data = await res.json();
      setTodos(data);
    }
    fetchTodo();
  }, [page, limit])

  function handleNextPage() {
    setPage(prevState => prevState + 1)
  }

  function handPrevPage() {
    setPage(prevState => prevState - 1)
  }

  function increment() {
    setCount((prevState) => prevState + 1); // syntax: arrow function
  }

  console.log('----------------------------: ')
  console.log('EffectHook: ', {
    todos, page
  })


  return (
    <div>
      <h1>EffectHook</h1>
      Count: {count}
      <br />
      <BasicButton 
        text="Update increment"
        onClick={increment}
      />

      <h4>Todo with useEffect:</h4>
      <div>
        {/* {todos.map(todo => {
          return (
            <div>
              Id: xxx <br />
              Title: xxx <br />
            </div>
          )
        })} */}
        {/* { {todos.map(todo => (
          <div key={todo.id}>
            Id: {todo.id} <br />
            Title: {todo.title} <br />
          </div>
        ))} } */}
        <br />
        Page: {page} { ' ' }
        <BasicButton 
          text="Previous"
          onClick={handPrevPage}
        />
        <BasicButton 
          text="Next"
          onClick={handleNextPage}
        />  <br />
        Limit: {limit}
        <BasicButton 
          text="Update limit 10"
          onClick={() => setLimit(10)}
        /> 

        
      </div>
    </div>
  )
}

export default EffectHooks