import { Component } from '@angular/core';
import { TodosService, Todo } from '../services/todos.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LinksComponent } from '../links/links.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, MatTooltipModule, LinksComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  //this component display a list of tasks : if we are in the /tasks route it displays the uncompleted tasks 
  // and if we are visiting /done route it displays the done tasks
  todosList! : Todo[]
  warningMsg : string = "Warning: The task deadline exceeded"
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todosService.removeTodo(todoID)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  displayWarning(todo : Todo){
    
    return new Date(`${todo.date} ${todo.time}`) < new Date() && !todo.done.status
  }

  getDateAndTime(date: string){
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(newDate.getDate()).padStart(2, '0');           
    const hours = String(newDate.getHours()).padStart(2, '0');     
    const minutes = String(newDate.getMinutes()).padStart(2, '0'); 
    
    
    return `${year}-${month}-${day}, ${hours}:${minutes}`;
    

    
  }
}

