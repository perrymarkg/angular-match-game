import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service';
import { ScoreService } from './services/score.service';
import { DbService } from './services/db.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  @ViewChild('nameSelector') nameSelector: ElementRef;
  @ViewChild('pieceSelector') pieceSelector: ElementRef

  selectedPiece: number = 0;
  pieces: Array<number>;
  playerName: string;
  showBackdrop: boolean = false;
  showWinModal: boolean = false;
  showScoreModal: boolean = false;

  matches:string;
  moves: string;
  time: string;

  constructor(
    private configService: ConfigService, 
    private scoreService: ScoreService, 
    private render: Renderer2, 
    private db: DbService
  ){
    
  }

  ngOnInit(){
    
    this.selectedPiece = 0;
    this.pieces = this.configService.getAllowedPieces();
    this.scoreService.scoreEmitter.subscribe( data => {
      if( data.endGame ){
        this.matches = data.score;
        this.moves = data.moves;
        this.time = this.scoreService.getTime();
        this.showBackdrop = true; 
        this.showWinModal = true;
      }
    })
    
  }

  setPiece(name: string, piece: number){
    
    piece = Number(piece);

    this.render.removeClass(this.nameSelector.nativeElement, 'invalid');
    this.render.removeClass(this.pieceSelector.nativeElement, 'invalid');
    
    if( name === '')
      this.render.addClass(this.nameSelector.nativeElement, 'invalid');
    
    if( piece === 0 )
      this.render.addClass(this.pieceSelector.nativeElement, 'invalid');

    if( piece !== 0 && name !== '' ){
      this.configService.setPieces(piece);
      this.scoreService.setPlayerName(this.playerName);
      this.selectedPiece = piece;
    }
    
  }

  showScoreBoard(){
    this.showBackdrop = true;
    this.showScoreModal = true;
  }

  closeScoreBoard(){
    this.showBackdrop = false;
    this.showScoreModal = false;
  }

  restart(){
    this.scoreService.restart();
    this.showBackdrop = false;
    this.showWinModal = false;
    this.selectedPiece = 0;
  }

  testBtn(){
    console.log(this.scoreService.getPlayerName());
  }
  



}
