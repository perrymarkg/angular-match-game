import { Component } from '@angular/core';
import { ClickService } from '../services/click.service';
import { ConfigService } from '../services/config.service';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.html',
    styleUrls: ['./stat.css']
})
export class StatComponent {
    
    moves;
    score;

    constructor(private clickService: ClickService){
        this.clickService.moves.subscribe( data => {
            this.moves = data;
        })
       this.clickService.scoreEmitter.subscribe( data => {
            this.score = data;
       })
       this.score = '0 of ' + this.clickService.getScoreTotal() + ' found';
    }

}