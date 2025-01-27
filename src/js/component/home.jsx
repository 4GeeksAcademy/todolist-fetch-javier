import React, { useState, useEffect } from "react";



//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [loading, setLoading] = useState("true");
	const [todos, setTodos] = useState([]);


	const loadTodos = async () => {
		try{
			setLoading(true);
			const response = await fetch("https://playground.4geeks.com/todo/users/javier")
			console.log(response);
			if(!response.ok) createUser();
			const fetchData = await response.json();
			console.log(fetchData);
			setTasks(fetchData.todos);
			setLoading(false);
		} catch(error){
			console.log("Algo fue mal " + error);
		}
	}
	const createUser = async () => {
		try{
			const response = await fetch("https://playground.4geeks.com/todo/users/javier", {
				method: "POST"
			})
			console.log(response);
		} catch (error){
			console.log("Algo fue mal "+ error);
		}
	}

	const addTodo = async (todo) => {
		try{
			const newTodo = {
				label: todo,
				done: false,
			}

			const response = await fetch("https://playground.4geeks.com/todo/users/javier", {
				method: "POST",
				body: JSON.stringify(newTodo),
				headers: {
					"Content-Type": "application/json"
				}
			})
			console.log(response);
			if(!response.ok) throw new Error("HTTP error "+ response.statusText);

			loadTodos();
		} catch(error){
			console.log(error);
		}
	}

	const removeTodo = async (todoId) => {
		try{
			const response = await fetch("https://playground.4geeks.com/todo/todos/${todoId}", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			})

			if(!response.ok) throw new Error("HTTP error "+ response.statusText)
		} catch (error){
	console.log(error);
	}
	}

	useEffect(() => {
		loadTodos();
	}, [])

	return (
		<div classname="container">
			<h1>Todos</h1>
			<ul>
				<li><input 
				        type="text"
				        onChange={(e) => setInputValue(e.target.value)} 
						value={inputValue} 
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
							  setTodos([...todos, inputValue]);
							  setInputValue("");
							}}}
						placeholder="What needs to be done?">
					</input>
				</li>
				{todos.map((tarea, index) => (
					<li key={index} >
						{/*Filtro de todos los index menos el que se hace click */}
						{tarea} <button onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex ))}>Eliminar</button>
					</li>
				))}

			</ul>
			<div>{todos.length} item left</div>
		</div>
	);
};

export default Home;
