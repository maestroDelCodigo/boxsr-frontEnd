import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/security-services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { MuestrasComponent } from './pages/muestras/muestras.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SobreBoxsrComponent } from './pages/sobre-boxsr/sobre-boxsr.component';
import { ConocenosComponent } from './pages/sobre-boxsr/conocenos/conocenos.component';
import { PielComponent } from './pages/sobre-boxsr/piel/piel.component';
import { IngredientesComponent } from './pages/sobre-boxsr/ingredientes/ingredientes.component';
import { AvisoLegalComponent } from './pages/avisoLegal/avisoLegal.component';
import { PagoSeguroComponent } from './pages/pago-seguro/pago-seguro.component';
import { EnviosDevolucionesComponent } from './pages/envios-devoluciones/envios-devoluciones.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';
import { CondicionesGeneralesComponent } from './pages/condiciones-generales/condiciones-generales.component';
import { HablanDeNosotrosComponent } from './pages/sobre-boxsr/hablan-de-nosotros/hablan-de-nosotros.component';
import { ProductoComponent } from './pages/shop/producto/producto.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'muestras', component: MuestrasComponent },
  { path: 'sobre-boxsr', component: SobreBoxsrComponent },
  { path: 'conocenos', component: ConocenosComponent },
  { path: 'piel', component: PielComponent },
  { path: 'ingredientes', component: IngredientesComponent },
  { path: 'aviso-legal', component: AvisoLegalComponent },
  { path: 'pago-seguro', component: PagoSeguroComponent },
  { path: 'envios-devoluciones', component: EnviosDevolucionesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
  { path: 'condiciones-generales', component: CondicionesGeneralesComponent },
  { path: 'hablan-de-nosotros', component: HablanDeNosotrosComponent },
  { path: 'producto/:id', component: ProductoComponent },


  {
    path: 'admin',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
