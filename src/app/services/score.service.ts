import { Injectable, EventEmitter } from "@angular/core";
import { ConfigService } from "./config.service";
import { Observable } from 'rxjs'
import { DbService } from "./db.service";


@Injectable()
export class ScoreService {
    
    timerEmitter = new EventEmitter<number>();
    restartEmitter = new EventEmitter<any>();
    resetEmitter = new EventEmitter<boolean>();
    matchFoundEmitter = new EventEmitter<any>();
    scoreEmitter = new EventEmitter<{"score": string, "moves": number, "endGame":boolean}>();

    private playerName: string = '';
    private score: number = 0;
    private scoreTotal: number = 0;
    private clickTotal: number = 0;
    private click: number = 0;
    private block1;
    private block2;
    private time: number = 0;


    private timer: Observable<number> = Observable.timer(1,1000);
    
    private subscription;

    constructor(private configService: ConfigService, private db: DbService){
      
    }

    setSelectedBlocks(index):void{
        
        let scoreData = {"score": this.score + ' of ' + this.getScoreTotal() + ' found', "moves": 0, 'endGame':false};

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
                this.score++;
                this.matchFoundEmitter.emit({"index1": this.block1, 'index2': this.block2});
                scoreData.score = this.score + ' of ' + this.getScoreTotal() + ' found'
            }
        }
        
        this.clickTotal++;
        scoreData.moves = this.clickTotal;
        if( this.clickTotal == 1){
            this.startTimer();
        }
        
        this.click++;

        if( this.score === this.getScoreTotal() ){
            scoreData.endGame = true;
            this.db.addScore(this.playerName, this.clickTotal, this.time, this.configService.getGridArraySize());
            this.destroySubscription();
        }

        this.scoreEmitter.emit(scoreData);
            
    }

    restart():void{
        this.score = 0;
        this.scoreTotal = 0;
        this.clickTotal = 0;
        this.block1 = '';
        this.block2 = '';
        this.click = 0;
        this.time = 0;
        this.restartEmitter.emit(true);        
    }

    private startTimer():void{
        this.subscription = this.timer.subscribe( t => {
            this.time = t;
            this.timerEmitter.emit(this.time);
        })
    }

    private destroySubscription() :void{
        this.subscription.unsubscribe();
    }

    convertTimeFormat(num): string {
        var hrs  = Math.floor(num/3600);
        var mins = Math.floor((num % 3600)/60);
        var secs = num % 60;
        return (hrs + ":" ) + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
    };

    getTime(): string{
        return this.convertTimeFormat(this.time);
    }

    toggleReset(): void{
        this.resetEmitter.emit(true);
    }

    setScoreTotal(): void{
        this.scoreTotal = (this.configService.getGridArray().length/2)
    }

    getScoreTotal(): number{
        return this.scoreTotal;
    }

    getClick(): number{
        return this.click;
    }

    setPlayerName(name: string): void{
        this.playerName = name;
    }

    getPlayerName(): string {
        return this.playerName;
    }

}