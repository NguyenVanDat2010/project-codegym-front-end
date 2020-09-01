import { Component, OnInit, Input } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {PostResponse} from '../../../containers/model/house/post-response';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  faComments = faComments;
  @Input() posts: PostResponse[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToPost(postId: number): void {
    this.router.navigateByUrl('/view-post/' + postId);
  }
}
