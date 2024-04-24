import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { UploadComponent } from "./upload/upload.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { FavoritesService } from "./service/favorites.service";
import { authGuard } from './guard/auth.guard';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MyPostComponent } from './my-post/my-post.component';



const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "", component: GalleryComponent, canActivate: [authGuard] },
	{ path: "upload", component: UploadComponent, canActivate: [authGuard] },
	{ path: "register", component: RegisterComponent },
	{ path: 'post/:postId', component: PostDetailComponent },
  	{ path: '', redirectTo: '/gallery', pathMatch: 'full' },
	{ path: 'my-post', component: MyPostComponent },

];

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" }),
		
	],

	
	declarations: [
		AppComponent,
		TopBarComponent,
		GalleryComponent,
		UploadComponent,
		RegisterComponent,
		LoginComponent,
  		PostDetailComponent,
    MyPostComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
