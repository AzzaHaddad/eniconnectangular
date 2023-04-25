import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Admin',
    url: '/admin',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Responsable'
  },
  {
    name: 'Listes Des Responsables',
    url: '/admin/responsable-list',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Ajouter Responsable',
    url: '/admin',
    iconComponent: { name: 'cil-pencil' }
  },

];
