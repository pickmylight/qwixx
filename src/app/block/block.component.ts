import { Component, OnInit } from '@angular/core';
import { Game, Multiplier, Result, NumberItem } from '../models/block';

@Component({
    selector: 'app-block',
    templateUrl: './block.component.html',
    styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
    public game: Game;
    public multiplier: Array<Multiplier>;
    public result: Result;

    constructor() {
        this.game = {
            rows: [
                {
                    numbers: [...Array(11).keys()].map(entry => { return { number: entry+2, locked: false } }),
                    lock: false,
                    color: "red"
                },
                {
                    numbers: [...Array(11).keys()].map(entry => { return { number: entry+2, locked: false } }),
                    lock: false,
                    color: "yellow"
                },
                {
                    numbers: [...Array(11).keys()].map(entry => { return { number: 12-entry, locked: false } }),
                    lock: false,
                    color: "green"
                },
                {
                    numbers: [...Array(11).keys()].map(entry => { return { number: 12-entry, locked: false } }),
                    lock: false,
                    color: "blue"
                }
            ],
            faults: [false, false, false, false, false],
        };
        this.multiplier = [
            { times: 1, points: 1 },
            { times: 2, points: 3 },
            { times: 3, points: 6 },
            { times: 4, points: 10 },
            { times: 5, points: 15 },
            { times: 6, points: 21 },
            { times: 7, points: 28 },
            { times: 8, points: 38 },
            { times: 9, points: 45 },
            { times: 10, points: 55 },
            { times: 11, points: 66 },
            { times: 12, points: 78 },
        ];
        this.result = {red: undefined, yellow: undefined, blue: undefined, green: undefined, fault:undefined, result:this.check_result()};
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }

    tick(color: string, number: number): void {
        const isEmpty = (n:NumberItem) => n.locked == false;
        this.game.rows.forEach((row, i) => {
            if (row.color === color) {
                if (row.lock === false) {
                    row.numbers.forEach((n, j) => {
                        if (n.number == number && row.numbers.slice(j).every(isEmpty)) {
                            this.game.rows[i].numbers[j].locked = true;
                        }
                    })
                }
            }
        })
    }
    lock (color:string): void {
        console.log(color);
        this.game.rows.forEach((row,i) => {
            if (row.color===color) {
                this.game.rows[i].lock = true;
            }
        })
    }
    
    add_fault(item:number):void {
        this.game.faults[item] = true;
    }

    fault_state(item:number): string {
        if (this.game.faults[item]==true) {
            return "btn-secondary";
        } else {
            return "btn-outline-secondary";
        }
    }

    button_color(color: string, locked: boolean): string {
        if (locked === true) {
            return "btn-q" + color;
        } else {
            return "btn-outline-q" + color;
        }
    }
    check_result(): number | undefined {
        try {
            return this.result.blue+this.result.green + this.result.red + this.result.yellow - this.result.fault;
        } catch (error) {
            return undefined;
        }
    }
    reset(): void {
        this.game = {
            rows: [
                {
                    numbers: [...Array(11).keys()].map(entry => { return { number: entry+2, locked: false } }),
                    lock: false,
                    color: "red"
                },
                {
                    numbers: [...Array(11).keys()].map(entry => { return { number: entry+2, locked: false } }),
                    lock: false,
                    color: "yellow"
                },
                {
                    numbers: [...Array(11).keys()].map(entry => { return { number: 12-entry, locked: false } }),
                    lock: false,
                    color: "green"
                },
                {
                    numbers: [...Array(11).keys()].map(entry => { return { number: 12-entry, locked: false } }),
                    lock: false,
                    color: "blue"
                }
            ],
            faults: [false, false, false, false, false],
        };
        this.multiplier = [
            { times: 1, points: 1 },
            { times: 2, points: 3 },
            { times: 3, points: 6 },
            { times: 4, points: 10 },
            { times: 5, points: 15 },
            { times: 6, points: 21 },
            { times: 7, points: 28 },
            { times: 8, points: 38 },
            { times: 9, points: 45 },
            { times: 10, points: 55 },
            { times: 11, points: 66 },
            { times: 12, points: 78 },
        ];
        this.result = {red: undefined, yellow: undefined, blue: undefined, green: undefined, fault:undefined, result:this.check_result()};
    }

    row_lock_color(locked: boolean): string {
        if (locked === true) {
            return "bi-lock-fill";
        } else {
            return "bi-unlock-fill";
        }
    }
}
