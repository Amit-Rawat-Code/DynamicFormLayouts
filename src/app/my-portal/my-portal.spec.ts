import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPortal } from './my-portal';

describe('MyPortal', () => {
  let component: MyPortal;
  let fixture: ComponentFixture<MyPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyPortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPortal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
