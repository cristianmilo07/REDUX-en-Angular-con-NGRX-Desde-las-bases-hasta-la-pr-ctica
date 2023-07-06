import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.css']
})
export class NietoComponent {

  @Input() contador!: number;
  @Output() contandorCambio = new EventEmitter<number>();

  reset(){
    this.contador = 0;
    this.contandorCambio.emit(0);
  }

}
