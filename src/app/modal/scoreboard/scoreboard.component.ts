import { Component, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { DbService } from '../../services/db.service';

@Component({
    selector: 'app-modal-scoreboard',
    templateUrl: './scoreboard.html',
    styleUrls:['./scoreboard.css']
})
export class ScoreboardComponent {

    pieces: Array<number>;
    selectedPiece: number;

    @Output() closeEmitter = new EventEmitter<boolean>();

    constructor(private configService: ConfigService, private db: DbService){

    }

    ngOnInit(){
        this.pieces = this.configService.getAllowedPieces();
        this.selectedPiece = this.pieces[0];
        this.db.setScoreTable(this.selectedPiece);
    }

    setScoreTable(val){
        this.db.setScoreTable(val);
    }

    close(){
        this.closeEmitter.emit(true);
    }



}