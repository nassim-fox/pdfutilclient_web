import { Component, OnInit } from '@angular/core';
import { Log } from '../log' ; 
import { LogService } from '../services/log.service';
import { ActivatedRoute, Router } from '@angular/router' ; 
import { FormControl } from '@angular/forms' ; 


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {


  logList : Log[] ; 
  log : Log ; 
  message : string ; 

  constructor(private route: ActivatedRoute, private router: Router, private logService: LogService) { }

  ngOnInit(): void {

    this.reloadData() ; 
    
  }

  reloadData()
  {
    this.message = "" ; 
    this.log = new Log() ; 
    this.logService.getLog().subscribe(

      (data:any) =>
      { 
        console.log(data) ; 
        this.logList = data ; 
      } , 
      err =>
      {
        console.log(err) ; 
      }

    );
  }

}
