import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { DetalhesPage } from '../detalhes/detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  public listaFilmes = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll: any;
  public proximaPagina = 1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  abrirCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando"
    });
    this.loader.present();
  }

  fecharCarregando() {
    this.loader.dismiss();
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  carregarFilmes(novaPagina: boolean = false) {
    this.abrirCarregando();
    
    this.movieProvider.getLatestMovies(this.proximaPagina).subscribe(
      data => {
        const response = (data as any);
        //Está utilizando o infiniteScroll então gera uma nova página
        if (novaPagina) {
          this.listaFilmes = this.listaFilmes.concat(response.results);
          this.infiniteScroll.complete();
        } else {
          this.listaFilmes = response.results;
        }
      }, error => {
        console.log(error);
      }, () => {
        this.fecharCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  abrirDetalhes(idFilme) {
    this.navCtrl.push(DetalhesPage, { id: idFilme });
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.proximaPagina++;
    this.carregarFilmes(true);
    infiniteScroll.complete();
  }

}
