import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UploadSoundComponent } from './upload-sound/upload-sound.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageSoundsComponent } from './manage-sounds/manage-sounds.component';
import { ServerSettingsComponent } from './server-settings/server-settings.component';
import { CategoriesComponent } from './categories/categories.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateCategoryDialogComponent } from './categories/create-category-dialog/create-category-dialog.component';


@NgModule({
  declarations: [
    UploadSoundComponent,
    ManageUsersComponent,
    ManageSoundsComponent,
    ServerSettingsComponent,
    CategoriesComponent,
    CreateCategoryDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressBarModule
  ]
})
export class AdminModule { }
