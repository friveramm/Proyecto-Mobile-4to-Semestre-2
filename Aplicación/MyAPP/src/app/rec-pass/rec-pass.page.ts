import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-rec-pass',
  templateUrl: './rec-pass.page.html',
  styleUrls: ['./rec-pass.page.scss'],
})
export class RecPassPage implements OnInit {

  constructor(private router: Router) {}

  user = {
    "username":""
  };


  confirmacion() {

  }
 


  ngOnInit() {
  }

}
