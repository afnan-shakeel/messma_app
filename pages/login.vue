<template>
    <v-container>
        <v-card v-if="!resetPasscode" dark class="justify-center">
        <v-card-text>
        <v-text-field v-model="form.mobile" dense outlined label="Phone Number"></v-text-field>
        <v-text-field v-if="!resetPasscode" v-model="form.passcode" dense outlined label="Passcode" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
        <v-col cols="auto">
        <v-btn color="red" @click="login()">Submit</v-btn>
        </v-col>
        <v-col align="right">
        <a @click="resetPasscode = true">Forgot passcode? </a>
      </v-col>
        </v-card-actions>
        </v-card>
        <v-card dark v-if="resetPasscode" class="justify-center">
          <reset-passcode v-bind:userInfo="null"></reset-passcode>
        </v-card>
    </v-container>
</template>

<script>
export default {
    layout:'DefaultLayout',
    name:'login',
    data(){
        return{
            form:{
                mobile:null,
                passcode:null
            },
            email: null,
            resetPasscode:null
        }
    },
    methods:{
        async login(){
            const payload = this.form
            await this.$axios.post('/auth/login',payload)
              .then(res => {
                if(res.data && res.data.message !== 'Success'){
                    // this.$toasted.error(res.data)
                    console.log('err',res.data.content)
                    throw Error('Failed')
                }
                if(res.data.access_token){
                  this.$storage.setUniversal('token',res.data.access_token)
                  this.setAuth()
                  .then(res=>{
                    console.log('auth res',res)
                    this.$router.push('/hoggs')
                  })
                  .catch(err=>{
                    console.log('auth err',err)
                    return;
                  });
                }else{
                //   this.$toasted.error('invalid')
                  console.log('xx',this.$storage.getUniversal('token'))
                }
              })
              .catch( err => {
                this.$toasted.error(err.message)
                console.log('err login',JSON.stringify(err))
              })
        },
        async setAuth(){
          await this.$axios.get('/auth/data',{
            headers: {
              Authorization: this.$storage.getUniversal('token')
            }
          })
          .then(res=>{
            if(res.data.data.scope.includes('app_access')){
              this.$storage.setUniversal('user',res.data)
              return;
            }else{
              this.$toasted.error('insufficient permission')
              throw Error('permission denied')
            }            
          })
          // this.$toasted.error('failed to get auth')
        }
    }
}
</script>

<style>

</style>