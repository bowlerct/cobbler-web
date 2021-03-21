import {APP_ID, Component, Injectable, OnInit} from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { CobblerApiService } from 'cobbler-api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  userStatus = {
    loggedin: false,
  };

  constructor(private router: Router, private api: CobblerApiService) { }

  ngOnInit(): void {
    const storage = window.sessionStorage.getItem('loggedIn');
    if (storage) {
      const boolvalue = (storage === 'true');
      this.userStatus.loggedin = boolvalue;
      window.localStorage.userStatus = this.userStatus;
    }

    const apiURL: string = window.sessionStorage.getItem('cobblerApi');
    if (apiURL){
       this.api.setServiceURL(apiURL);
    } else {
      // FIXME - pull url from app global settings instead of hard reference
      this.api.setServiceURL('http://localhost/cobbler_api');
    }

    console.log(this.api.getVersion());
    /*
     * Do we want it to scroll to top on every component change?
     * component change/select from menu: scroll to top?
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    */
  }
}
