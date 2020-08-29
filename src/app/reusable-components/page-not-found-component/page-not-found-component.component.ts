import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found-component',
  templateUrl: './page-not-found-component.component.html',
  styleUrls: ['./page-not-found-component.component.scss']
})
export class PageNotFoundComponentComponent implements OnInit {
  n = 10;
  constructor(private route: Router) { }

  ngOnInit() {
    setInterval(() => {
      this.n--;
    }, 1000);
    setTimeout(() => {
      this.route.navigate(['/home']);
    }, 10000);
  }

}
