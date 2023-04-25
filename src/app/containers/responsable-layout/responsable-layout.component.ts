import { Component } from '@angular/core';
import { navItems } from './_nav';

@Component({
  selector: 'app-responsable-layout',
  templateUrl: './responsable-layout.component.html',
  styleUrls: ['./responsable-layout.component.scss']
})
export class ResponsableLayoutComponent {
  
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}

}
