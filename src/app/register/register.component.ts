import { Component, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { CrudService } from "../service/crud.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  userForm: FormGroup;

  constructor(
		public formBuilder: FormBuilder,
		private router: Router,
		private ngZone: NgZone,
		private crudService: CrudService
	) {
		this.userForm = this.formBuilder.group({
			username: [""],
			password: [""],
		});
	}

  onSubmit(): any {
		this.crudService
			.AddUser(
				this.userForm.value
			)
			.subscribe(
				() => {
					console.log("User added successfully!");
					this.ngZone.run(() => this.router.navigateByUrl("/"));
				},
				(err) => {
					console.log(err);
				}
			);
	}
}