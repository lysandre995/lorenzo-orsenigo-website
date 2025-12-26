import { Injectable } from "@angular/core";
import { BioDto } from "../dtos/bio.dto";
import bioData from "../../assets/data/bio.json";

@Injectable({
    providedIn: "root"
})
export class BioService {
    constructor() {}

    public async getBio(): Promise<BioDto> {
        return bioData as BioDto;
    }
}
