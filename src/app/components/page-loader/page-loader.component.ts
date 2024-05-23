import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PageloaderService } from '../../services/pageloader.service';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.css'
})
export class PageLoaderComponent {
  constructor(public _loader : PageloaderService){}
}
