import { Injectable } from '@angular/core';
import axios from "axios";
import {backendRoutes} from "../../assets/backend-routes";
import {BioDto} from "../dtos/bio.dto";

@Injectable({
  providedIn: 'root'
})
export class BioService {

  constructor() { }

  public async getBio(): Promise<BioDto> {
    return (await axios.get(backendRoutes.baseUrl + '/' + backendRoutes.bio)).data
  }
}
