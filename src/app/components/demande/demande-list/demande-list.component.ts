import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/auth.service'
import { Demande } from '../../../models/demande';
import { DemandeService } from '../../../services/demande.service';
import { EtatDemande } from '../../../models/demande';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss']
})
export class DemandeListComponent implements OnInit {

  demandes!: Demande[];
  demandeEnAttente !: Demande[];
  demandeEnCours !: Demande[];
  demandeAcceptee !: Demande[];
  demandeRefusee !: Demande[];



  constructor(private authService: AuthService, private demandeService: DemandeService, private router: Router,private toastr: ToastrService) { 
   
  }
  
  ngOnInit(): void {
    if (this.authService.getUserType() === "etudiant") {
      const etudiantCin = this.authService.getCin();
      this.demandeService.getAllDemandesByEtudiant(Number(etudiantCin)).subscribe(
        (demandes: Demande[]) => {
          this.demandes = demandes;
          this.updateDemandeArrays();

        },
        (error: any) => {
          console.log(error);
        }
      );
    } else if (this.authService.getUserType() === 'responsable') {
      this.demandeService.getAllDemandes().subscribe(
        (demandes: Demande[]) => {
          this.demandes = demandes;
          this.updateDemandeArrays();

        },
        (error: any) => {
          console.log(error);
        }
      );
    }


  }
  deleteDemande(demande: Demande): void {
    this.demandeService.deleteDemande(demande.id ?? 0).subscribe(
      () => {
        const index = this.demandes.findIndex(d => d.id === demande.id);
        if (index !== -1) {
          this.demandes.splice(index, 1);
          this.toastr.success('Demande supprimée avec succès.');
          this.updateDemandeArrays(); 
        } else {
          this.toastr.error('La demande n\'a pas été trouvée dans la liste.');
        }
      },
      (error: any) => {
        console.log(error);
        this.toastr.error('Une erreur est survenue lors de la suppression de la demande.');
      }
    );
  }

  updateDemandeArrays(): void {
    if(this.demandes != null){
      console.log(this.demandes);
    this.demandeEnAttente = this.demandes.filter(demande => demande.etat === 'EN_ATTENTE');
    this.demandeEnCours = this.demandes.filter(demande => demande.etat === 'EN_COURS');
    this.demandeAcceptee = this.demandes.filter(demande => demande.etat === 'ACCEPTEE');
    this.demandeRefusee = this.demandes.filter(demande => demande.etat === 'REFUSEE');
    }
  }
  
}
