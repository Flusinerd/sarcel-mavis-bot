import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadSoundComponent } from './upload-sound/upload-sound.component';
import { ManageSoundsComponent } from './manage-sounds/manage-sounds.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: 'sounds',
    children: [
      {
        path: 'upload',
        component: UploadSoundComponent
      },
      {
        path: 'manage',
        component: ManageSoundsComponent
      },
    ]
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        component: CategoriesComponent
      },
      {
        path: ':id',
        component: CategoriesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
