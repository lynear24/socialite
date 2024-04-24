import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { ImageItem, User } from '../service/Models';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css'],
})
export class MyPostComponent implements OnInit {
  myPosts: ImageItem[] = [];
  logged_in_user: String = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    // Fetch logged-in user information
    this.crudService.GetLoggedInUser().subscribe((data) => {
      let userData = data as User;
      this.logged_in_user = userData.username;

      // Fetch all posts and separate them
      this.crudService.GetImages().subscribe((posts) => {
        const allPosts = posts as ImageItem[];
        this.myPosts = allPosts.filter(
          (post) => post.by_username === this.logged_in_user
        );
      });
    });
  }

  delete(id: any, i: any, index: number) {
    if (window.confirm('Do you want to go ahead and delete ' + i.name + '?')) {
      this.crudService.deleteImage(id).subscribe((res) => {
        this.myPosts.splice(index, 1);
      });
    }
  }
}
