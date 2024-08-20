import { Component } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-done-tasks',
  standalone: true,
  imports: [TasksComponent],
  templateUrl: './done-tasks.component.html',
  styleUrl: './done-tasks.component.css'
})
export class DoneTasksComponent {

}
