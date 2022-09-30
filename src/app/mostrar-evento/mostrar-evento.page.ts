import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/serivces/post.service';

@Component({
  selector: 'app-mostrar-evento',
  templateUrl: './mostrar-evento.page.html',
  styleUrls: ['./mostrar-evento.page.scss'],
})
export class MostrarEventoPage implements OnInit {
id:number;
nome:string='';
data:string='';
capacidade:string='';
  constructor(
    private actRoute: ActivatedRoute,
    private service: PostService
    ) { }
  
  
  ngOnInit() {
    this.actRoute.params.subscribe((dadosdarota:any)=>{
    this.id= dadosdarota.id;
    this.nome= dadosdarota.nome;
    this.data= dadosdarota.data;
    this.capacidade= dadosdarota.capacidade;
});
}
}