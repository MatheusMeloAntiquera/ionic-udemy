import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the DetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
  providers: [
    MovieProvider
  ]
})
export class DetalhesPage {
  public filme;
  public idFilme;
  constructor(public navCtrl: NavController, public navParams: NavParams, public movieProvider: MovieProvider) {
    this.idFilme = navParams.get("id");
  }

  ionViewDidEnter() {

    this.movieProvider.retornaDetalhesFilme(this.idFilme).subscribe(
      data => {
      
        const response = (data as any);
        this.filme = response;
      }, error => {
        console.log(error);
      }
    )
  }

}
