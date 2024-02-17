import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecosFormComponent } from './enderecos-form.component';

describe('EnderecosFormComponent', () => {
  let component: EnderecosFormComponent;
  let fixture: ComponentFixture<EnderecosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnderecosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnderecosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
