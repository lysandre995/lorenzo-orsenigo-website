import { Component } from '@angular/core';
import { ProjectInterface } from "../interfaces/project.interface";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  private _projects: ProjectInterface[] = [
    { title: 'Rhythmic Fusion',  pageUrl: '/projects/rhythmic-fusion', imgUrl: 'https://picsum.photos/640/360' },
    { title: 'Drum Circle Evolution',  pageUrl: '/projects/drum-circle-evolution', imgUrl: 'https://picsum.photos/641/360' },
    { title: 'Percussive Groove',  pageUrl: '/projects/percussive-groove', imgUrl: 'https://picsum.photos/640/361' },
    { title: 'Beat Tribe',  pageUrl: '/projects/beat-tribe', imgUrl: 'https://picsum.photos/639/360' },
    { title: 'Global Percussion Ensemble',  pageUrl: '/projects/global-percussion-ensemble', imgUrl: 'https://picsum.photos/640/359' },
    { title: 'Afro-Latin Rhythms',  pageUrl: '/projects/afro-latin-rhythms', imgUrl: 'https://picsum.photos/639/359' },
    { title: 'Percussive Journeys',  pageUrl: '/projects/percussive-journeys', imgUrl: 'https://picsum.photos/641/361' },
    { title: 'World Beat Collective',  pageUrl: '/projects/world-beat-collective', imgUrl: 'https://picsum.photos/641/359' },
    { title: 'Sonic Boom Brigade',  pageUrl: '/projects/sonic-boom-brigade', imgUrl: 'https://picsum.photos/639/361' },
    { title: 'The Groove Merchants',  pageUrl : '/projects/the-groove-merchants', imgUrl: 'https://picsum.photos/642/360' }
  ];

  public get projects(): ProjectInterface[] {
    return this._projects;
  }
}
