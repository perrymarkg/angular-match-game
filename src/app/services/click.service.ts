import { Injectable, Renderer2, RendererFactory2, EventEmitter } from "@angular/core";
import { ConfigService } from "./config.service";


@Injectable()
export class ClickService {
    
    resetLink = new EventEmitter<any>();
    matchFound = new EventEmitter<any>();
    moves = new EventEmitter<number>();
    scoreEmitter = new EventEmitter<string>();

    private score: number = 0;
    private scoreTotal: number = 0;
    private clickTotal: number = 0;
    private click: number = 0;
    private block1;
    private block2;
    

    constructor(private configService: ConfigService, private renderFactory: RendererFactory2){
       this.scoreTotal = (this.configService.getGridArray().length/2)
    }

    setSelectedBlocks(index){
        
        if( this.click >= 2 ){
            this.click = 0;
            this.block1 = '';
            this.block2 = '';
        }
        switch( this.click ){
            case 1:
                this.block2 = index
                break;
            default:
                this.block1 = index;
                break;
        }

        if( this.click === 1 ){
            if( this.configService.getGridArray(this.block1) === this.configService.getGridArray(this.block2) ) {
                this.matchFound.emit({'index1': this.block1, 'index2': this.block2});
                this.score++
                this.scoreEmitter.emit(this.score + ' of ' + this.getScoreTotal() + ' found');
            }
        }
        this.clickTotal++
        this.moves.emit(this.clickTotal);
        
        this.click++;
    }

    toggleReset(){
        this.resetLink.emit('reset');
    }

    getScoreTotal(){
        return this.scoreTotal;
    }

    getClick(){
        return this.click;
    }

    getMoves(){
        return this.moves;
    }

    

}