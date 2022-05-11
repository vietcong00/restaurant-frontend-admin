<template>
    <div>
        <CreateTeamForm />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CreateTeamForm from '../components/CreateTeamForm.vue';

@Options({ components: { CreateTeamForm } })
export default class CreateTeamPage extends Vue {}
</script>
