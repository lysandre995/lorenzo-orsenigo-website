import { Component, OnInit } from '@angular/core';
import { BioService } from "../../services/bio.service";

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {
  public title = '';
  public descriptionChunks: string[] = [];
  // public imageUrl = '';

  constructor(private readonly bioService: BioService) {
  }

  async ngOnInit() {
    const bio = (await this.bioService.getBio());
    this.title = bio.title;
    this.descriptionChunks = this.getChunks(bio.text);
    // this.imageUrl = bio.picture;
  }

  private getChunks(text: string) {
    const chunks: string[] = [];
    let s = '';
    for (const char of text) {
      if (char === '\n') {
        chunks.push(s);
        s = '';
      } else {
        s = s + char;
      }
    }
    return chunks;
  }
}
