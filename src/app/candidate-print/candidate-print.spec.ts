import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePrint } from './candidate-print';

describe('CandidatePrint', () => {
  let component: CandidatePrint;
  let fixture: ComponentFixture<CandidatePrint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatePrint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatePrint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
