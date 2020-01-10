<template>
    <div class="card-wrapper" :data-sort-index="sortIndex">
        <div class="card" :class="cardClass">
            <div class="value">{{value}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bubbleCard",
        props: {
            value: Number,
            sortIndex: Number,
            isActive: Boolean,
            isLocked: Boolean
        },
        data() {
            return {
            }
        },
        computed: {
            cardClass() {
                return {
                    'card-active': this.isActive,
                    'card-locked': this.isLocked
                }
            }
        }
    }
</script>

<style scoped>

</style>