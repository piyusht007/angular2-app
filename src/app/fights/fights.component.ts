import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HeroesComponent } from '../heroes/heroes.component';
import { Hero } from '../hero';

@Component({
  selector: 'fights',
  templateUrl: './fights.component.html',
  styleUrls: ['./fights.component.css']
})
export class FightsComponent implements OnInit {
  displayedColumns = {};
  dataSource = {};


  constructor(public heroComponent: HeroesComponent) { }

  ngOnInit() {
    this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
    this.dataSource = new MatTableDataSource<Hero>(this.heroComponent.heroes);
  }
}