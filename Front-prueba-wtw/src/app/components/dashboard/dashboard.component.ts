import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token: string | null = '';
  expiration: string | null = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
    this.expiration = localStorage.getItem('expiration');
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiration');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
