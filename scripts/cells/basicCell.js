export class Cell {
    constructor({ x = 0, y = 0, energy = 2, dna = { photosynthesis: 1, rotateRight: 1, duplicate: 1, eat: 1 }, direction = 1, color = '#000000' }) {
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.dna = dna;
        this.color = color;
        this.direction = direction;
        this.childColor = color;

        this.life = {
            duration: 0,
            'photosynthesis': 0,
            'rotateRight': 0,
            'duplicate': 0,
            'eat': 0
        };
        this.actions = ['photosynthesis', 'rotateRight', 'duplicate', 'eat'];
        this._actionCost = { photosynthesis: 0, rotateRight: 1, duplicate: 8, eat: 0 };
        this._facingIndexes = [-1, -1, 0, -1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, -1, 0];
        this._probability = [];
        this._isFirstDecision = true;
    }

    photosynthesis() {
        this.energy += 1;
        this.life.photosynthesis++;
        // let red = Math.round((parseInt(this.color.substring(1, 3), 16) - 0)).toString(16).toUpperCase()
        // red = red < 0 ? "00" : red;
        // red = red.length === 1 ? "0" + red : red;
        // let green = Math.round((parseInt(this.color.substring(2, 4), 16) + 3)).toString(16).toUpperCase();
        // green = green < 0 ? "00" : green;
        // green = green.length === 1 ? "0" + green : green;

        // this.childColor = this.color.substring(0, 3) + green + this.color.substring(5);

        this.updateColor(-1, 3, -1);
        return "photosynthesis";
    }

    rotateRight() {
        this.energy -= this._actionCost.rotateRight;
        this.direction += 1;
        this.direction = this.direction > 7 ? 0 : this.direction;
        this.life.rotateRight++;

        // let blue = Math.round((parseInt(this.color.substring(5), 16) + 3)).toString(16).toUpperCase();
        // blue = blue < 0 ? "00" : blue;
        // blue = blue.length === 1 ? "0" + blue : blue;

        // this.childColor = this.color.substring(0, 5) + blue;

        this.updateColor(-1, -1, 3);

        return "rotateRight";
    }
    // rotateLeft() {
    //     this.energy -= this._actionCost.rotateLeft;
    //     this.direction -= 1;
    //     this.direction = this.direction < 0 ? 0 : this.direction;
    //     this.life.rotateLeft++;

    //     let blue = Math.round((parseInt(this.color.substring(5), 16) + 3)).toString(16).toUpperCase();
    //     blue = blue < 0 ? "00" : blue;
    //     blue = blue.length === 1 ? "0" + blue : blue;

    //     this.childColor = this.color.substring(0, 5) + blue;

    //     return "rotateLeft";
    // }

    duplicate() {
        this.energy -= this._actionCost.duplicate;
        this.life.duplicate++;
        let dna = { ...this.dna };
        // this.life.forEach(el => dna[el]++);

        for (let i in this.life) {
            if (this.life.hasOwnProperty(i) && dna.hasOwnProperty(i)) dna[i] += this.life[i] > 0 ? this.life[i] * 0.2 : -0.2;
        }
        dna[this.actions[Math.floor(Math.random() * this.actions.length)]] += Math.random() * 10 - 5; // random mutation
        return [dna, this.childColor];
    }

    eat() {
        this.energy += 4;
        this.life.eat++;
        // let red = Math.round((parseInt(this.color.substring(1, 3), 16) + 3)).toString(16).toUpperCase()
        // red = red < 0 ? "00" : red;
        // red = red.length === 1 ? "0" + red : red;
        // let green = Math.round((parseInt(this.color.substring(2, 4), 16) - 0)).toString(16).toUpperCase();
        // green = green < 0 ? "00" : green;
        // green = green.length === 1 ? "0" + green : green;
        // this.childColor = "#" + red + this.color.substring(3);

        this.updateColor(3, -1, -1);
        return "eat";
    }

    _isFacingTo(width, height) {
        let indx = this.direction * 2;
        let x = this.x + this._facingIndexes[indx];
        let y = this.y + this._facingIndexes[indx + 1];
        x = x < 0 ? 0 : x > width ? width : x;
        y = y < 0 ? 0 : y > height ? height : y;
        return [x, y];
    }

    decide() {
        if (this._isFirstDecision) {
            this.actions.forEach((el, i) => this._probability[i] = (this.dna[el] <= 0 ? 0 : this.dna[el]) * 10 + (this._probability[i - 1] || 0));
            this._isFirstDecision = false;
        }
        let indx = Math.random() * this._probability[this._probability.length - 1];
        indx = indx === 0 ? indx + 1 : indx;
        for (let i = 0; i < this._probability.length; i++) {
            if (indx <= this._probability[i]) {
                return this.actions[i];
            }
        }
    }

    updateColor(r, g, b) {
        let red = Math.round(parseInt(this.childColor.substring(1, 3), 16) + r);
        let green = Math.round(parseInt(this.childColor.substring(2, 4), 16) + g);
        let blue = Math.round(parseInt(this.childColor.substring(5), 16) + b);

        red = this.checkColor(red).toString(16).toUpperCase();
        green = this.checkColor(green).toString(16).toUpperCase();
        blue = this.checkColor(blue).toString(16).toUpperCase();

        red = red.length === 1 ? "0" + red : red;
        green = green.length === 1 ? "0" + green : green;
        blue = blue.length === 1 ? "0" + blue : blue;

        this.childColor = `#${red}${green}${blue}`;
    }
    checkColor(color) {
        return color <= 0 ? "00" : color >= 255 ? "FF" : color;
    }

}


/*

direction:

    0 1 2
    7   3
    6 5 4

*/