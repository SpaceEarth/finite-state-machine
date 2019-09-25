class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config === undefined) throw new Error();
        this.config = config; //?
        this.state = {
            state: config.initial,
            prev: null,
            next: null
        };
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state] !== undefined) {
            this.state = {
                state: state,
                prev: this.state,
                next: null
            };
            this.state.prev.next = this.state;
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        const newState = this.config.states[this.state.state].transitions[event];
        if (newState !== undefined) {
            this.state = {
                state: newState,
                prev: this.state,
                next: null
            };
            this.state.prev.next = this.state;
        } else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = {
            state: this.config.initial,
            prev: null,
            next: null
        };
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        const result = [];

        if (event === undefined) {
            return Object.keys(this.config.states);
        }
        
        for (let i of Object.keys(this.config.states)) {
            if (this.config.states[i].transitions.hasOwnProperty(event)) {
                result.push(i);
            }
        }
        
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.state.prev !== null) {
            this.state = this.state.prev;
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.state.next !== null) {
            this.state = this.state.next;
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = {
            state: this.config.initial,
            prev: null,
            next: null
        };
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
