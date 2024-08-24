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
  // Variables for binding form inputs
  todoText : string = "";
  todoTime : string = "";
  todoDate : string = "";
  showError : boolean = false;

  constructor(private todosService : TodosService) {}

  addTodo(){   
    // Validate that all fields are filled out 
    if(this.todoText.length !== 0 && this.todoTime && this.todoDate){
      // Add the new todo item via TodosService
      this.todosService.addTodo({
        id: v4(),
        text: this.todoText,
        time: this.todoTime,
        date: this.todoDate,
        done: {
          status: false,
          date: ""
        }
        
      })
      // Clear input fields and error message after adding the todo
      this.todoText = "";
      this.showError = false;
      this.todoTime = "";
      this.todoDate = "";

    }else{
      // Show error message if any required field is missing
      this.showError = true;
    }
    
  }

  // Method to clear all todos
  clearTodos(){
    this.todosService.clearTodos()
  }
}
