import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ClickService } from '../../services/click.service';
import { race } from 'q';

@Component({
    selector: 'app-block-link',
    templateUrl: './blocklink.html',
    styleUrls:['./blocklink.css']
})
export class BlockLinkComponent implements OnInit {

    classes: Array<string> = ['fa', 'fa-circle'];
    classString: string;
    @Input() index: number;

    constructor(private configService: ConfigService, private clickService: ClickService){
        this.clickService.resetLink.subscribe( data => {
            if( this.classes.includes('active') ) {
                this.resetClass();
            }
        })
        this.clickService.matchFound.subscribe( data => {
            if( this.index === data.index1 || this.index === data.index2 ){
                this.setMatched();
            }
        })
        this.setClassString();
    }

    ngOnInit(){
        
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

       
        if( this.classes.includes('matched') )
            return;
        
        if( this.clickService.getClick() >= 2 ){
            this.clickService.toggleReset();
        }

        this.removeClass('fa-circle');
        this.classes.push('active', this.configService.getGridArray(this.index))
        
        this.setClassString();
        this.clickService.setSelectedBlocks(this.index)
    }


}