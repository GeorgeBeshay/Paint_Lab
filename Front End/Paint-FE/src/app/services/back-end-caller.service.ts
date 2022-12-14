import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  async requestShapeCloneFromBE(object: any, shapeName: string) {
    return await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/shapeClone/` +
          shapeName,
        object
      )
    );
  }

  async sendStage(stage: any) {
    let dataToBeReturned = await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/saveStage/`,
        stage
      )
    );
  }

  async undo() {
    let dataToBeReturned = await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/undo/`,
        null
      )
    );
    return dataToBeReturned;
  }

  async redo() {
    let dataToBeReturned = await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/redo/`,
        null
      )
    );
    return dataToBeReturned;
  }

  async save(path: string, json: boolean) {
    if (path == null) path = 'empty';
    if (json == null) json = true;
    let dataToBeReturned = await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/saveSession/${json}`,
        path
      )
    );
    console.log('Session has been saved successfully.');
    return dataToBeReturned;
  }

  async load(path: string, json: boolean) {
    if (path == null) path = 'empty';
    if (json == null) json = true;
    let dataToBeReturned = await firstValueFrom(
      this.http.post(
        `http://localhost:${this.port}/callBackEndServer/loadSession/`,
        path
      )
    );
    console.log('Session has been loaded successfully.');
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
