import { Component, ChangeDetectorRef } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { ImageItem } from '../service/Models';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { User } from '../service/Models';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  images: Array<ImageItem> = [];
  show: Boolean = true;
  isFaved: Boolean = false;
  logged_in_user: String = '';
  selectedPost: ImageItem | null = null;

  constructor(
    private crudService: CrudService,
    private router: Router,
    private ngZone: NgZone,
    private changeDetection: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event) => {
      this.crudService.GetLoggedInUser().subscribe((data) => {
        if (data) {
          let userData = data as User;
          this.logged_in_user = userData.username;
        }
      });
    });
  }

  ngOnInit(): void {
    this.crudService.GetImages().subscribe((res) => {
      this.images = res as ImageItem[];
    });
  }

  delete(id: any, i: ImageItem, index: number) {
    console.log('ImageItem:', i);
    console.log('Logged-in user:', this.logged_in_user);

    if (this.logged_in_user !== i.by_username) {
      alert("You don't have permission to delete this post.");
      return;
    }

    if (window.confirm('Do you want to go ahead and delete ' + i.name + '?')) {
      this.crudService.deleteImage(id).subscribe(
        (res) => {
          console.log('Post deleted successfully.', res);
          this.images.splice(index, 1);
          this.changeDetection.detectChanges();
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      );
    }
  }

  list_reload() {
    this.show = false;
    setTimeout(() => {
      this.show = true;
    });
  }

  onPostClick(post: ImageItem) {
    this.selectedPost = post;
    this.router.navigate(['/post', post._id]); // Navigate to the detailed view
  }
}
