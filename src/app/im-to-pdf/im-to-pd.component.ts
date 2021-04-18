import { Component, OnInit } from '@angular/core';
import { ImToPdfService } from '../services/im-to-pdf-service.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'im-to-pdf',
  templateUrl: './im-to-pdf.component.html',
  styleUrls: ['./im-to-pdf.component.css']
})
export class ImToPdfComponent implements OnInit {

  fileToUpload: File = null;
  imurl : string ; 
  visible_button_upload : boolean = false ; 
  visible_button_to_pdf : boolean = false ; 
  upload_success : boolean = false ; 
  link_to_pdf : string ; 
  pdf_filename : string ; 
  link_to_zip : string ; 
  zip_filename : string ; 
  page : number ; 
  

  constructor(private imToPdfServce: ImToPdfService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

 

  uploadFile() {

    this.imToPdfServce.upload(this.fileToUpload).subscribe(data => {
      
      this.upload_success = true ; 
      this.visible_button_to_pdf = true ; 

    }, error => {
      console.log(error);
    });
  }

  // preview image
  updateImage(event){

   console.log("update image") ; 
   
   this.visible_button_to_pdf = false ; 
   this.upload_success = false ; 
   this.pdf_filename = "" ; 

   this.fileToUpload = event.target.files.item(0) ; 
  
   const f = (event.target as HTMLInputElement).files[0];

   // File Preview
   const reader = new FileReader();
   reader.onload = () => {
     this.imurl = reader.result as string;
   }
   reader.readAsDataURL(f)

   // show upload button
   this.visible_button_upload = true ; 

 }

 // to pdf
 toPdf()
 {
  this.imToPdfServce.topdf(this.fileToUpload.name).subscribe(data => {
    
    var newBlob = new Blob([data], { type: "application/pdf" });

    const l = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = l ;
    this.pdf_filename = this.fileToUpload.name.split('.').slice(0, -1).join('.')+".pdf" ; 


    this.link_to_pdf = link.toString() ; 
    
    this.upload_success = false ; 

    console.log(link) ; 


  }, error => {
    console.log(error);
  });
 }


 // to images
 toImages()
 {
  console.log("toimages") ; 
  this.imToPdfServce.toimages(this.fileToUpload.name).subscribe(data => {
    const blob = new Blob([data], {
      type: 'application/zip'
    });
    
    const url = window.URL.createObjectURL(blob);
    
    var link = document.createElement('a');
    link.href = url ; 
    this.zip_filename = this.fileToUpload.name.split('.').slice(0, -1).join('.')+".zip" ; 


    this.link_to_zip = link.toString() ; 
    
    this.upload_success = false ; 

    //window.open(url);
  }, error => {
    console.log(error);
  });
 }

 sanitize(url:string){
  return this.sanitizer.bypassSecurityTrustResourceUrl(url) ;
}


}
