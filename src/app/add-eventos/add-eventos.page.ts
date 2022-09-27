import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  usuarios_id = null;
  usuarios = []
  constructor(
    private service: PostService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((dadosdarota:any)=>{
      this.id= dadosdarota.id;
      this.nome= dadosdarota.nome;
      this.data= dadosdarota.usuario;
      this.capacidade= dadosdarota.senha;

    });
  }
  carregar(){
    return new Promise(ret =>{
      this.usuarios=[];
      let dados = {
        requisicao:"listar",
        nome:"", 
        limit: 100,
        start: 0
      };
      this.service.dadosApi(dados,'Eventos.php').subscribe(data =>{
        console.log (data);
        if(data['result']=='0'){
          this.ionViewWillEnter();
        }else{
          for(let usuario of data['result']){
            this.usuarios.push(usuario);
          }
        }
      });
    });
  }
  ionViewWillEnter(){
    // garante que a nossa tela sempre exiba os dados atualizados
    this.usuarios = [];
    this.carregar();
  }
  cadastrar () {
    return new Promise(res =>{
      let dados = {
        requisicao:'add',
        nome:this.nome,
        data:this.data,
        capacidade:this.capacidade,
        usuarios_id: this.usuarios_id
      }
      //console.log(dados);
      this.service.dadosApi(dados,"Eventos.php").subscribe(data=>{
        if(data['success']){
          this.router.navigate(['eventos']);
          this.id=0;this.nome="";this.data="";this.capacidade=10;
        }
      });
    });
  }

  editar() {
    return new Promise(res =>{
        let dados = {
          requisicao:'editar',
          nome: this.nome,
          data: this.data,
          capacidade:this.capacidade,
          id:this.id
        };
        this.service.dadosApi(dados,"eventos.php").subscribe(data=>{
        if(data['success']){
          this.router.navigate(['eventos'])
        }
      });
    });
  }
}
