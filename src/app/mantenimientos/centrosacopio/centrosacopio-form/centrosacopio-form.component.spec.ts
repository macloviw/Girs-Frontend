import { ComponentFixture, TestBed } from '@angular/core/testing';

import { centrosacopioFormComponent } from './centrosacopio-form.component';

describe('centrosacopioFormComponent', () => {
  let component: centrosacopioFormComponent;
  let fixture: ComponentFixture<centrosacopioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [centrosacopioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(centrosacopioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
