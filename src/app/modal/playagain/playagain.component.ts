import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal-playagain',
    templateUrl: './playagain.html',
    styleUrls:['./playagain.css']
})
export class PlayAgainComponent {

    @Input() time;
    @Input() moves;
    @Input() matches: string;
    
    @Output() playAgainEmitter = new EventEmitter<boolean>()

    playAgain(){
        this.playAgainEmitter.emit(true);
    }

}