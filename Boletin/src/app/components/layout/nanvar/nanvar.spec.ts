import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nanvar } from './nanvar';

describe('Nanvar', () => {
  let component: Nanvar;
  let fixture: ComponentFixture<Nanvar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nanvar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nanvar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
