import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { LinksComponent } from './links/links.component';

// this is a todo-list management app 
// it is composed mainly of 4 parts (components): 
//                              1. div that contains a header text
//                              2. Header that contains: input field to add a new task (a task has a deadline date/time)
//                                                    -> button (clear all) to delete all tasks (todos)
//                              3. Links: two links that navigate between the /tasks route and /done route
//                              4. tasks list: this is where we will find all uncompleted tasks if we are visiting the /tasks route and 
//                                           the done tasks if we are visiting /done route

// you will find more detailed explaination in each component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TasksComponent, LinksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
