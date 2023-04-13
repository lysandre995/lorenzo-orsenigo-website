import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class BioService {
  constructor() { }

  public async getBio() {
    return (await axios.get('https://raw.githubusercontent.com/lorenzoorsenigo/lorenzo-orsenigo-website-data/main/bio.json')).data;
  }
}
