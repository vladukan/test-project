import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from 'src/app/models/dialogData.model';
import {DialogTable} from 'src/app/models/dialogTable.model';
import {forkJoin} from 'rxjs';
import {BaseApi} from "../../services/base.api";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  loading = false;
  empty = false;
  title = '';
  columns: string[] = ['name', 'height', 'mass', 'birth_year'];
  dataSource: DialogTable[] = [];

  constructor(
    public dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private  api: BaseApi
  ) {
    console.log(data);
    this.title = data.name;
    if (data.people.length > 0) this.GetPeoples(data.people);
    else this.empty = true;
  }

  onClose(): void {
    this.dialog.close();
  }

  GetPeoples(data: string[]): void {
    this.loading = true;
    let query: any[] = [];
    data.forEach(item => {
      query.push(this.api.getURL(item))
    })
    forkJoin(query).subscribe(
      res => {
        console.log(res);
        res.forEach(item => {
          let arr = {
            name: item.name == undefined || item.name == 'unknown' ? 'Не указано' : item.name,
            height: item.height == undefined || item.height == 'unknown' ? 'Не указан' : item.height,
            mass: item.mass == undefined || item.mass == 'unknown' ? 'Не указан' : item.mass,
            birth_year: item.birth_year == undefined || item.birth_year == 'unknown' ? 'Не указан' : item.birth_year
          }
          this.dataSource.push(arr);
          this.dataSource = [...this.dataSource];
        })
        this.loading = false;
      })
  }

}

