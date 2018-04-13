import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DexihWidgetModule } from './widget/dexih-widget.module';
import { DexihButtonsModule } from './buttons/dexihButtons.module';
import { DexihFormControlsModule } from './form-controls/dexih-form-controls.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DexihWidgetModule,
    DexihButtonsModule,
    DexihFormControlsModule,
    RouterModule
  ],
  declarations: [
  ],
  exports: [
    RouterModule,
    DexihWidgetModule,
    DexihButtonsModule,
    DexihFormControlsModule
  ]
})
export class DexihComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DexihComponentsModule,
      providers: []
    };
  }
}
