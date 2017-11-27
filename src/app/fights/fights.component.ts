import { Component, OnInit } from '@angular/core';
import { HeroesComponent } from '../heroes/heroes.component';
import { Hero } from '../hero';
import { HeroService } from './../services/hero.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'fights',
  templateUrl: './fights.component.html',
  styleUrls: ['./fights.component.css']
})
export class FightsComponent implements OnInit {
  displayedColumns = ['name', 'universe', 'wins', 'fights'];
  dataSource = new MatTableDataSource<Hero>(this.heroService.getHeroes());

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}