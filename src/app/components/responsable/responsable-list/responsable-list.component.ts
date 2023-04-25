import { Component, OnInit  } from '@angular/core';
import { TableModule } from '@coreui/angular';
import { ResponsableService } from '../../../services/responsable.service'
import { Responsable } from '../../../models/responsable.model'
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-responsable-list',
  templateUrl: './responsable-list.component.html',
  styleUrls: ['./responsable-list.component.scss']
})
export class ResponsableListComponent  implements OnInit {

  responsables: Responsable[] = [];

  constructor(private responsableService: ResponsableService, private toastr: ToastrService) { }


   ngOnInit(): void {
    this.listResponsables();
  }

  listResponsables() {
    this.responsableService.getAllResponsables().subscribe(
      data => this.responsables = data
    )
  }
  
  deleteResponsable(i: number): void {
    const email = this.responsables[i].email;
    this.responsableService.deleteResponsable(email).subscribe(
      () => {
        // show success message
        this.toastr.success('Responsable deleted successfully.');
        this.responsables.splice(i, 1);
      },
      () => {
        // show error message
        this.toastr.error('An error occurred while deleting responsable.');
      }
    );
  }


  updateResponsable(index: number): void {
    const updatedResponsable = this.responsables[index];
    this.responsableService.updateResponsable(updatedResponsable).subscribe(
      (response) => {
        // display success message
        this.toastr.success('Responsable updated successfully.');
      },
      (error) => {
        // handle error and display error message
        console.log(error);
        this.toastr.error('An error occurred while updating the responsable.');
      }
    );
  }

}
