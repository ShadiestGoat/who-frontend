<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Btn from "./btn.svelte";

    export let section: 1 | 2 | 3
    /**
     * Only used for section 3
    */
    export let title = ""

    let amt = ""
    
    switch (section) {
        case 1:
            title = "Authentication"
            amt = "I"
            break
        case 2:
            title = "Connecting the dots"
            amt = "II"
            break
        case 3:
            amt = "III"
            break
    }

    export function tryNext() {
        dispatcher("next")
    }

    const dispatcher = createEventDispatcher<{next: void}>()

    function keyNext(e: KeyboardEvent) {
        if (![" ", "ArrowRight", "Enter"].includes(e.key)) {
            return
        }
        e.preventDefault()
        tryNext()
    }
</script>

<svelte:window on:keydown={keyNext} />

<div class="col">
    <h1>Section <span>{amt}</span></h1>
    <h2>{title}</h2>
    
    <Btn on:click={tryNext} content="Next" colorClass="info" fontSize="2rem" classes="btn" />
</div>

<style lang="scss">
    span {
        font-family: serif;
    }
    
    .col {
        align-items: center;
        padding: 0 4vw;
        
        :global(.btn) {
            padding: 3vh 3vw;    
        }
    }

    h1 {
        font-size: 7rem;
        margin: 13vh auto 0;
    }

    h2 {
        font-size: 3.5rem;
        margin-top: 2vh;
        margin-bottom: 19vh;
    }
</style>