import { Component } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { FormsModule } from '@angular/forms';
import { v4  } from 'uuid';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  todoText : string = "";
  todoTime : string = "";
  todoDate : string = "";

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
    }else if(this.todoText.length === 0){
      alert("Empty Todos are not valid !!!")
      
    }else if(!this.todoDate){
      alert("Date is required !!!")
      
    }else{
      alert('Time is required !!!')
    }
    
  }

  clearTodos(){
    
   
    this.todosService.clearTodos()
    
  }
}
