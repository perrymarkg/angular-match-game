export class ConfigService {
    private gridArraySize: number = 0;
    private gridArray: Array<string> = [];
    private classes = Array('fa-android', 'fa-gratipay', 'fa-arrow-circle-o-right', 'fa-arrow-circle-o-left', 'fa-caret-square-o-left', 'fa-envelope-square', 'fa-stumbleupon', 'fa-taxi', 'fa-steam', 'fa-file-excel-o', 'fa-git', 'fa-paper-plane-o', 'fa-google-wallet', 'fa-copyright', 'fa-at', 'fa-forumbee', 'fa-user-secret');
    private allowedPieces: Array<number> = [6, 12, 18, 24]


    constructor(){}

    getGridArray(index:any = false):any{
        if( index !== false )
            return this.gridArray[index];
        else   
            return this.gridArray;
    }

    getGridArraySize(): number{
        return this.gridArraySize;
    }

    generateGridArray(): void{
        const gridArraySize = ( this.gridArraySize ) / 2;
        const array = Array(gridArraySize).fill(0).map((val,index) => this.classes[index]);
        this.gridArray = array.concat(array).sort(function(a, b){return 0.5 - Math.random()});
    }

    getAllowedPieces(): Array<number>{
        return this.allowedPieces;
    }

    setPieces(pieces: number): void{
        this.gridArraySize = pieces;
    }

    

}