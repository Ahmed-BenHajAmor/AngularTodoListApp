import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Todo {
  id: string,
  text: string,
  time: string,
  date : string,
  done: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todosList : Todo[] = [];
  private todosKey = 'todos';
  constructor() {
    this.loadTodos()
  }

  private saveTodos(): void {
    localStorage.setItem(this.todosKey, JSON.stringify(this.todosList));
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem(this.todosKey);
    if (storedTodos) {
      this.todosList = JSON.parse(storedTodos).map((todo: any) => ({
        ...todo,
        creationDate: new Date(todo.creationDate),
      }));
    }
  }

  addTodo(todo: Todo) : void{
    if(todo.text.length > 1 && todo.time)
      this.todosList.push(todo);
      this.todosList.sort((a, b)=> new Date(`${a.date} ${a.time}`) > new Date(`${b.date} ${b.time}`) ? 1 : -1)
      this.saveTodos()
  }

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

  changeDoneStatus(todoID: string): void{
    const todoIndex = this.findTodoIndex(todoID);
    if(todoIndex !== -1){
      this.todosList[todoIndex].done = !this.todosList[todoIndex].done;
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
