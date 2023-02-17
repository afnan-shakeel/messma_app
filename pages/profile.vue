<template>
  <v-container>
<v-row align="center">
    <v-img 
      id="round-avatar"
      src="https://library.kissclipart.com/20190227/shw/kissclipart-patient-icon-png-clipart-computer-icons-ac058a2675899cf9.png"
      max-height="150"
      max-width="150"
      ></v-img>
</v-row>
  <v-row v-if="userInfo.mobile && userInfo.email" align="center">
      <v-col>
      <p>Name: {{this.userInfo.name}}</p>
      <p>email: {{this.userInfo.email}}</p>
      <p>Mobile: {{this.userInfo.mobile}}</p>
      <p>Room: {{this.userInfo.room}}</p></v-col>
    </v-row>
    <v-row>

      <v-col justify="end">
        <p>Change Password <v-icon @click="updatePasscode=!updatePasscode">mdi-chevron-right</v-icon></p>
      <v-card dark v-if="updatePasscode">
        <reset-passcode v-if="userInfo.mobile && userInfo.email" v-bind:userInfo="userInfo"></reset-passcode>
      </v-card>
        <p>Logout <v-icon @click="logout()">mdi-chevron-right</v-icon></p>
      </v-col>
    </v-row>
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

<style>

#round-avatar {
  border-radius: 50%; 
  min-height: 150px;
  min-width: 150px;
}

</style>