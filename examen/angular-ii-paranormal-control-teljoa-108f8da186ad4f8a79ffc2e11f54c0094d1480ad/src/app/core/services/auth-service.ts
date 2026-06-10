import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Agent } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: Implementar servicio de autenticación con métodos para login, logout y verificación de estado de autenticación

  private http=inject(HttpClient);

   currentUser=signal<any |null>(null);

  private apiURL='http://localhost:4000'

  login(email:string,password:string){
    return this.http.post<any>(`${this.apiURL}/auth/login`,{email,password}).pipe(
      tap(resp=>{
        const token =resp.data.token;
        const user =this.decodeToken(token);

        this.currentUser.set(user);
        this.saveUser(user);
        this.saveToken(token);
      })
    );
  }

  register(data: any){
    return this.http.post(`${this.apiURL}/auth/register`, data);
  }

  saveToken(token:string){
    localStorage.setItem('token',token);
  }

  saveUser(user:Agent){
    localStorage.setItem('user',JSON.stringify(user))
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUser(){
    const user= localStorage.getItem('user')
    return  user ? JSON.parse(user):null;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  isAuthentication(){
    return !!this.getToken();
  }

  decodeToken(token:string){
    const payload =token.split('.')[1];
    return JSON.parse(atob(payload));
  }
  
  constructor(){
    const user =this.getUser();
    if(user){
      this.currentUser.set(user);
    }
  }
}