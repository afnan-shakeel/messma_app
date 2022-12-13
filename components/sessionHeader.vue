<template>
  <v-container>
    <!-- <v-icon @click="goBack()">mdi-chevron-left</v-icon> -->
    <!-- <v-row justify='end'>
    <v-btn icon>
        <v-icon @click="this.dotDrawer === true">mdi-dots-vertical</v-icon>
      </v-btn>
    </v-row>
     -->
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            dotDrawer: false,
        }
    },
    methods:{
        goBack(){
            console.log('current route',this.$router.currentRoute,this.$router.currentRoute.name == "dashboard")
            // this.$router.go(-1)
        }
    }

}
</script>

<style>

</style>