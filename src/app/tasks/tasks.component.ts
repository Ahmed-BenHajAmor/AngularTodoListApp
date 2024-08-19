import { Component } from '@angular/core';
import { TodosService, Todo } from '../services/todos.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  todosList! : Todo[]

  constructor(private todosService : TodosService) {}

  ngOnInit(): void {
    this.todosService.getTodos().subscribe(todos => this.todosList = todos);
  }

  getTimeFromTodo(date : Date) : string{
    
    return date.getHours() + ":" + date.getMinutes()
  }

  changeDoneStatus(todoID : string) : void{
    this.todosService.changeDoneStatus(todoID)
  }

  removeTodo(todoID : string) : void{
    this.todosService.removeTodo(todoID)
  }
}

