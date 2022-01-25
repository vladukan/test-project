import {Component, OnInit} from '@angular/core';
import {BaseApi} from 'src/app/services/base.api';
import {AlarmsService} from "../../services/alarms.service";
import { Planet } from 'src/app/models/planet.model';
import { Table } from 'src/app/models/tablePlanet.model';
import { MatDialog } from '@angular/material/dialog';
import {DialogComponent} from "../../components/dialog/dialog.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'test-project';
  loading = false;
  tableBlock = false;
  next = '';
  search = '';
  planets: Planet[] = [];
  dataSource: Table[] = [];
  selectedPlanet: Planet = {
    name: '',
    url: '',
    diameter: '',
    population: '',
    climate: '',
    residents: [],
  };
  columns: string[] = ['name', 'diameter', 'climate', 'population'];

  constructor(
    private BaseApi: BaseApi,
    private Alarms: AlarmsService,
    private Dialog: MatDialog,

  ) {
  }
  ngOnInit(): void {
    this.GetPlanets();
  }
  GetPlanets(): void {
    this.loading = true;
    this.next = '';
    this.BaseApi.get('planets').subscribe(
      (response) => {
        console.log(response);
        if (response.results) {
          this.planets = response.results;
          this.Alarms.ShowAlarm('Данные успешно загружены', 'snackbar-success')
        }
        if (response.next != null) this.next = response.next;
      },
      (error) => {
        console.error('Request failed with error')
        this.Alarms.ShowAlarm('Ошибка загрузки данных', 'snackbar-error')
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }
  NextPlanets(): void {
    this.BaseApi.getURL(this.next).subscribe(
      (response) => {
        console.log(response);
        if (response.results) {
          this.planets.push.apply(this.planets, response.results);
          this.Alarms.ShowAlarm('Планеты добавлены в список', 'snackbar-success')
        }
        if (response.next != null) this.next = response.next; else this.next = '';
      },
      (error) => {
        console.error('Request failed with error')
        this.Alarms.ShowAlarm('Ошибка загрузки новых планет', 'snackbar-error')
      })
  }
  SelectPlanet(value: Planet): void {
    this.dataSource = [{
      name: value.name,
      diameter: value.diameter,
      climate: value.climate,
      population: value.population
    }];
    if (!this.tableBlock) this.tableBlock = true;
  }
  OpenPlanet(){
    let data = {
      name: this.selectedPlanet.name,
      people: this.selectedPlanet.residents,
    };
    this.Dialog.open(DialogComponent, {data, disableClose: true});
  }
}
