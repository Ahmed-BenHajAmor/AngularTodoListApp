import { Routes } from '@angular/router';

import { TasksComponent } from "/workspaces/codespaces-blank/todoApp/src/app/tasks/tasks.component";
import { DoneTasksComponent } from "/workspaces/codespaces-blank/todoApp/src/app/done-tasks/done-tasks.component";

export const routes: Routes = [
    { path: 'tasks', component: TasksComponent }, 
    { path: 'done', component: DoneTasksComponent } 
];
