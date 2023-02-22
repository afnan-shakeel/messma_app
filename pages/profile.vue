<template>
  <v-container id="container" >
  <v-container v-if="userInfo.mobile && userInfo.email">
    <v-col align="center">
    <v-img 
    id="round-avatar"
    src="https://library.kissclipart.com/20190227/shw/kissclipart-patient-icon-png-clipart-computer-icons-ac058a2675899cf9.png"
    height="120"
    width="120"
    ></v-img>
    </v-col>
      <v-simple-table width="100%">
        <tbody>
          <tr><th>Name:</th>
            <td>{{this.userInfo.name}}</td></tr>
          <tr><th>Email:</th>
            <td>{{this.userInfo.email}}</td></tr>
          <tr><th>Mobile:</th>
            <td>{{this.userInfo.mobile}}</td></tr>
          <tr><th>Room:</th>
            <td>{{this.userInfo.room}}</td></tr>
            <!-- <tr></tr> -->
          <tr><th align="left">Change Password:</th>
            <td align="right"><v-icon @click="updatePasscode=!updatePasscode">mdi-chevron-right</v-icon></td></tr>
          <tr><th align="left">Logout:</th>
            <td align="right"><v-icon @click="logout()">mdi-chevron-right</v-icon></td></tr>
        </tbody>
      </v-simple-table>
    </v-container>
      <v-card dark v-if="updatePasscode">
        <reset-passcode v-if="userInfo.mobile && userInfo.email" v-bind:userInfo="userInfo"></reset-passcode>
      </v-card>
  </v-container>
</template>

<script>
import ResetPasscode from '~/components/reset-passcode.vue'
import TabComponent from '~/components/TabComponent.vue'
export default {
  components: { TabComponent, ResetPasscode },
  layout:'session',
  name:'profile',
  data(){
    return{
      userInfo:{
        name:null,
        email:null,
        mobile:null,
        room: null
      },
      updatePasscode: false,
    }
  },
  mounted(){
    this.getUserDetails();
  },
  methods:{
    async getUserDetails(){
      const res = await this.$axios.get('/auth/profile',{
                headers:{
                    Authorization: this.$storage.getUniversal('token')
                }
            })
      console.log('profile res', res)
      if(res.data.message!=='Success'){
        this.$toasted.error(`failed to fetch user details`)
        return;
      }
      this.userInfo.mobile = res.data.data.mobile
      this.userInfo.email = res.data.data.email
      this.userInfo.name = res.data.data.name
      this.userInfo.room = res.data.data.room
    },
    async updatePassword(){
      console.log('update password')
      this.updatePasscode = true
      // this.$router.push('/login#')
      // const res = await this.$axios.post('',{

      // })
    },
    logout(){
            localStorage.clear()
            this.$router.push('/login')
            console.log('logged out')
        }
  }
}
</script>

<style scoped>
#round-avatar {
  border-radius: 50%; 
}
#container {
    font-family:'Roboto', sans-serif;
}
</style>