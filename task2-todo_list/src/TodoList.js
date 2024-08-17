import React, { useEffect, useState } from 'react'

export default function TodoList() {

    const [isEditing, setIsEditing] = useState(false);
    // object state to set so we know which todo item we are editing
    const [currentTodo, setCurrentTodo] = useState({});

    function getStoredTodos() {
        let data = localStorage.getItem("todos")
        let json = JSON.parse(data);

        if (json) {
            return json
        }
        return [];
    }

    const [todos, setTodos] = useState(getStoredTodos())

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    function handleSubmit(event) {
        event.preventDefault();
        let task = event.target.task.value;
        if (!task) {
            alert("Please provide a valid task");
            return
        }

        setTodos([...todos, { task: task, completed: false }])
        event.target.reset();
    }

    function changeTaskStatus(index) {
        let newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    function deleteTask(index) {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    function handleEditInputChange(e) {
        // alert("Edit")
        setCurrentTodo({ ...currentTodo, task: e.target.value });
        console.log(currentTodo);
    }

    function handleEditing(todo) {
        setIsEditing(true);
        setCurrentTodo({ ...todos });
    }

    function handleUpdateTodo(id, updatedTodo) {
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setIsEditing(false);
        setTodos(updatedItem);
    }

    function handleEditFormSubmit(e) {
        e.preventDefault();
        handleUpdateTodo(currentTodo.id, currentTodo);
        e.target.reset();
    }

    return (
        <div className='container my-5'>
            <div className="mx-auto rounded-border p-4" style={{ width: "700px", backgroundColor: "#0a554e" }}>
                <h2 className="text-white text-center mb-5">Todo List</h2>




                {isEditing ? (
                    <form className="d-flex my-4" onSubmit={handleEditFormSubmit}>
                        <input className='form-control me-2' name="task" placeholder="Edit todo" 
                            value={currentTodo.text} onChange={handleEditInputChange} />
                        <button className="btn btn-outline-light mx-2" type="submit">Update</button>
                        <button className="btn btn-outline-light" onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                ) : (<form className="d-flex" onSubmit={handleSubmit}>
                    <input className="form-control me-2" placeholder="New Task" name='task' />
                    <button className="btn btn-outline-light" type="submit">Add</button>
                </form>
                )}




                {
                    todos.map((todo, index) => {
                        return (
                            <div key={index} className="rounded mt-4 p-2 d-flex" style={{ backgroundColor: todo.completed ? "#87FC68" : "lightgray" }}>
                                <div className="me-auto">
                                    {todo.task}
                                </div>
                                <div>
                                    <i className={"h5 me-2 " + (todo.completed ? "bi bi-check-square" : "bi bi-square")} style={{ cursor: "pointer" }} onClick={() => changeTaskStatus(index)}></i>

                                    <i class={"h5 me-2 bi bi-pencil-square"} style={{ cursor: "pointer" }} onClick={() => handleEditing(todo)}></i>

                                    <i className="bi bi-trash text-danger" style={{ cursor: "pointer" }} onClick={() => deleteTask(index)}></i>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
