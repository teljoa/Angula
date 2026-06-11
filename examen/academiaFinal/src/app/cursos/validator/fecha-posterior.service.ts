import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export function FechaPosterior(control:AbstractControl): ValidationErrors | null{

  if(!control.value){
    return null;
  }

  const hoy=new Date()
  const fecha=new Date(control.value)

  return hoy>=fecha ? {fechaInicio:true}:null;

}
