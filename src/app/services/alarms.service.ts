import {Injectable} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class AlarmsService {
  constructor(
    public snackBar: MatSnackBar,
  ) {}
  public ShowAlarm(
    data: string = '',
    style: string = 'snackbar',
  duration: number = 2500,
    vertical: MatSnackBarVerticalPosition = 'bottom',
    horizontal: MatSnackBarHorizontalPosition = 'center'
  ) {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.verticalPosition = vertical;
    config.horizontalPosition = horizontal;
    config.panelClass = style;
    this.snackBar.open(data, 'Закрыть', config);
  }

}
