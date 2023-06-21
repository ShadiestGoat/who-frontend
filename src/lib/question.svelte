<script lang="ts">
	import type { question } from "./store";
    import Btn from "./btn.svelte"
	import { createEventDispatcher } from "svelte";


    export let q:question

    /**
     * next: isCorrect
    */
    const dispatcher = createEventDispatcher<{next: boolean}>()

    let textValue = ""

    function tryAnswer(ans:string) {
        // TODO: if wrong
        if (ans == "wrong") {
            textValue = ""
            dispatcher("next", false)
            return
        }
        // logic
        dispatcher("next", true)
    }

</script>

<div class="col">
    <h1>{q.content}</h1>

    <div class="answer-wrapper">
        {#if q.isMultipleChoice}
            {#each q.answers ?? [] as a}
                <Btn colorClass="info" classes="btn" on:click={() => {
                    tryAnswer(a)
                }}>
                    <p slot="content" class="wrap-words">{a}</p>
                </Btn>
            {/each}
        {:else}
            <input bind:value={textValue} on:keydown={(e) => {
                if (e.key == "Enter") {
                    e.preventDefault()
                    e.stopPropagation()
                    
                    tryAnswer(e.currentTarget.value)
                }
            }} placeholder="Answer Here" type="text" class="info" />
        {/if}
    </div>
</div>

<style lang="scss">
    input {
        grid-row-start: 1;
        grid-row-end: 3;
        grid-column-start: 1;
        grid-column-end: 3;
        background: none;
        border: var(--c-dark) solid 4px;
        color: $text;
        padding: 1vh 2vw;
        border-radius: 12px;
        transition: 0.4s;
    }
    input:focus {
        box-shadow: 0 0 15px 3px var(--c);
    }
    
    p, input {
        font-size: 2rem;
    }

    .answer-wrapper {
        display: grid;
        grid-template: 1fr 1fr / 1fr 1fr;
        gap: 3vh 3vw;

        :global(.btn) {
            &:nth-child(3):nth-last-child(1) {
                grid-row: 2;
                grid-column-start: 1;
                grid-column-end: 3;
            }

            &:nth-child(1):nth-last-child(2), &:nth-child(2):nth-last-child(1) {
                grid-row: 2;
            }
        }
    }
    h1 {
        font-size: 5rem;
        margin: 13vh auto 20vh;
        text-align: center;
    }
    .col {
        align-items: center;
        padding: 0 4vw;
    }
</style>