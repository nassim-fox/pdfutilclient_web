import { Component, OnInit } from '@angular/core';
import { ImToPdfService } from '../services/im-to-pdf-service.service';
import {DomSanitizer} from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'im-to-pdf',
  templateUrl: './im-to-pdf.component.html',
  styleUrls: ['./im-to-pdf.component.css']
})
export class ImToPdfComponent implements OnInit {

  fileToUpload: File = null;
  imurl : string ; 
  visible_button_upload_im : boolean = false ;
  visible_button_upload_pdf : boolean = false ; 
  visible_button_to_pdf : boolean = false ; 
  visible_button_to_im : boolean = false ; 
  upload_success_im : boolean = false ; 
  upload_success_pdf : boolean = false ; 
  link_to_pdf : string ; 
  pdf_filename : string ; 
  link_to_zip : string ; 
  zip_filename : string ; 
  page : number ; 
  uploading_im$ : BehaviorSubject<boolean> = new BehaviorSubject(false); 
  uploading_pdf$ : BehaviorSubject<boolean> = new BehaviorSubject(false); 
  transim$ :  BehaviorSubject<boolean> = new BehaviorSubject(false); 
  transpdf$ :  BehaviorSubject<boolean> = new BehaviorSubject(false); 
  

  constructor(private imToPdfServce: ImToPdfService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

 

  uploadFile(event,type: string) {


    if(type=="im")
    {
      this.uploading_im$.next(true) ;
    }else if(type=="pdf")
    {
      this.uploading_pdf$.next(true) ; 
    } 

    this.imToPdfServce.upload(this.fileToUpload).subscribe(data => {
      
      if(type=="im")
      {
       
        this.upload_success_im = true ; 
        this.visible_button_to_pdf = true ; 
        this.uploading_im$.next(false) ; 
      }
      else if(type=="pdf")
      {
        this.upload_success_pdf = true ; 
        this.visible_button_to_im = true ; 
        this.uploading_pdf$.next(false) ; 
      }
    }, error => {
      console.log(error);
    } ) ;
 
    
  }

  // preview image
  updateImage(event,type: string){

   console.log("update image") ; 
   
   if(type=="im")
  {

   this.visible_button_to_pdf = false ; 
   this.upload_success_im = false ; 
   this.pdf_filename = "" ; 
   
   // show upload button
   this.visible_button_upload_im = true ; 

  } else if(type="pdf")
  {
    this.visible_button_to_im = false ; 
    this.upload_success_pdf = false ; 
    this.pdf_filename = "" ; 
    
    // show upload button
    this.visible_button_upload_pdf = true ; 
  }

   this.fileToUpload = event.target.files.item(0) ; 
  
   const f = (event.target as HTMLInputElement).files[0];

   // File Preview
   const reader = new FileReader();
   reader.onload = () => {
     this.imurl = reader.result as string;
   }
   reader.readAsDataURL(f)

 }

 // to pdf
 toPdf()
 {

  // for loading
  this.transim$.next(true) ; 

  this.imToPdfServce.topdf(this.fileToUpload.name).subscribe(data => {
    
    var newBlob = new Blob([data], { type: "application/pdf" });

    const l = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = l ;
    this.pdf_filename = this.fileToUpload.name.split('.').slice(0, -1).join('.')+".pdf" ; 


    this.link_to_pdf = link.toString() ; 
    
    this.upload_success_im = false ; 

    console.log(link) ; 

    this.transim$.next(false) ; 


  }, error => {
    console.log(error);
    
    this.transim$.next(false) ;

  });
 }


 // to images
 toImages()
 {
  
  //for loading
  this.transpdf$.next(true) ; 

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
    
    this.upload_success_pdf = false ; 

    this.transpdf$.next(false) ; 
  
  }, error => {
    console.log(error);
    
    this.transpdf$.next(false) ;

  });
 }

 sanitize(url:string){
  return this.sanitizer.bypassSecurityTrustResourceUrl(url) ;
}


initback()
{
  console.log("initback") ; 
  this.visible_button_to_pdf = false ; 
}

}
