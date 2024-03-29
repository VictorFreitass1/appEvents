
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { PostService } from 'src/serivces/post.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
eventos: any[] = [];
nome:string="";
 limite:number=15;
 inicial:number=0;
 idUsuario:number;

  constructor(private router: Router, 
    private apiService: PostService,
    private menuCtrl: MenuController,
    private actRoute: ActivatedRoute
    ) {
    let buscado =localStorage.getItem("eventosDb");
    if(buscado != null)
    this.eventos = JSON.parse(localStorage.getItem("eventosDb"));
  } 
   ionViewWillEnter(){
    this.menuCtrl.enable(false);
    this.carregar(); 
   }
  ngOnInit() {
    this.actRoute.params.subscribe((dadosdarota:any)=>{
      this.idUsuario = dadosdarota.idUsuario;
    })
}

  carregar(){
    return new Promise( ret => {
      this.eventos = [];
      let dados = {
        requisicao:"listar",
        id_usuario: this.idUsuario,
        limit:this.limite,
        start: this.inicial
      };
      this.apiService.dadosApi(dados,'eventos.php').subscribe(data =>{
        if(data['result']=='0'){
          //this.ionViewWillEnter();
        }
        else{
          for(let Evento of data['result']){
            this.eventos.push(Evento);
          }
        }
        ret(true);
      });
    });
  }
  addEvento(){
    this.router.navigate(["add-evento/"+this.idUsuario]);
  }
  editar(){
    this.router.navigate(['add-participantes/']);
  }

  registrarParticipante(evento : any){
    this.router.navigate(['participantes/'+evento.id+'/'+evento.nome+'/'+evento.data+'/'+evento.capacidade+'/'+evento.ativo]);
  }

  registraEvento(novo: any){
    let evento = {
    data: novo.data,
    nome :novo.nome, 
    capacidade : novo.capacidade, 
    participantes: 0, 
    ativo : false};
    this.eventos.push(evento);

  }

 updateEventos(){
    localStorage.setItem("eventosDb", JSON.stringify(this.eventos));
  }

}