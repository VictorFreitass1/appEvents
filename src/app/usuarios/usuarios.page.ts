import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PostService } from 'src/serivces/post.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
nome: string = "";
limite:number=10;
inicial:number=0;
usuarios:any = []; //define uma matriz vazia
  constructor(
    private service: PostService,
    private router: Router,
    private alertCtr: AlertController
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    // garante que a nossa tela sempre exiba os dados atualizados
    this.usuarios = [];
    this.inicial = 0;
    this.carregar();
  }
  addUsuario(){
    this.router.navigate(['add-usuario']);
  }
  carregar(){
    return new Promise(ret =>{
      this.usuarios=[];
      let dados = {
        requisicao:"listar",
        nome:this.nome, 
        limit:this.limite,
        start:this.inicial
      };
      this.service.dadosApi(dados,'api_usuario.php').subscribe(data =>{
        
        if(data['result']=='0'){
          this.ionViewWillEnter();
        }else{
          for(let usuario of data['result']){
            this.usuarios.push(usuario[0]);
          }
        }
      });
    });
  }// fim do método carregar
  editar(id, nome, usuario, senha_orginal,nivel){
    this.router.navigate(['add-usuario/'+id+'/'+nome+'/'+usuario+'/'+senha_orginal+'/'+nivel]);
  }
  mostrar(id, nome, usuario,nivel){
    this.router.navigate(['mostrar-usuario/'+id+'/'+nome+'/'+usuario+'/'+nivel]);
  }
  ativar(id, ativo){
    if(ativo=='1'){
      return new Promise(()=>{
        let dados = {
          requisicao: 'excluir',
          id: id,
        };
        this.service.dadosApi(dados, "api_usuario.php").subscribe(data=>{
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
        this.service.dadosApi(dados, "api_usuario.php").subscribe(data=>{
        this.ionViewWillEnter();
      })
    });
    };


  }
  async alertaexclusao(id, usuario){
    const alert = await this.alertCtr.create({
      header:'Confirmação de exclusão do usuário ' + usuario,
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
async mostrarnivel(nivel){
    const alert = await this.alertCtr.create({
      header:'Você está no nivel ',
      message:'<h2>'+nivel+'</h2>',
      buttons:[{
        text:'Cancelar', role:'cancel', cssClass:'light',
        handler:()=>{
          // Ação caso o usuário clique em cancelar
        }}]
    });
  alert.present();
    
  }
}