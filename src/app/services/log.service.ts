import { Injectable } from '@angular/core';
import { Observable } from 'rxjs' ; 
import { HttpClient, HttpHeaders } from '@angular/common/http' ; 
import { Log } from '../log' ; 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin')
  })
  
};

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private url = "http://127.0.0.1:8000/log/" ; 

  constructor(private http:HttpClient) { }

  getLog() : Observable<Log[]>
  {
    return this.http.get<Log[]>(this.url,httpOptions) ; 
  }

  
}
