import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfiguracaoPage } from './configuracao';
import { PerfilPageModule } from '../perfil/perfil.module';
import { SobrePageModule } from '../sobre/sobre.module';

@NgModule({
  declarations: [
    ConfiguracaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguracaoPage),
    PerfilPageModule,
    SobrePageModule
  ],
})
export class ConfiguracaoPageModule {}
