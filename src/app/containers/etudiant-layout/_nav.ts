import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Etudiant',
    url: '/etudiant',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Demandes'
  },
  {
    name: 'Listes Des Demandes',
    url: '/etudiant/demande-list',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Créer une demande',
    url: '/etudiant/add-demande',
    iconComponent: { name: 'cil-pencil' }
  },

];
