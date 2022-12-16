
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Movie } from 'src/app/models/movie';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() movie: Movie | any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    
  }

}
