import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        values: [], // the actual list of numbers being sorted
        cards: [], // visual representations (moved around via CSS)
        done: true
    },
    mutations: {
        reset (state, payload) {
            state.values = payload.values;

            state.cards = [];
            for (let i = 1; i <= state.values.length; i++) {
                state.cards.push({
                    value: i,
                    sortIndex: state.values.indexOf(i),
                    isActive: false,
                    isLocked: false
                });
            }

            state.done = false;
        },

        swap (state, payload) {
            let a = payload.indexes[0];
            let b = payload.indexes[1];
            let temp = state.values[a];
            state.values[a] = state.values[b];
            state.values[b] = temp;

            // tell each card what its new order is
            state.cards.forEach((card) => {
                card.sortIndex = state.values.indexOf(card.value);
            });
        },

        activate (state, payload) {
            payload.indexes.forEach((index) => {
                let card = state.cards.find((card) => { return card.sortIndex === index; });
                card.isActive = true;
            });
        },

        deactivate (state, payload) {
            payload.indexes.forEach((index) => {
                let card = state.cards.find((card) => { return card.sortIndex === index; });
                card.isActive = false;
            });
        },

        lock (state, payload) {
            payload.indexes.forEach((index) => {
                let card = state.cards.find( (card) => {
                    return card.sortIndex === index;
                });
                card.isLocked = true;
            });
        },

        done (state) {
            state.done = true;
        }
    },
})

export default store