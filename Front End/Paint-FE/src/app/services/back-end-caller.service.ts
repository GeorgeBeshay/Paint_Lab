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

  async sendStage(stage: any) {
    console.log('In sendStage in backEndCaller');
    let dataToBeReturned = await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/saveStage/`,
        stage
      )
    );
    console.log('After sendStage request');
  }

  async undo() {
    console.log('In undo request in backEndCaller');
    let dataToBeReturned = await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/undo/`,
        null
      )
    );
    console.log(dataToBeReturned);
    console.log('After undo request');
    return dataToBeReturned;
  }

  async redo() {
    console.log('In redo request in backEndCaller');
    let dataToBeReturned = await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/redo/`,
        null
      )
    );
    console.log(dataToBeReturned);
    console.log('After redo request');
    return dataToBeReturned;
  }

  async save() {
    console.log('In save request in backEndCaller');
    let dataToBeReturned = await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/saveSession/`,
        null
      )
    );
    console.log(dataToBeReturned);
    console.log('After save request');
    return dataToBeReturned;
  }

  async load() {
    let dataToBeReturned = await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/loadSession/`,
        null
      )
    );
    console.log(dataToBeReturned);
    return dataToBeReturned;
  }

  async refresh() {
    await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/refreshSession/`,
        null
      )
    );
  }
}
