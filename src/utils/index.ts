import { MatrixOptions } from "../Matrix";

const getRandChar = (chars: string): string => chars.split('')[Math.floor(Math.random() * chars.length)];

const getColumnPositions = (width: number, fontSize: number): number[] => {
    const availableColumnPositions = [];
    for (let i = 0; i < (width / fontSize); i++) {
        availableColumnPositions[i] = i - 0.01;
    }
    return availableColumnPositions;
}

class Letter {
    context: CanvasRenderingContext2D;
    char: string;
    x: number;
    y: number;
    options: MatrixOptions;
    hiddenOdds: number;
    fadedOdds: number;

    constructor(canvas: HTMLCanvasElement, position: number, y: number, options: MatrixOptions) {
        this.context = canvas.getContext('2d')!
        this.char = getRandChar(options.chars);
        this.x = position
        this.y = y * options.fontSize;
        this.options = options;
        this.hiddenOdds = Math.floor(Math.random() * 100) / 100
        this.fadedOdds = Math.floor(Math.random() * 100) / 100
    }

    draw() {
        const newCharChance = Math.floor(Math.random() * 100)
        if (newCharChance < this.options.charChangeRate) this.char = getRandChar(this.options.chars);

        const newOpacityChance = Math.floor(Math.random() * 100)
        if (newOpacityChance < this.options.opacityChangeRate) {
            this.hiddenOdds = Math.floor(Math.random() * 100) / 100
            this.fadedOdds = Math.floor(Math.random() * 100) / 100
        }

        this.context.globalAlpha = this.hiddenOdds < (this.options.hiddenPercentage / 100) ? 0 :
            this.fadedOdds < (this.options.fadedPercentage / 100) ? 0.5 : 1;
        this.context.fillText(this.char, this.x, this.y)
        this.context.globalAlpha = 1;
    }
}

class Column {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    options: MatrixOptions
    completed: boolean
    reused: boolean
    height: number
    position: number
    y: number
    letters: Letter[]
    cleared: boolean
    constructor(canvas: HTMLCanvasElement, options: MatrixOptions, position: number) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!
        this.options = options
        this.completed = false
        this.reused = false
        this.cleared = false
        this.y = 0
        this.letters = []
        this.height = canvas.height
        this.position = position
        this.draw.bind(this)
    }

    draw() {
        this.context.fillStyle = this.options.colors.primary
        if (this.completed) {
            this.empty()
        } else {
            this.fill()
        }
    }

    empty() {
        this.letters.shift()
        if (this.letters.length === 0) this.cleared = true;
        this.letters.forEach(letter => letter.draw())
    }

    fill() {
        this.context.fillStyle = this.options.colors.flashed
        this.context.fillText(getRandChar(this.options.chars), this.position * this.options.fontSize, this.y + this.options.fontSize)
        this.context.fillStyle = this.options.colors.primary
        this.letters.push(new Letter(this.canvas, (this.position * this.options.fontSize), this.letters.length, this.options))
        this.letters.forEach(letter => letter.draw())
        this.y += this.options.fontSize
        if (this.y > this.height) {
            this.completed = true
            this.y = 0;
            this.letters.shift()
        }
    }
}

export default class MatrixState {
    options: MatrixOptions;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    ratio: number;
    loop: number | undefined;
    ending: boolean;
    previousIteration: number;
    currentIteration: number;
    availableColumnPositions: number[];
    activeColumns: Column[];

    constructor(options: MatrixOptions, canvas: HTMLCanvasElement, ratio: number) {
        this.options = options;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.ratio = ratio;
        this.ending = false;
        this.previousIteration = 0;
        this.currentIteration = 0;
        this.availableColumnPositions = getColumnPositions(this.canvas.width, this.options.fontSize);
        this.activeColumns = [];
        this.run = this.run.bind(this)
        this.stop = this.stop.bind(this)
        this.disable = this.disable.bind(this)
    }

    clear() {
        if (this.loop) window.cancelAnimationFrame(this.loop)
        this.ctx.fillStyle = this.options.colors.background
        this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    disable() {
        this.ending = true;
    }

    generateColumn() {
        const dropOdds = Math.floor(Math.random() * 100) / 100
        if (dropOdds >= (this.options.dropPercentage / 100)) return
        const newPosition = this.availableColumnPositions.splice(Math.floor(Math.random() * this.availableColumnPositions.length), 1)[0]
        if (newPosition) {
            this.activeColumns.push(
                new Column(this.canvas, this.options, newPosition)
            )
        }
    }

    generateRain() {
        if (this.ratio <= 1) {
            const noColumnChance = Math.floor(Math.random() * 100) / 100
            if (noColumnChance < this.ratio) this.generateColumn()
        } else {
            this.generateColumn()
        }

        const extraColumnChance = Math.floor(Math.random() * 100) / 100
        let canvasRatio = this.ratio
        while (extraColumnChance < canvasRatio--) {
            this.generateColumn()
        }
    }

    render(time?: number) {
        if (time) {
            this.currentIteration = Math.floor(time * this.options.animationSpeed / 1000)
            if (this.previousIteration === this.currentIteration) return
            this.previousIteration = this.currentIteration
            this.clear()
        }

        if (!this.ending) this.generateRain()

        while (this.activeColumns[0]?.cleared) {
            this.activeColumns.shift()
        }

        this.activeColumns.forEach(column => {
            column.draw()
            if (column.completed && !column.reused) {
                column.reused = true;
                this.availableColumnPositions.push(column.position)
            }
        })
    }

    
    run(time?: number) {
        if (!this.ending || this.activeColumns.length > 0) {
            this.render(time)
            this.loop = window.requestAnimationFrame(this.run)
        } else {
            this.ending = false;
        }
    }

    stop() {
        this.clear()
        this.activeColumns = []
        this.availableColumnPositions = getColumnPositions(this.canvas.width, this.options.fontSize)
        this.ending = false;
        this.previousIteration = 0;
        this.currentIteration = 0;
    }
}
