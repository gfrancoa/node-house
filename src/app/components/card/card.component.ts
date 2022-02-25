import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input('mobiliario') mobiliario: any = {};

  num_banos = this.mobiliario.caracteristicas?.num_baños;

  constructor() {}

  ngOnInit(): void {}
}
