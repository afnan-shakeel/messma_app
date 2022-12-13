<template>
    <v-container>
        <v-card dark class="justify-center">
        <v-card-text>
        <v-text-field v-model="form.mobile" dense outlined label="Phone Number"></v-text-field>
        <v-text-field v-model="form.passcode" dense outlined label="Passcode" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
        <v-btn color="red" @click="login()">Submit</v-btn>
        </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    layout:'DefaultLayout',
    name:'login',
    data(){
        return{
            items:["admin login","mess login"],
            tab:1,
            form:{
                mobile:null,
                passcode:null
            }
        }
    },
    methods:{
        async login(){
            console.log('form ',this.form)
            const payload = this.form
            await this.$axios.post('/auth/login',payload)
              .then(res => {
                if(res.data.access_token){
                  this.$storage.setUniversal('token',res.data.access_token)
                  console.log('access token set')
                  this.setAuth();
                  this.$router.push('/dashboard')
                }else{
                //   this.$toasted.error('invalid')
                  console.log('xx',this.$storage.getUniversal('token'))
                }
              })
              .catch( err => {
                console.log('err x ',err)
              })
        },
        async setAuth(){
          console.log('tokk',this.$storage.getUniversal('token'))
          const res = await this.$axios.get('/auth/data',{
            headers: {
              Authorization: this.$storage.getUniversal('token')
            }
          })
          .then(res=>{
            this.$storage.setUniversal('user',res.data)
          })
          // this.$toasted.error('failed to get auth')
        }


    }
}
</script>

<style>

</style>