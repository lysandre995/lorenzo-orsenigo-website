import {Component, OnInit} from '@angular/core';
import {BioService} from "../../services/bio.service";

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {
  public title = "";
  public text = "";
  public pictureUrl = "";

  constructor(private readonly bioService: BioService) {
  }
  async ngOnInit() {
    const bio = await this.bioService.getBio()
    this.title = bio.title;
    this.text = bio.text;
    this.pictureUrl = bio.picture;
  }
}
