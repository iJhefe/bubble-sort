<template>

    <section class="start">

        <form @submit="reset($event)" class="opts" @keydown.enter="reset">

            <div class="group">
                <label>Quantidade [ max: 20 ]</label>
                <input type="number" v-model="items_count">
            </div>
            <div class="group">
                <label>Velocidade</label>
                <input type="number" v-model="delay">
            </div>
            <select name="method" v-model="method">
                <option value="1">BubbleSort - 1</option>
                <option value="2">BubbleSort - 2</option>
                <option value="3">BubbleSort - 3</option>
            </select>

        </form>

        <div class="cards">
            <bubble-card
                    v-for="(card, index) in this.$store.state.cards"
                    :key="index"
                    :sort-index="card.sortIndex"
                    :value="card.value"
                    :is-active="card.isActive"
                    :is-locked="card.isLocked"
            />
        </div>
        <div class="subtitles">
            <div class="subtitle subtitle-red"></div> <span>Não trocado</span>
            <div class="subtitle subtitle-green"></div> <span>Trocando</span>
            <div class="subtitle subtitle-blue"></div> <span>Trocado</span>
        </div>
        <div class="control-panel">
            <h5>Passagens: <span style="font-size: 20px">{{steps}}</span></h5>
            <div class="vetores">
                <div class="vetor">
                    | <span v-for="(curVetor, i) in vetor.inicial" :key="i">{{curVetor + ' | '}}</span>
                </div>
                <div class="vetor">
                   | <span v-for="(curVetor, i) in vetor.final" :key="i">{{curVetor + ' | '}}</span>
                </div>
            </div>
            <button v-if="this.$store.state.done" @click="reset">
                O
            </button>
        </div>

    </section>
    
</template>

<script>
    import bubbleCard from "@/components/bubbleCard";

    export default {
        name: "Inicio",
        components: {
            bubbleCard
        },
        data() {
            return {
                items_count: 10,
                delay: 10,
                method: 1,
                steps: 0,
                decimal_base: 10,
                vetor: {
                    inicial: [],
                    final: []
                }
            }
        },
        methods: {
            reset() {

                this.steps = 0

                if (typeof arguments[0] !== "undefined")
                    arguments[0].preventDefault()

                let pool = this.generateArray(0, this.items_count)

                // Randomizar a ordem
                let values = [];

                while (pool.length > 0)
                {
                    let index = Math.floor(Math.random() * pool.length);

                    values.push(pool[index] + 1);

                    pool.splice(index, 1);
                }

                values = [10, 9, 8, 7, 6, 1, 2, 3, 4, 5];

                this.vetor.inicial = values.slice();

                this.$store.commit({ type: 'reset', values: values });

                this.method = parseInt(this.method)

                // ordenação é feita insta, mas o evento é tem o efeito lentamente

                let sequence

                switch (this.method) {

                    case 1:
                        sequence = this.bubbleSortDefault(values.slice())
                        break;
                    case 2:
                        sequence = this.bubbleSort(values.slice());
                        break;
                    case 3:
                        sequence = this.bubbleSortPlus(values.slice());
                        break;

                }



                sequence.forEach((event, index) => {
                    setTimeout(() => { this.$store.commit(event); }, index * this.delay);
                });
            },
            bubbleSortDefault(values)
            {

                let sequence = [],
                    indexLastUnsorted = values.length - 1

                for (let i = 0; i < values.length; i++)
                {

                    for (let j = 0; j < values.length; j++)
                    {

                        sequence.push({ type: 'activate', indexes: [j, j + 1] });

                        this.steps++

                        if (values[j] > values[j + 1])
                        {
                            let aux = values[j]

                            values[j] = values[j + 1]
                            values[j + 1] = aux

                            console.log(`Passando: ${aux} para [${j + 1}] e ${values[j]} para [${j}]`)

                            sequence.push({ type: 'swap', indexes: [j, j + 1] });
                        }

                        sequence.push({ type: 'deactivate', indexes: [j, j + 1] });
                    }
                    sequence.push({ type: 'lock', indexes: [indexLastUnsorted] });

                }

                this.vetor.final = values

                let skipped = this.generateArray(0, indexLastUnsorted)

                sequence.push({ type: 'lock', indexes: skipped });
                sequence.push({ type: 'done' });

                return sequence;
            },
            bubbleSort(values) {
                let sequence = [];
                let swapped;
                let indexLastUnsorted = values.length - 1;

                do {
                    swapped = false;
                    for (let i = 0; i < indexLastUnsorted; i++) {

                        sequence.push({ type: 'activate', indexes: [i, i + 1] });

                        this.steps++;

                        if (values[i] > values[i + 1]) {
                            let temp = values[i];
                            values[i] = values[i + 1];
                            values[i + 1] = temp;

                            swapped = true;
                            sequence.push({ type: 'swap', indexes: [i, i + 1] });
                        }
                        sequence.push({ type: 'deactivate', indexes: [i, i + 1] });
                    }

                    console.log(`Last index: ${indexLastUnsorted}`)

                    sequence.push({ type: 'lock', indexes: [indexLastUnsorted] });

                    indexLastUnsorted--;

                } while (swapped);

                this.vetor.final = values

                let skipped = this.generateArray(0, indexLastUnsorted + 1)

                sequence.push({ type: 'lock', indexes: skipped });
                sequence.push({ type: 'done' });

                return sequence;
            },
            bubbleSortPlus(values)
            {

                let trocando = true,
                    size = values.length,
                    sequence = [],
                    indexLastUnsorted = size - 1

                for (let i = size; i > 0 && trocando; i--) {

                    trocando = false

                    // Sempre até o penultimo para evitar comparações fora do vetor

                    for (let j = 0; j < i - 1; j++) {

                        this.steps++

                        sequence.push({ type: 'activate', indexes: [j, j + 1] });

                        if (values[j] > values[j + 1]) {
                            let temp = values[j]

                            values[j] = values[j + 1]
                            values[j + 1] = temp

                            trocando = true

                            sequence.push({type: 'swap', indexes: [j, j + 1]});

                            // Tire o comentário abaixo para mostrar os this.steps
                            console.log(`Passando: ${temp} para [${j + 1}] e ${values[j]} para [${j}]`)

                        } else break;

                        sequence.push({type: 'deactivate', indexes: [j, j + 1]});
                    }

                    this.vetor.final = values

                    //console.log(`Lockando: ${indexLastUnsorted}`)
                    sequence.push({ type: 'lock', indexes: [indexLastUnsorted] });

                    indexLastUnsorted--

                }

                let skipped = this.generateArray(0, indexLastUnsorted)

                sequence.push({ type: 'lock', indexes: skipped });
                sequence.push({ type: 'done' });

                return sequence;

            },
            generateArray(from, to)
            {
                let arr = []
                for (let i = from; i < to; i++)
                {
                    arr.push(i)
                }

                return arr
            }
        }
    }
</script>

<style scoped lang="scss">

    form {
        display: flex;
        & input, select, option {
            padding: 5px 10px;
            border: 2px solid #c2255c;
            margin: 0 10px;
            color: white;
            background: none;
            font-family: Tahoma;

            &:focus {
                outline: none;
                box-shadow: 1px 2px 4px #ff3179;
                transition: .4s all;
            }
        }

        & .group {
            display: flex;
            flex-direction: column;

            & label {
                position: relative;
                left: 10px;
                margin-bottom: 5px;
            }
        }
    }

    .subtitles {

        display: flex;
        margin-top: 40px;

        & span {
            position: relative;
            top: 5px;
        }

        & .subtitle {
            position: relative;
            margin: 5px 10px 0;
            width: 16px;
            height: 16px;
            border: 2px solid #c2255c;
            box-shadow: 0 0 4px #c2255c;

            &-blue {
                filter: hue-rotate(280deg);
            }
            &-green {
                filter: hue-rotate(200deg)
            }

        }

    }

</style>