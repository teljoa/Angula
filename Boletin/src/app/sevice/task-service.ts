import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../interface/itask';


@Injectable({
  providedIn: 'root',
})
export class TaskService {

    private http = inject(HttpClient)

    API_URL= 'http://localhost:3000/'

    getTasks(): Observable<ITask[]>{
      return this.http.get<ITask[]>(`${this.API_URL}tasks`);
    }

    getTask(id:number):Observable<ITask>{
      return this.http.get<ITask>(`${this.API_URL}tasks/${id}`);
    }

    AddTask(task: Omit<ITask, "id">):Observable<ITask>{
      return this.http.post<ITask>(
        `${this.API_URL}tasks`,
        task
      );
    }

    deleteTask(id: number):Observable<void>{
      return this.http.delete<void>(
        `${this.API_URL}tasks/${id}`
      )
    }

    editTask(task:ITask):Observable<ITask>{
      return this.http.put<ITask>(
        `${this.API_URL}tasks/${task.id}`,
        task
      );
    }
}