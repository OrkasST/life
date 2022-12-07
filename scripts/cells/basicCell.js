export class Cell {
    constructor({ x = 0, y = 0, energy = 1, dna = { photosynthesis: 1, rotateRight: 1, rotateLeft: 1, duplicate: 1, eat: 1 }, direction = 1, color = '#0000FF' }) {
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.dna = dna;
        this.color = color;
        this.direction = direction;

        this.life = [];
        this.actions = ['photosynthesis', 'rotateRight', 'rotateLeft', 'duplicate', 'eat'];
        this._actionCost = { photosynthesis: 0, rotateRight: 1, rotateLeft: 1, duplicate: 8, eat: 0 };
        this._facingIndexes = [-1, -1, 0, -1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, -1, 0];
        this._probability = [];
        this._isFirstDecision = true;
    }

    photosynthesis() {
        this.energy += 1;
        this.life.push('photosynthesis');
        let red = Math.round((parseInt(this.color.substring(1, 3), 16) - 2)).toString(16).toUpperCase()
        red = red < 0 ? "00" : red;
        red = red.length === 1 ? "0" + red : red;
        let green = Math.round((parseInt(this.color.substring(2, 4), 16) + 2)).toString(16).toUpperCase();
        green = green < 0 ? "00" : green;
        green = green.length === 1 ? "0" + green : green;

        this.color = "#" + red + green + '00';
        return "photosynthesis";
    }

    rotateRight() {
        this.energy -= this._actionCost.rotateRight;
        this.direction += 1;
        this.direction = this.direction > 7 ? 0 : this.direction;
        this.life.push('rotateRight');
        return "rotateRight";
    }
    rotateLeft() {
        this.energy -= this._actionCost.rotateLeft;
        this.direction -= 1;
        this.direction = this.direction < 0 ? 0 : this.direction;
        this.life.push('rotateLeft');
        return "rotateLeft";
    }

    duplicate() {
        this.energy -= this._actionCost.duplicate;
        this.life.push('duplicate');
        let dna = { ...this.dna };
        this.life.forEach(el => dna[el]++);
        for (let i in this.dna) {
            if (this.dna.hasOwnProperty(i) && this.life.indexOf(i) < 0) dna[i] -= 0.1;
        }
        return dna;
    }

    eat() {
        this.energy += 3;
        this.life.push('eat');
        let red = Math.round((parseInt(this.color.substring(1, 3), 16) + 2)).toString(16).toUpperCase()
        red = red < 0 ? "00" : red;
        red = red.length === 1 ? "0" + red : red;
        let green = Math.round((parseInt(this.color.substring(2, 4), 16) - 2)).toString(16).toUpperCase();
        green = green < 0 ? "00" : green;
        green = green.length === 1 ? "0" + green : green;

        this.color = "#" + red + green + '00';
        return this._isFacingTo();
    }

    _isFacingTo() {
        let indx = this.direction * 2;
        return [this._facingIndexes[indx], this._facingIndexes[indx + 1]]
    }

    decide() {
        if (this._isFirstDecision) {
            for (let i in this.dna) {
                if (!this.dna.hasOwnProperty(i)) continue;
                for (let j = 0; j < this.dna[i] * 10; j++) this._probability.push(this.actions.indexOf(i));
            }
            this._isFirstDecision = false;
        }
        let indx = Math.floor(Math.random() * this._probability.length);
        let action = this.actions[this._probability[indx]];
        // return this.energy >= this._actionCost[action] ? this[action]() : null;
        return action;
    }

}

/*

direction:

    0 1 2
    7   3
    6 5 4

*/