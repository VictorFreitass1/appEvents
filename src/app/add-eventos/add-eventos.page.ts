import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/serivces/post.service';

@Component({
  selector: 'app-add-eventos',
  templateUrl: './add-eventos.page.html',
  styleUrls: ['./add-eventos.page.scss'],
})
export class AddEventosPage implements OnInit {
  id: number;  
  nome: string = "";
  data: string = "";
  capacidade: number = null;
  usuarios_id: number = null
  constructor() { }
  private service: PostService;
  private router: Router
  ngOnInit() {
  }

  cadastrar () {
    return new Promise(res =>{
      let dados = {
        requisicao:'add',
        nome:this.nome,
        data:this.data,
        capacidade:this.capacidade
      }
      //console.log(dados);
      this.service.dadosApi(dados,"usuarios.php").subscribe(data=>{
        if(data['success']){
          this.router.navigate(['eventos']);
          this.id=0;this.nome="";this.data="";this.capacidade=10;
        }
      });
    });
  }
}
