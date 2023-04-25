import { Component } from '@angular/core';
import { ResponsableService } from '../../../services/responsable.service';
import { Responsable } from '../../../models/responsable.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-responsable',
  templateUrl: './add-responsable.component.html',
  styleUrls: ['./add-responsable.component.scss']
})
export class AddResponsableComponent {
  responsable: Responsable = {
  nom: '',
  prenom: '',
  adresse: '',
  ville: '',
  codePostal: '',
  telephone: '',
  email: '',
  password: ''
};

constructor(private responsableService: ResponsableService, private toastr: ToastrService,private router: Router) { }

onSubmit() {
  if (!this.responsable.nom || !this.responsable.prenom || !this.responsable.adresse || !this.responsable.ville ||
    !this.responsable.codePostal || !this.responsable.telephone || !this.responsable.email || !this.responsable.password) {
  this.toastr.error('Please fill out all required fields correctly.');
  return;
}

  this.responsableService.addResponsable(this.responsable).subscribe(
    response => {
      console.log(response);
      this.toastr.success('Responsable added successfully.');
      this.router.navigate(['/admin/responsable-list']); // Redirect to the success page
    },
    error => {
      console.error(error);
      this.toastr.error('Error occurred while adding Responsable.');
    }
  );
}

generatePassword() {
  console.log("okk")
  let password = '';
  const passwordLength = 10;
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    password += charSet[randomIndex];
  }
  this.responsable.password=password;
}


}