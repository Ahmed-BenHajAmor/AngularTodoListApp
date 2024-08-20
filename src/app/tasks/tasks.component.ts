import { Component } from '@angular/core';
import { TodosService, Todo } from '../services/todos.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LinksComponent } from '../links/links.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, MatTooltipModule, LinksComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  todosList! : Todo[]
  warningMsg : string = "Warning: The task deadline exceeded "
  constructor(private todosService : TodosService, private router: Router) {}

  getRouter(){
    return this.router
  }

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

  checkTaskInPast(todo : Todo){
    return new Date(`${todo.date} ${todo.time}`) < new Date()
  }
}

