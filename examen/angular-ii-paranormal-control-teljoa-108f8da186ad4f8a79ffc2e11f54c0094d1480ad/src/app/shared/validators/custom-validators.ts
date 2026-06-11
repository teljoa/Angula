import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup} from '@angular/forms';
export class CustomValidators {

  // TODO: 1. Validador de Formato (Sujeto: OBJ-XXXX)
  static anomalyIdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if(!value){
        return null;
      }

      const regex = /^OBJ-\d+$/;

      return regex.test(value)? null: { invalidSubject:true };
    };
  }
  // TODO: 2. Validador Cross-Field (Dos fechas)
  static dateValidator(group: AbstractControl): ValidationErrors | null {
    const discoveryDate =group.get('discoveryDate')?.value;
    const containmentDate =group.get('containmentDate')?.value;

    if(!discoveryDate || !containmentDate){
      return null;
    }

    if(containmentDate < discoveryDate){
      return { invalidDates:true };
    }
    return null;
  }
}