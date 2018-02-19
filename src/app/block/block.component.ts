import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ScoreService } from '../services/score.service';


@Component({
    selector: 'app-block',
    templateUrl: './block.html',
    styleUrls: ['./block-component.css']
})
export class BlockComponent implements OnInit {
    
    gridArray;

    constructor(
        private configService: ConfigService,
        private scoreService: ScoreService
    ){
        
    }

    ngOnInit(){
        this.configService.generateGridArray();
        this.scoreService.setScoreTotal();
        this.gridArray = this.configService.getGridArray(false);        
    }


   


}