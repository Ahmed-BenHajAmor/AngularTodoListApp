import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

//Navigation links
@Component({
  selector: 'app-links',
  standalone: true,
  imports: [RouterModule, NgStyle],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent{
  
 
}
