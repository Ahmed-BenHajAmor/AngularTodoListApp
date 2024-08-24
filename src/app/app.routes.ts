import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
    // Redirect the empty path to '/tasks' as the default route
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    
    // Route for displaying uncompleted tasks
    { path: 'tasks', component: TasksComponent },
    
    // Route for displaying completed tasks
    /* The same component is used for both routes because the component 
    automatically detects the current route and displays the corresponding task list.*/
    { path: 'done', component: TasksComponent } 
];
