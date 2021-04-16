import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'multipart/form-data'
  })
  
};

@Injectable({
  providedIn: 'root'
}) 

export class ImToPdfService {

  url : string = "https://pdfutil.herokuapp.com/" ; 

  constructor(private httpClient: HttpClient) { }

  upload(fileToUpload: File): Observable<boolean> {

    const endpoint = this.url+"upload" ;

    const formData: FormData = new FormData();
    
    //formData.append('fileKey', fileToUpload, fileToUpload.name) ;

    return this.httpClient.put<boolean>(endpoint+"/"+fileToUpload.name, fileToUpload) ; 
}

  topdf(filename: string) : Observable<Blob>
  {
    return this.httpClient.get(this.url+"/imTopdf/"+filename,{responseType : "blob"}) ; 
  }

}
