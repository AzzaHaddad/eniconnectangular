import { Component, OnInit } from '@angular/core';
import { EmploisService } from '../../../services/emplois.service';
import { AuthService } from '../../../authentication/auth.service';


@Component({
  selector: 'app-emplois',
  templateUrl: './emplois.component.html',
  styleUrls: ['./emplois.component.scss']
})
export class EmploisComponent implements OnInit {
  
  constructor(private emploisService: EmploisService, private authService: AuthService) { }

  ngOnInit() {
    const cin = Number(this.authService.getCin());
    const semestre = 2;
    const annee = 2023;
    this.emploisService.getEmploi(cin,semestre, annee).subscribe(response => {
      if (response.body) {
        const blob = new Blob([response.body], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.width = '100%';
        iframe.height = '1000vh';
        const container = document.getElementById('container');
        if (container) {
          container.appendChild(iframe);
        }
      } else {
        console.error('Response body is null');
      }
    });
  }
  

}
