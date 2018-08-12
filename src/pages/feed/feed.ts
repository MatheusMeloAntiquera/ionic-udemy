import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

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

  carregarFilmes() {
    this.abrirCarregando();
    this.movieProvider.getLatestMovies().subscribe(
      data => {
        const response = (data as any);
        this.listaFilmes = response.results;
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

}
