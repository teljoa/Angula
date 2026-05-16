import { Component } from '@angular/core';
import { TaskMantein} from '../interfaz/task-mantein';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  tasks: TaskMantein[]=[
    {
      id:Date.now()+Math.random(),
      descripcion: "tarea 1",
      urgente: true,
      completada: true
    },
    {
      id:Date.now()+Math.random(),
      descripcion: "tarea 2",
      urgente: false,
      completada: false
    }
  ]

  descripcion: string="";

  addTask(descripcion: string): void{
    const taskNew: TaskMantein=
      {
        id:Date.now(),
        descripcion: descripcion,
        urgente: true,
        completada: false
      }

      this.tasks.push(taskNew);

      this.descripcion="";
  }

  eliminar(id: number): void{
    this.tasks=this.tasks.filter(task=>task.id!==id);
  }
}
