import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { ConfigService } from '../services/config.service';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.html',
    styleUrls: ['./stat.css']
})
export class StatComponent implements OnInit {
    
    win: boolean = false;
    time: any;
    moves: number;
    score: string;

    constructor(private scoreService: ScoreService){
       
    }

    ngOnInit(){

        this.scoreService.scoreEmitter.subscribe( data => {
            this.score = data.score
            this.moves = data.moves
        })

        this.scoreService.timerEmitter.subscribe( t => {
            this.time = this.scoreService.convertTimeFormat(t);
        })
        
    }

}