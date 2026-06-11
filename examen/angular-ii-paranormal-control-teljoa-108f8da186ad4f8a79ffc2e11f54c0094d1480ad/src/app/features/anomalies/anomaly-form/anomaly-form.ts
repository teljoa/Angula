import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { BureauService } from '../../../core/services/bureau-service';
import { CustomValidators } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-anomaly-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './anomaly-form.html'
})
export class AnomalyFormComponent implements OnInit{
  // TODO: Formulario reactivo para crear/editar anomalías, con validaciones personalizadas
  // El formulario tendrá campos como:
  // - Subject (requerido y con validador de formato OBJ-XXXX)
  // - Description (requerido, mínimo 500 caracteres)
  // - Danger Level (opciones: Safe (Seguro), Euclid (Impredecible), Keter (Peligroso))
  // - Discovery Date 
  // - Containment Date (debe ser posterior a Discovery Date)
  // - Severity (opciones: Low, Medium, High)
  // - Status (opciones: Contained (Contenido), Breached(Fugado), Unknown (Desconocido))
  private fb = inject(FormBuilder);
  private bureauService = inject(BureauService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  anomalyId = '';

  form = this.fb.nonNullable.group({
    subject:['',[Validators.required, CustomValidators.anomalyIdValidator()]],
    description:['',[Validators.required, Validators.minLength(10)]],
    dangerLevel:['Safe', Validators.required],
    status:['Contained',Validators.required],
    discoveryDate:['',Validators.required],
    containmentDate:['',Validators.required]
  },
  {
    validators:[CustomValidators.dateValidator]
  });

  ngOnInit(){
    this.anomalyId =this.route.snapshot.paramMap.get('id') ?? '';

    if(this.anomalyId){
      this.isEditMode = true;
      this.loadAnomaly();
    }
  }

  loadAnomaly(){
    this.bureauService.getAnomaly(this.anomalyId).subscribe({
      next:(anomaly)=>{
        this.form.patchValue({
          subject: anomaly.subject,
          description: anomaly.description,
          dangerLevel: anomaly.dangerLevel,
          status: anomaly.status,
          discoveryDate: anomaly.discoveryDate,
          containmentDate: anomaly.containmentDate
        });
      }
    });
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    if(this.isEditMode){
      this.bureauService.updateAnomaly(this.anomalyId,this.form.getRawValue()).subscribe({
        next:()=>{
          this.router.navigate(['/anomalies']);
        }
      });
    }
    else{
      this.bureauService.createAnomaly(this.form.getRawValue() as any).subscribe({
        next:()=>{
          this.router.navigate(['/anomalies']);
        }
      });
    }
  }
}