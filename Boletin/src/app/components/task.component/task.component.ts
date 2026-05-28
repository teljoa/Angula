import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaz/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task;

  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<void>();

  onDelete(){
    this.deleteTask.emit(this.task.id);
  }

  onToggle(){
    this.toggle.emit();
  }
}