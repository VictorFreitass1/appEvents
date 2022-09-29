import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private alertCtr: AlertController
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
      this.service.dadosApi(dados,'api_eventos.php').subscribe(data =>{

        if(data['result']=='0'){
          this.ionViewWillEnter();
        }else{
          for(let Eventos of data['result']){
            this.eventos.push(Eventos[0]);
          }
        }
      });
    });
}// fim do método carregar
editar(id, nome, data, capacidade, usuarios_id){
  this.router.navigate(['add-eventos/'+id+'/'+nome+'/'+data+'/'+capacidade]);
}
mostrar(id, nome, data, capacidade){
  this.router.navigate(['mostrar-eventos/'+id+'/'+nome+'/'+data+'/'+capacidade]);
}
ativar(id, ativo){
  if(ativo=='1'){
    return new Promise(()=>{ 
      let dados = {
        requisicao: 'excluir',
        id: id,
      };
      this.service.dadosApi(dados, "api_eventos.php").subscribe(data=>{
      this.ionViewWillEnter();
    })
  });
}
  else {
    return new Promise(()=>{
      let dados = {
        requisicao: 'ativar',
        id: id,
      };
      this.service.dadosApi(dados, "api_eventos.php").subscribe(data=>{
      this.ionViewWillEnter();
    })
  });
  };


}
async alertaexclusao(id, eventos){
  const alert = await this.alertCtr.create({
    header:'Confirmação de exclusão do evento ' + eventos,
    buttons:[{
      text:'Cancelar', role:'cancel', cssClass:'light',
      handler:()=>{
        // Ação caso o usuário clique em cancelar
      }},{
          text:'Ok',
          handler:()=>{
            this.ativar(id,1)
        }
      }]
  });
alert.present();
}
}
