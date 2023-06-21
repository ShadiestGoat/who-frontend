<script lang="ts">
	import Question from "../../../lib/question.svelte";
	import Section from "../../../lib/section.svelte";
	import type { question } from "../../../lib/store";

    let curQI = 0;

    $: questionThingy = allQuestions[curQI];

    let vignette = ""
    
    async function answerQuestion(isCorrect: boolean) {
        if (vignette) {
            if (isCorrect) {
                nextQuestion()
            }
            return
        }

        if (isCorrect) {
            vignette = "success"
            nextQuestion()
        } else {
            vignette = "danger"
        }

        setTimeout(() => {
            vignette = ""
        }, 700)
    }

    function nextQuestion() {
        curQI++
    }

    const allQuestions: ((1 | 2 | 3) | question)[] = [
        1,
        {
            id: "", 
            content: "What is my mother's maiden name??", 
            isMultipleChoice: true, 
            answers: ["Your Mother", "My Mother", "Your Father", "My Father (gone)"],
        },
        {
            id: "", 
            content: "Golly jee??", 
            isMultipleChoice: true, 
            answers: ["Your Mother", "My Mother", "Your Father"],
        },
        {
            id: "", 
            content: "Golly jee??", 
            isMultipleChoice: true, 
            answers: ["Your Mother", "My Mother"],
        },
        {
            id: "", 
            content: "Golly jee??", 
            isMultipleChoice: false,
        },
        2,
        {
            id: "", 
            content: "Golly jee Part 2??", 
            isMultipleChoice: false,
        },
    ]
</script>

<div class="vignette {vignette || "disable"}" />

{#if typeof questionThingy == "number"}
    <Section on:next={nextQuestion} section={questionThingy} />
{:else}
    <Question on:next={(m) => answerQuestion(m.detail)} on:wrong q={questionThingy} />
{/if}

<style lang="scss">
    .vignette {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: -1;
        transition: 0.5s ease-in;
        box-shadow: inset 0 0 40px 10px var(--c);

        &.disable {
            box-shadow: none;
        }
    }
</style>