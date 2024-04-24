import { HostListener, Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { CrudService } from "../service/crud.service";
import { User } from '../service/Models';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: "app-upload",
	templateUrl: "./upload.component.html",
	styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {
	imageForm: FormGroup;
	private imgFile: File;
	logged_in_user : String = "";

	constructor(
		public formBuilder: FormBuilder,
		private router: Router,
		private ngZone: NgZone,
		private crudService: CrudService
	) {
		this.imageForm = this.formBuilder.group({
			name: [""],
			desc: [""],
			imageFile: [null, Validators.required],
		});

		this.imgFile = new File([""], "");

		this.router.events.subscribe(event => {
			this.crudService.GetLoggedInUser().subscribe((data) => {
				let userData = data as User;
				this.logged_in_user = userData.username;
			});
		  });
	}

	ngOnInit() {}

	onFileChange(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.imgFile = file;
		}
	}

	onSubmit(): any {
		this.crudService
			.AddImage(
				this.imageForm.value,
				this.logged_in_user,
				this.imgFile
			)
			.subscribe(
				() => {
					console.log("Image added successfully!");
					this.ngZone.run(() => this.router.navigateByUrl("/"));
				},
				(err) => {
					console.log(err);
				}
			);
	}
}
