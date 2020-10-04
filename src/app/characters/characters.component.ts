import { ApiServiceService } from './../services/api-service.service';
import { Character } from './../models/character';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})

export class CharactersComponent implements OnInit {

  constructor(private characterSvc: ApiServiceService) {

  }

  metadata: Object;
  allCharacters: Character[];

  ngOnInit() {
    this.metadata = {
      offset: 0,
      limit: 0,
      total: 0,
      count: 0
    }

    this.getCharacters();
  }

  onScroll() {
    console.log('onScroll')
  }

  getCharacters() {
    this.characterSvc.getAllCharacters(this.metadata).subscribe((characters: Character[]) => {

      this.metadata = {
        offset: characters['data']['offset'],
        limit: characters['data']['limit'],
        total: characters['data']['total'],
        count: characters['data']['count']
      }

      this.allCharacters = characters['data'].results;

    });
  }


}
