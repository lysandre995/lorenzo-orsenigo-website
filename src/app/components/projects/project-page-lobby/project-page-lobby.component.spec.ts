import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPageLobbyComponent } from './project-page-lobby.component';

describe('ProjectPageLobbyComponent', () => {
  let component: ProjectPageLobbyComponent;
  let fixture: ComponentFixture<ProjectPageLobbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectPageLobbyComponent]
    });
    fixture = TestBed.createComponent(ProjectPageLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
