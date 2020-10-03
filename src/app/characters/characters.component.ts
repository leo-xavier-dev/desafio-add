import { Character } from './../models/character';

import { CharactersApiService } from './character/shared/characters-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})

export class CharactersComponent implements OnInit {

  constructor(private characterSvc: CharactersApiService) { }

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

  // getCharacters() {
  //   debugger
  //   this.allCharacters = this.characterSvc.getAllCharacters();
  // }

  onScroll() {
    console.log('onScroll')
  }

  getCharacters() {
    this.characterSvc.getAllCharacters(this.metadata).subscribe((characters: Character[]) => {

      // "offset": 0,
      // "limit": 20,
      // "total": 47714,
      // "count": 20,

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
