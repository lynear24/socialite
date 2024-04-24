import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { User } from '../service/Models';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  is_someone_logged_in: Boolean = false;
  constructor(
    private crudService: CrudService,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      this.crudService.GetLoggedInUser().subscribe((data) => {
        if (data) {
          this.is_someone_logged_in = true;
        } else {
          this.is_someone_logged_in = false;
        }
      });
    });
  }

  logout() {
    this.crudService.LogOutUser().subscribe((res) => {
      console.log('User logged out!');
    });
    this.ngZone.run(() => this.router.navigateByUrl('/login'));
  }
}
