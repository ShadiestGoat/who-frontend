<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { shouldContinueEvent, type AnyInputEvent } from "./store";

    export let content = ""
    export let colorClass: "success" | "danger" | "warning" | "info" | "c-dark"
    export let classes: string = ""
    export let href = ""
    export let fontSize:string = ""
    export let disable = false
    
    const dispatcher = createEventDispatcher<{click: void}>()

    function submit(e: AnyInputEvent) {
        if (!shouldContinueEvent(e)) {
            return
        }
        if (disable) {
            return
        }

        dispatcher('click')
    }

    $: usedClasses = classes + (disable ? " " + "disabled" : "")
</script>

{#if href}
    <a {href} class={colorClass + " " + usedClasses}>
        {#if $$slots.content}
            <slot name="content" />
        {:else}
            <p style={fontSize ? "font-size: " + fontSize : ""}>{content}</p>
        {/if}
    </a>
{:else}
    <button tabindex="0" on:click={submit} on:keypress={submit} class={colorClass + " " + usedClasses}>
        {#if $$slots.content}
            <slot name="content" />
        {:else}
            <p style={fontSize ? "font-size: " + fontSize : ""}>{content}</p>
        {/if}
    </button>
{/if}

<style lang="scss">
    a, button {
        padding: 2vh 1vw;
        border-radius: 10px;
        background-color: var(--c-dark);
        display: grid;
        align-items: center;
        align-content: center;
        cursor: pointer;
        transition: 0.7s all;
        outline: none;
        border: 0;

        p {
            color: var(--text);
        }

        &:hover:not(.disabled) {
            background-color: var(--c);
            border-radius: 18px;
            box-shadow: 0 0 15px 3px var(--c-dark);
        }
    }
    
    .disabled {
        cursor: not-allowed;
        filter: grayscale(0.75);
    }
</style>