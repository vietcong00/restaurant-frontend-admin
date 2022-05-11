<template>
    <div class="list-wrapper">
        <div class="row">
            <template v-for="team in state.teams" :key="team.id">
                <div class="col-xl-3 col-md-4 col-sm-6 col-12 mb-3">
                    <TeamCard :team="team" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { computed } from '@vue/runtime-core';
import { Options, setup, Vue } from 'vue-class-component';
import { teamModule } from '../store';
import TeamCard from './TeamCard.vue';

@Options({
    components: { TeamCard },
})
export default class UserGrid extends Vue {
    state = setup(() => {
        const teams = computed(() => teamModule.teams);

        return {
            teams,
        };
    });
}
</script>

<style scoped lang="scss">
.list-wrapper {
    padding: 20px 0;
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 -10px;
    @media only screen and (max-width: 991.98px) {
        margin: 0 5px;
    }
}
</style>
