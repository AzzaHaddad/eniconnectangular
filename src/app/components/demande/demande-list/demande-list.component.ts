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
    this.demandes = [
      {
        id: 1,
        objet: 'Demande de congé',
        contenu: 'Je voudrais prendre des congés du 10 au 15 mai',
        etat: EtatDemande.EN_ATTENTE,
        dateDemande: new Date('2022-04-25'),
        reponse: null,
        dateReponse: null
      },
      {
        id: 2,
        objet: 'Demande de formation',
        contenu: 'Je voudrais suivre une formation sur Angular',
        etat: EtatDemande.ACCEPTEE,
        dateDemande: new Date('2022-04-20'),
        reponse: 'Votre demande de formation a été acceptée',
        dateReponse: new Date('2022-04-21')
      },
      {
        id: 3,
        objet: 'Demande de matériel',
        contenu: 'Je voudrais un nouvel ordinateur portable',
        etat: EtatDemande.REFUSEE,
        dateDemande: new Date('2022-04-18'),
        reponse: 'Votre demande de matériel a été refusée',
        dateReponse: new Date('2022-04-19')
      },
      {
        id: 4,
        objet: 'Demande de congé',
        contenu: 'Je voudrais prendre des congés du 5 au 10 juin',
        etat: EtatDemande.EN_COURS,
        dateDemande: new Date('2022-04-15'),
        reponse: null,
        dateReponse: null
      },
      {
        id: 3,
        objet: 'Demande de matériel',
        contenu: 'Je voudrais un nouvel ordinateur portable',
        etat: EtatDemande.REFUSEE,
        dateDemande: new Date('2022-04-18'),
        reponse: 'Votre demande de matériel a été refusée',
        dateReponse: new Date('2022-04-19')
      },
      {
        id: 3,
        objet: 'Demande de matériel',
        contenu: 'Je voudrais un nouvel ordinateur portable',
        etat: EtatDemande.REFUSEE,
        dateDemande: new Date('2022-04-18'),
        reponse: 'Votre demande de matériel a été refusée',
        dateReponse: new Date('2022-04-19')
      },
      {
        id: 3,
        objet: 'Demande de matériel',
        contenu: 'Je voudrais un nouvel ordinateur portable',
        etat: EtatDemande.REFUSEE,
        dateDemande: new Date('2022-04-18'),
        reponse: 'Votre demande de matériel a été refusée',
        dateReponse: new Date('2022-04-19')
      },{
        id: 3,
        objet: 'Demande de matériel',
        contenu: 'Je voudrais un nouvel ordinateur portable',
        etat: EtatDemande.REFUSEE,
        dateDemande: new Date('2022-04-18'),
        reponse: 'Votre demande de matériel a été refusée',
        dateReponse: new Date('2022-04-19')
      },{
        id: 3,
        objet: 'Demande de matériel',
        contenu: 'Je voudrais un nouvel ordinateur portable',
        etat: EtatDemande.REFUSEE,
        dateDemande: new Date('2022-04-18'),
        reponse: 'Votre demande de matériel a été refusée',
        dateReponse: new Date('2022-04-19')
      },
      {
        id: 3,
        objet: 'Demande de matériel',
        contenu: 'Je voudrais un nouvel ordinateur portable',
        etat: EtatDemande.REFUSEE,
        dateDemande: new Date('2022-04-18'),
        reponse: 'Votre demande de matériel a été refusée',
        dateReponse: new Date('2022-04-19')
      },  
    ]
  }
  
  ngOnInit(): void {
    if (this.authService.getUserType() === "etudiant") {
      const etudiantCin = this.authService.getCin();
      this.demandeService.getAllDemandesByEtudiant(Number(etudiantCin)).subscribe(
        (demandes: Demande[]) => {
          this.demandes = demandes;
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else if (this.authService.getUserType() === 'responsable') {
      this.demandeService.getAllDemandes().subscribe(
        (demandes: Demande[]) => {
          this.demandes = demandes;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
    this.updateDemandeArrays();

  }
  deleteDemande(demande: Demande): void {
    this.demandeService.deleteDemande(demande.id).subscribe(
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
    this.demandeEnAttente = this.demandes.filter(demande => demande.etat === 'EN_ATTENTE');
    this.demandeEnCours = this.demandes.filter(demande => demande.etat === 'EN_COURS');
    this.demandeAcceptee = this.demandes.filter(demande => demande.etat === 'ACCEPTEE');
    this.demandeRefusee = this.demandes.filter(demande => demande.etat === 'REFUSEE');
  }
  
}
