import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { HeroService } from '../services/hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  originalHeroes = JSON.parse(JSON.stringify(HEROES));
  heroes: Hero[];
  selectedHero: Hero;
  newHero: Hero = {};
  isAnyHeroFighting = false;
  fightingHeroes: Hero[] = [];
  maxHeroErrorMsg = 'Only 2 heroes can participate in a fight.';

  constructor(public dialog: MatDialog,
  private heroService: HeroService) { }

  ngOnInit() {
    this.heroes = this.heroService.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  addNewHero(): any {
    if (this.newHero.name && this.newHero.universe) {
      var lastHeroId = this.heroes[this.heroes.length - 1].id;
      this.newHero.id = lastHeroId + 1;
      this.newHero.wins = 0;
      this.newHero.fights = 0;

      this.heroes.push(Object.assign({}, this.newHero));
      this.newHero = {};
    }
  }

  resetHeroes(): void {
    this.heroes = [];
    this.heroes = JSON.parse(JSON.stringify(this.originalHeroes));
  }

  addHeroToFight(hero: Hero): void {
    if (this.fightingHeroes.length == 2) {
      this.openMaxHeroErrorDialog();
      return;
    }

    this.isAnyHeroFighting = true;
    hero.isFighting = true;

    if (this.fightingHeroes.length < 2) {
      // Add hero to some array.
      this.fightingHeroes.push(Object.assign({}, hero));
    }
  }

  removeHeroFromFight(hero: Hero): void {
    hero.isFighting = false;

    _.remove(this.fightingHeroes, function (h) {
      return hero.name === h.name;
    }
    );

    if (this.fightingHeroes.length == 0) {
      this.isAnyHeroFighting = false;
    }
  }

  openMaxHeroErrorDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '512px',
      data: { message: this.maxHeroErrorMsg, isErrorMsg: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The max hero error dialog was closed');
    });
  }

  selectWinner(): void {
    let winnerFighter = _.sample(this.fightingHeroes);
    let loserFighter = _.find(this.fightingHeroes, function (hero) {
      return winnerFighter.name !== hero.name;
    });
    let winnerHero = _.find(this.heroes, function (hero) {
      return hero.name === winnerFighter.name;
    });
    let loserHero = _.find(this.heroes, function (hero) {
      return hero.name === loserFighter.name;
    });

    winnerHero.fights += 1;
    winnerHero.wins += 1;
    loserHero.fights += 1;

    // Open a dialog to show the winner.
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '512px',
      data: { message: 'The winner is: ' + winnerFighter.name, isErrorMsg: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The winner dialog was closed');
    });
  }
}