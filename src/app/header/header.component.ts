import { Component } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { FormsModule } from '@angular/forms';
import { v4  } from 'uuid';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  todoText : string = "";
  todoTime : string = "";

  constructor(private todosService : TodosService) {}

  addTodo(){    
    if(this.todoTime){

      this.todosService.addTodo({
        id: v4(),
        text: this.todoText,
        time: this.todoTime,
        done: false
        
      })
      this.todoText = "";
    }
    
  }

  clearTodos(){
    
   
    this.todosService.clearTodos()
    
  }
}
