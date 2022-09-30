import { createContext, useEffect, useState } from "react";


interface TodoContextInterface{
    list:todolist[],
    marked:todolist[],
    todoLength:number,
    markedLength:number,
    add:(todo:todolist)=>void,
    delete:(todo:todolist)=>void,
    deleteMarked:(todo:todolist)=>void,
    move:(todo:todolist)=>void,
    unmove:(todo:todolist)=>void,
}

const TodoContext = createContext<TodoContextInterface | null>(null)

export interface todolist {
    id:string,
    name:string,
    marked:Boolean,
    created:Date
}
export const generateRandomString = (size:number):string=>{
    var output = ""
    var al = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    for(var i =0; i<size;i++){
        output+=al[Math.floor(Math.random()*al.length)]
    }
    return(output)
}

export const TodoContextProvider = (props:any)=>{
    const [todoList, setTodoList] = useState<todolist[]>([])
    const [markedList, setMarkedList] = useState<todolist[]>([])
    const addTodo = (todo:todolist)=>{
        const arr:todolist[] = [...todoList]
        arr.push(todo)
        setTodoList(arr)
    }
    const deleteTodo = (todo:todolist)=>{
        const arr:todolist[] = [...todoList]
        setTodoList(arr.filter((item)=>item.id!=todo.id))
    }
    const deleteMarked = (todo:todolist)=>{
        const arr:todolist[] = [...markedList]
        setMarkedList(arr.filter((item)=>item.id!=todo.id))
    }
    const swapToMarked = (todo:todolist)=>{
        const arr:todolist[] = [...todoList]
        arr.forEach((item:todolist)=>{
            if(item.id == todo.id){
                const mk = [...markedList]
                item.marked = true
                mk.push(item)
                setMarkedList(mk)
            }
        })
        deleteTodo(todo)
    }
    const swapToTodo = (todo:todolist)=>{
        const arr:todolist[] = [...markedList]
        arr.forEach((item:todolist)=>{
            if(item.id == todo.id){
                const mk = [...todoList]
                item.marked = false
                mk.push(item)
                setTodoList(mk)
            }
        })
        deleteMarked(todo)
    }
    const context:TodoContextInterface = {
        list:todoList,
        marked:markedList,
        add:addTodo,
        todoLength:todoList.length,
        markedLength:markedList.length,
        delete:deleteTodo,
        deleteMarked:deleteMarked,
        move:swapToMarked,
        unmove:swapToTodo,
    }
    return(
        <TodoContext.Provider value={context}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoContext