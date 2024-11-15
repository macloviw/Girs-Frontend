import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcaldiaFormComponent } from './alcaldia-form.component';

describe('AlcaldiaFormComponent', () => {
  let component: AlcaldiaFormComponent;
  let fixture: ComponentFixture<AlcaldiaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlcaldiaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlcaldiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
