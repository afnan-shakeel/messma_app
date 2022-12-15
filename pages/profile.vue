<template>
  <v-container>
    profile
<v-row align="center">
    <v-img 
      id="round-avatar"
      src="https://library.kissclipart.com/20190227/shw/kissclipart-patient-icon-png-clipart-computer-icons-ac058a2675899cf9.png"
      max-height="150"
      max-width="150"
      ></v-img>
</v-row>
  <v-row align="center">
      <v-col>
      <p>Name: {{"name"}}</p>
      <p>email: {{"xx@gmail.com"}}</p>
      <p>Mobile: {{"9999900000"}}</p>
      <p>Room: {{"D708"}}</p></v-col>
    </v-row>
    <v-row>

      <v-col justify="end">
        <p>Change Password <v-icon @click="updatePassword()">mdi-chevron-right</v-icon></p>
        <p>Logout <v-icon @click="logout()">mdi-chevron-right</v-icon></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TabComponent from '~/components/TabComponent.vue'
export default {
  components: { TabComponent },
  layout:'session',
  name:'profile',
  data(){
    return{

    }
  },
  methods:{
    updatePassword(){
      console.log('update password')
    },
    logout(){
            localStorage.clear()
            this.$router.push('/login')
            console.log('logged out')
        }
  }
}
</script>

<style>

#round-avatar {
  border-radius: 50%; 
  min-height: 150px;
  min-width: 150px;
}

</style>