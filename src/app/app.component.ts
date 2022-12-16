import { Component, OnInit } from '@angular/core';
import { Movie } from './models/movie';
import { MoviesService } from './services/movies.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './components/details/details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies: Movie[] = [];
  moviesTemp: Movie[] = [];
  favorites: Movie[] | any = [];
  loading: boolean = false;
  page: number = 1;
  search: string = "";
  constructor(private moviesServices: MoviesService, config: NgbRatingConfig, private modalService: NgbModal) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getFavorites();
    this.getMovies()
  }
  getMovies() { 
    this.loading = true;
    this.search = "";
    this.moviesServices.getMovies(this.page).subscribe((movies: any) => {
      this.movies = movies['results'];
      console.log(this.movies)
      this.moviesTemp = this.movies;
      console.log(this.movies)
      this.loading = false;
    }, err => {
      console.log("Error: " + err)
    });
  }
  Search() {
    if (this.search == "") {
      this.moviesTemp = this.movies;
      return;
    }
    this.moviesTemp = this.movies.filter(movie => movie.title.toLowerCase().includes(this.search.toLowerCase()))
  }
  open(movie: any){
    const modalRef =  this.modalService.open(DetailsComponent, {size: "lg"})
    modalRef.componentInstance.movie = movie;
  }
  addToFavorite(movie: Movie){ 
    let exist = this.favorites.some((favorite: Movie) => favorite.id == movie.id)
    if(exist){
      this.favorites = this.favorites.filter((favorite: Movie) => favorite.id != movie.id)
    }else{
      this.favorites.push(movie)
    }
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
  getFavorites(){
    let favs = localStorage.getItem("favorites");
    if(favs){
      this.favorites = JSON.parse(favs); 
    }else{
      this.favorites = [];
    }
  }
  isInFavorite(movie: Movie){
    let exist = this.favorites.some((favorite: Movie) => favorite.id == movie.id)
    if(exist){
      return true
    }
    return false
  }
}
