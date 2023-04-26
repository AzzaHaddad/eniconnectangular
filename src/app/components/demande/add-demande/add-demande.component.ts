import { Component, OnInit } from '@angular/core';
import { Demande } from '../../../models/demande';
import { DemandeService } from '../../../services/demande.service';
import { EtatDemande } from '../../../models/demande';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.scss']
})
export class AddDemandeComponent implements OnInit {
  demande: Demande = {
    objet: '',
    contenu: '',
    etat: EtatDemande.EN_ATTENTE,
    dateDemande: new Date(),
    reponse: null,
    dateReponse: null
  };

  constructor(private demandeService: DemandeService, private toastr: ToastrService , private router: Router) {}

  ngOnInit(): void {
    const currentDate = new Date();
    this.demande.dateDemande = currentDate;
    console.log(currentDate);
  }
  
  onSubmit(): void {
    this.demandeService.createDemande(this.demande.objet, this.demande.contenu).subscribe(
      (demandeId: number) => {
        this.toastr.success('Demande soumise avec succès', 'Succès');
        this.router.navigate(['/etudiant/demande-list']); // Redirect to the success page

      },
      (error: any) => {
        this.toastr.error('Une erreur est survenue', 'Erreur');
      }
    );
  }

}
