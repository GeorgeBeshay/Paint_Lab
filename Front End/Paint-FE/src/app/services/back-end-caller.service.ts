import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackEndCallerService {
  private port = 8081;
  private url = `http://localhost:${this.port}/callBackEndServer/shapeCreation/`;
  constructor(private http: HttpClient) {}

  requestShapeFromBE(shapeName: string) {
    let dataToBeReturned;
    this.http
      .post(this.url + shapeName, null)
      .subscribe(
        (data: any) => (
          console.log('statement inside request'),
          console.log(data),
          (dataToBeReturned = data)
        )
      );
    return dataToBeReturned;
  }
}
