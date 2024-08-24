import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Todo {
  id: string,
  text: string,
  time: string,
  date : string,
  done: {
    status: boolean,
    date: string
  },
}

/**
 * Service for managing todo items in the application.
 * 
 * This service handles all operations related to todos, including 
 * adding, removing, and retrieving todo items. It persists 
 * the todo list in the browser's localStorage to maintain state between 
 * sessions. The todos are sorted by their date and time to ensure they 
 * are displayed in chronological order.
 */

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todosList : Todo[] = [];
  private todosKey = 'todos';
  constructor() {
    this.loadTodos()
  }

  private saveTodos(): void { //save todosList in the localStorage
    localStorage.setItem(this.todosKey, JSON.stringify(this.todosList));
  }

  private loadTodos(): void { // Retrieve data from localStorage

    const storedTodos = localStorage.getItem(this.todosKey);
    if (storedTodos) {
      this.todosList = JSON.parse(storedTodos).map((todo: any) => ({
        ...todo,
        creationDate: new Date(todo.creationDate),
      })).sort((a: Todo, b : Todo)=> new Date(`${a.date} ${a.time}`) > new Date(`${b.date} ${b.time}`) ? 1 : -1);
      
    
    }
  }

  // This algorithm ensures that an element is added to the sorted list with O(n) time complexity.
  addTodo(todo : Todo){
    console.log(this.todosList);
    
    const index : number = this.todosList.findIndex(el => new Date(`${el.date} ${el.time}`) > new Date(`${todo.date} ${todo.time}`))
    if(index === -1){
      this.todosList.splice(this.todosList.length, 0, todo);
    }else
      this.todosList.splice(index, 0, todo);
    this.saveTodos()
  }


  // This sorting method is more time-consuming; it has O(n log n) complexity.

  // addTodo(todo: Todo) : void{
  //   if(todo.text.length > 1 && todo.time)
  //     this.todosList.push(todo);
  //     this.todosList.sort((a, b)=> new Date(`${a.date} ${a.time}`) > new Date(`${b.date} ${b.time}`) ? 1 : -1)
  //     this.saveTodos()
  // }

  private findTodoIndex(todoID: string) : number{
    const todoIndex = this.todosList.findIndex(todo => todo.id === todoID);
    return todoIndex

  }

  removeTodo(todoID : string) : void{
    const todoIndex = this.findTodoIndex(todoID);
    if(todoIndex !== -1){
      this.todosList.splice(todoIndex, 1);
    }
    this.saveTodos()


  }

  changeDoneStatus(todoID: string): void{ //done or undone task
    const todoIndex = this.findTodoIndex(todoID);
    if(todoIndex !== -1){
      this.todosList[todoIndex].done.status = !this.todosList[todoIndex].done.status;
      if(this.todosList[todoIndex].done.status)
        this.todosList[todoIndex].done.date = new Date().toString()
    }
    this.saveTodos()
  }

  getTodos(): Observable<Todo[]> {
    return of(this.todosList);
  }

  clearTodos(){
    this.todosList.splice(0, this.todosList.length)
    this.saveTodos()
    
  }
}
