import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { ImageItem } from '../service/Models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  selectedPost!: ImageItem;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private router: Router
  ) {
    // this.post_observable$ = this.crudService.GetImage(postId);
  }

  ngOnInit(): void {
    // console.log(this.post_observable$);
    let postId: String = this.route.snapshot.paramMap.get('postId') as String;
    this.crudService.GetImage(postId).subscribe((post) => {
      if (postId.length > 0 && post) {
        this.selectedPost = post as ImageItem;
      }
    });
  }
}
