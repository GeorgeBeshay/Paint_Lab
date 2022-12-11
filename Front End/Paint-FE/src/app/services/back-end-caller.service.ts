import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackEndCallerService {
  private port = 8081;
  private url = `http://localhost:${this.port}/callBackEndServer/shapeCreation/`;
  constructor(private http: HttpClient) {}

  async requestShapeFromBE(shapeName: string) {
    return await firstValueFrom(this.http.post(this.url + shapeName, null));
  }

  async sendStage(board: any){
    console.log("In save in backEndCaller");
    let dataToBeReturned = await firstValueFrom(this.http.post(`http://localhost:${this.port}/callBackEndServer/save/` , board));
    console.log("After request");
    console.log(dataToBeReturned);
    return dataToBeReturned;
  }

  async getStage(){
    let dataToBeReturned = await firstValueFrom(this.http.post(`http://localhost:${this.port}/callBackEndServer/load/`,null));
    console.log(dataToBeReturned);
    return dataToBeReturned;
  }
}
