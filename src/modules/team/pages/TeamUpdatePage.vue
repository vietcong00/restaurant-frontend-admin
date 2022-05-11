<template>
    <div>
        <UpdateTeamForm />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UpdateTeamForm from '../components/UpdateTeamForm.vue';
import { PageName } from '@/common/constants';

@Options({ components: { UpdateTeamForm } })
export default class UpdateTeamPage extends Vue {
    async created(): Promise<void> {
        if (!+this.$route.params.id) {
            this.$router.push({
                name: PageName.NOT_FOUND_PAGE,
            });
        }
    }
}
</script>
