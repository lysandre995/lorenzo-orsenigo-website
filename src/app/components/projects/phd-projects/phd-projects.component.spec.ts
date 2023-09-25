import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhdProjectsComponent } from './phd-projects.component';

describe('PhdProjectsComponent', () => {
  let component: PhdProjectsComponent;
  let fixture: ComponentFixture<PhdProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhdProjectsComponent]
    });
    fixture = TestBed.createComponent(PhdProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
