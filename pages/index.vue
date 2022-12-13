<template>
  <div>
  <lead-header :title="`Let\'s get started!`"></lead-header>
  <!-- <Tutorial /> -->
  </div>
</template>

<script>
import LeadHeader from '~/components/LeadHeader.vue';
export default {
  components: { LeadHeader },
  name: 'IndexPage', 
  mounted(){
    this.dash();
  },
  methods:{
    async dash(){
      const res = await this.$axios.get('/ext/days')
      console.log('res', res)
    }
  }

}

</script>
