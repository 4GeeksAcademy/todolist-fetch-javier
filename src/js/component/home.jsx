import React, { useState, useEffect } from "react";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [loading, setLoading] = useState(true);

	const loadTodos = async () => {
		try {
			setLoading(true);
			const response = await fetch("https://playground.4geeks.com/todo/users/javier");
			if (!response.ok) {
				await createUser();
				return;
			}
			const fetchData = await response.json();
			setTasks(fetchData.todos);
			setLoading(false);
		} catch (error) {
			console.log("Algo fue mal " + error);
			setLoading(false);
		}
	};

	const createUser = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/javier", {
				method: "POST"
			});
			if (!response.ok) throw new Error("HTTP error " + response.statusText);
			await loadTodos();
		} catch (error) {
			console.log("Algo fue mal " + error);
		}
	};

	const addTodo = async (todo) => {
		try {
			const newTodo = {
				label: todo,
				done: false,
			};

			const response = await fetch("https://playground.4geeks.com/todo/todos/javier", {
				method: "POST",
				body: JSON.stringify(newTodo),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) throw new Error("HTTP error " + response.statusText);

			await loadTodos();
		} catch (error) {
			console.log(error);
		}
	};

	const removeTodo = async (todoId) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) throw new Error("HTTP error " + response.statusText);
			await loadTodos();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loadTodos();
	}, []);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && inputValue.trim() !== "") {
			addTodo(inputValue);
			setInputValue("");
		}
	};

	return (
		<div className="container">
			<h1>Todos</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={handleKeyDown}
						placeholder="What needs to be done?"
					/>
				</li>
				{loading ? (
					<li>Loading...</li>
				) : (
					tasks.map((task) => (
						<li key={task.id}>
							{task.label} <button onClick={() => removeTodo(task.id)}>Eliminar</button>
						</li>
					))
				)}
			</ul>
			<div>{tasks.length} item left</div>
		</div>
	);
};

export default Home;
