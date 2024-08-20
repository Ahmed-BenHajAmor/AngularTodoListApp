import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { DoneTasksComponent } from './done-tasks/done-tasks.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TasksComponent }, 
    { path: 'done', component: DoneTasksComponent } 
];
