import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() data: string = '';
  @Input() icon: string = '';
  @Input() background: string = '';
  @Input() isCountCard: boolean = false;
  @Input() count: number = 0;
  @Input() margin: string = '';
}
