import { Component, inject } from '@angular/core';
import { Task } from './interfaz/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task.component/task.component';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, TaskComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  private nextId=1

  tasks: Task[]=[
    {id: this.nextId++, title: 'tarea 1', completed: false},
    {id: this.nextId++, title: 'tarea 2', completed: false}
  ]

  title: string="";

  toggleTask(task: Task){
    task.completed = !task.completed
  }

  AddTask(){
    if(!this.title.trim()) return;

    this.tasks.push({
      id:this.nextId++,
      title: this.title,
      completed: false
    });

    this.title="";
  }

  removeTask(id: number){
    this.tasks = this.tasks.filter(task=>task.id !==id);
  }

  private route =inject(ActivatedRoute);

  ngOnInit(){
    const id=this.route.snapshot.paramMap.get('id');
  }
}