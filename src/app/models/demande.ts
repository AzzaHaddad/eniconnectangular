export interface Demande {
    id?: number;
    objet: string;
    contenu: string;
    etat: EtatDemande;
    dateDemande: Date;
    reponse: string | null;
    dateReponse: Date | null;
  }
  
  
  export enum EtatDemande {
    EN_ATTENTE = "EN_ATTENTE",
    EN_COURS = "EN_COURS",
    ACCEPTEE = "ACCEPTEE",
    REFUSEE = "REFUSEE",
  }
  