import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BioService {
  private _bio: any;

  constructor(private httpClient: HttpClient) { }

  public getBio() {
    this.httpClient.get('')
  }
}
