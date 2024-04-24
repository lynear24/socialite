import { Component, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { CrudService } from "../service/crud.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
		public formBuilder: FormBuilder,
		private router: Router,
		private ngZone: NgZone,
		private crudService: CrudService
	) {
		this.loginForm = this.formBuilder.group({
			username: [""],
			password: [""],
		});
	}

  onSubmit(): any {
		this.crudService
			.LogInUser(
				this.loginForm.value
			)
			.subscribe(
				() => {
					console.log("User logged in!");
					this.ngZone.run(() => this.router.navigateByUrl("/"));
				},
				(err) => {
					console.log(err);
				}
			);
	}
}