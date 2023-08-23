import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EegElectrodesComponent } from './eeg-electrodes.component';

describe('EegElectrodesComponent', () => {
  let component: EegElectrodesComponent;
  let fixture: ComponentFixture<EegElectrodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EegElectrodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EegElectrodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
