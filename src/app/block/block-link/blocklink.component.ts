import { Component, OnInit, OnDestroy, Input, Renderer2 } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ScoreService } from '../../services/score.service';

@Component({
    selector: 'app-block-link',
    templateUrl: './blocklink.html',
    styleUrls:['./blocklink.css']
})
export class BlockLinkComponent implements OnInit {

    classes: Array<string> = ['fa', 'fa-circle'];
    classString: string;
    @Input() index: number;

    constructor(private configService: ConfigService, private scoreService: ScoreService){
        
    }

    ngOnInit(){
        this.scoreService.resetEmitter.subscribe( data => {
            if( this.classes.includes('active') ) {
                this.resetClass();
            }
        })
        this.scoreService.matchFoundEmitter.subscribe( data => {
            if( this.index === data.index1 || this.index === data.index2 ){
                this.setMatched();
            }
        })
        this.setClassString();
    }

    

    setClassString(){
        this.classString = this.classes.toString().replace(new RegExp(',', 'g'), ' ');
    }

    resetClass(){
        this.classes = ['fa', 'fa-circle'];
        this.setClassString();
    }

    setMatched(){
        this.removeClass('active');
        this.classes.push('matched');
        this.setClassString();
    }

    removeClass(className){
        const index = this.classes.indexOf(className);
        this.classes.splice(index, 1);
    }

    showHideIcon(){
       
        if( this.classes.includes('matched') || this.classes.includes('active') )
            return;
        
        if( this.scoreService.getClick() >= 2 ){
            this.scoreService.toggleReset();
        }

        this.removeClass('fa-circle');
        this.classes.push('active', this.configService.getGridArray(this.index))
        
        this.setClassString();
        this.scoreService.setSelectedBlocks(this.index)
    }


}