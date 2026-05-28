import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list.component/task-list.component';
import { TaskDetailsComponent } from './components/task-details.component/task-details.component';
import { AddTaskComponent } from './components/add-task.component/add-task.component';
import { EditAskComponent } from './components/edit-ask.component/edit-ask.component';
import { NotFoundComponent } from './components/not-found.component/not-found.component';


export const routes: Routes = [
    {path:'', redirectTo:'tasks', pathMatch:'full'},
    {path:'tasks', component: TaskListComponent},
    {path:'tasks/:id', component: TaskDetailsComponent},
    {path:'add-task', component: AddTaskComponent},
    {path:'edit-task/:id', component: EditAskComponent},
    {path:'**', component: NotFoundComponent}
];