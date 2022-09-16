import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/serivces/post.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  nome: string = "";
  limite:number=10;
  inicial:number=0;
  eventos:any = []; //define uma matriz vazia
  constructor(
    private service: PostService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    // garante que a nossa tela sempre exiba os dados atualizados
    this.eventos = [];
    this.inicial = 0;
    this.carregar();
  }
  addEventos(){
    this.router.navigate(['add-eventos']);
  }
  carregar(){
    return new Promise(ret =>{
      this.eventos=[];
      let dados = {
        requisicao:"listar",
        nome:this.nome, 
        limit:this.limite,
        start:this.inicial
      };
      this.service.dadosApi(dados,'usuarios.php').subscribe(data =>{
        if(data['result']=='0'){
          this.ionViewWillEnter();
        }else{
          for(let eventos of data['result']){
            this.eventos.push('eventos');
          }
        }
      });
    });
}// fim do método carregar



}
