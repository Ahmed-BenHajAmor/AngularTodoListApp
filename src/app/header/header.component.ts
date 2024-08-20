import { Component } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { FormsModule } from '@angular/forms';
import { v4  } from 'uuid';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  todoText : string = "";
  todoTime : string = "";
  todoDate : string = "";
  showError : boolean = false;

  constructor(private todosService : TodosService) {}

  addTodo(){    
    if(this.todoText.length !== 0 && this.todoTime && this.todoDate){

      this.todosService.addTodo({
        id: v4(),
        text: this.todoText,
        time: this.todoTime,
        date: this.todoDate,
        done: false
        
      })
      this.todoText = "";
      this.showError = false;
      this.todoTime = "";
      this.todoDate = "";

    }else{
      this.showError = true;
    }
    
  }

  clearTodos(){
    
   
    this.todosService.clearTodos()
    
  }
}
