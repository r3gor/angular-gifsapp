import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  @ViewChild('iptSearchRef') iptSearchRef!: ElementRef<HTMLInputElement> // ! -> no null assertion operation
  // View child es similar a un query selector para 
  // seleccionar elementos del componente

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  search() {
    const value = this.iptSearchRef.nativeElement.value

    if (value.trim().length == 0) return;
    
    this.gifsService.findGifs(value)
    this.iptSearchRef.nativeElement.value = ""
  }

}
