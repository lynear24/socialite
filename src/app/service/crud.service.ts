import { Injectable } from "@angular/core";
import { ImageItem, User } from "./Models";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class CrudService {
	// Node/Express API
	REST_API: string = "http://localhost:8000/api";

	// Http Header
	httpHeaders = new HttpHeaders().set("Content-Type", "application/json");

	constructor(private httpClient: HttpClient) {}

	// getPostById(postId: string): Observable<ImageItem> {
	// 	const url = `${this.REST_API}/posts/${postId}`; 
	// 	return this.httpClient.get<ImageItem>(url);
	//   }

	// Add Image
	AddImage(imageData: ImageItem, by_username: String, imageFile: File): Observable<any> {
		let API_URL = `${this.REST_API}/add-image`;

		const formData = new FormData();
		formData.append("image", imageFile);
		// const nameBlob = new Blob([imageData.name as BlobPart], {
		// 	type: "text/plain",
		// });

		// const descBlob = new Blob([imageData.desc as BlobPart], {
		// 	type: "text/plain",
		// });
		formData.append("name", imageData.name as string | Blob);
		formData.append("desc", imageData.desc as string | Blob);
		formData.append("by_username", by_username  as string | Blob);

		return this.httpClient
			.post(API_URL, formData)
			.pipe(catchError(this.handleError));
	}

	// Get all objects
	GetImages() {
		return this.httpClient.get(`${this.REST_API}`);
	}

	// Get single object
	GetImage(id: String): Observable<any> {
		let API_URL = `${this.REST_API}/get-image/${id}`;
		return this.httpClient.get(API_URL, { headers: this.httpHeaders });
	}

	// Delete
	deleteImage(id: any): Observable<any> {
		let API_URL = `${this.REST_API}/delete-image/${id}`;
		return this.httpClient
			.delete(API_URL, { headers: this.httpHeaders })
			.pipe(catchError(this.handleError));
	}

	// Error
	handleError(error: HttpErrorResponse) {
		let errorMessage = "";
		if (error.error instanceof ErrorEvent) {
			// Handle client error
			errorMessage = error.error.message;
		} else {
			// Handle server error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log(errorMessage);
		return throwError(errorMessage);
	}

	// Add User
	AddUser(userData: User): Observable<any> {
		let API_URL = `${this.REST_API}/add-user`;

		return this.httpClient
			.post(API_URL, userData)
			.pipe(catchError(this.handleError));
	}

	// Log in User
	LogInUser(loginData: User): Observable<any> {
		let API_URL = `${this.REST_API}/login-user`;
		return this.httpClient
			.post(API_URL, loginData)
			.pipe(catchError(this.handleError));
	}

	// Log out User
	LogOutUser(): Observable<any> {
		return this.httpClient.get(`${this.REST_API}/logout-user`);
	}

	// Get Logged in User
	GetLoggedInUser() {
		return this.httpClient.get(`${this.REST_API}/get-logged-in-user`);
	}
}
