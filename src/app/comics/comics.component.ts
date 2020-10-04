import { Component, OnInit } from '@angular/core';
import { Comics } from '../models/comics';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})

export class ComicsComponent implements OnInit {

  constructor(private characterSvc: ApiServiceService) { }

  metadata: Object;
  allComics: Comics[];

  ngOnInit() {
    this.metadata = {
      offset: 0,
      limit: 0,
      total: 0,
      count: 0
    }

    this.getComics();
  }

  onScroll() {
    console.log('onScroll')
  }

  getComics() {
    this.characterSvc.getAllComics(this.metadata).subscribe((comics: Comics[]) => {

      this.metadata = {
        offset: comics['data']['offset'],
        limit: comics['data']['limit'],
        total: comics['data']['total'],
        count: comics['data']['count']
      }

      this.allComics = comics['data'].results;

    });
  }

}
