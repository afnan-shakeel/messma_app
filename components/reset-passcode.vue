<template>
    <v-container>
        <v-text-field v-model.number="mobile" dense outlined label="mobile" :disabled="otpSent"></v-text-field>
        <v-text-field  v-model="email" dense outlined label="email" :disabled="otpSent"></v-text-field>
        <v-btn @click="reqOtp()">send otp</v-btn>
        <v-card-text v-if="otpSent">
        <v-text-field v-model="otp" dense outlined label="otp"></v-text-field>
        <v-text-field v-model="new_passcode" dense outlined label="new passcode" type="password"></v-text-field>
        <v-text-field v-model="confirm_passcode" dense outlined label="confirm passcode" type="password"></v-text-field>
        <v-btn @click="resetPasscode()">reset passcode</v-btn>
        </v-card-text>
    </v-container>  
</template>

<script>

export default {
    name:'reset-passcode',
    props:['userInfo'],
    data(){
        return{
            mobile: this.userInfo ? this.userInfo.mobile : null,
            email:  this.userInfo ? this.userInfo.email : null,
            otp: null,
            new_passcode: null,
            confirm_passcode:null,
            otpSent: false
        }
    },
    methods:{
        async reqOtp(){
            console.log('reqOtp func',typeof this.mobile,this.email)
            const res = await this.$axios.post('/auth/otp',{
                mobile:this.mobile,
                email: this.email
            });
            console.log('email res',res)
            if (res.data.message !== 'Success'){
                this.$toasted.error(`Failed to sent otp mail - ${res.data.content}`)
                return;
            }
            this.otpSent= true
            this.$toasted.info(`OTP sent to mail`)
        },
        async resetPasscode(){
            console.log('resetPasscode',this.new_passcode,this.confirm_passcode,this.otp)
            if(this.new_passcode !== this.confirm_passcode){
                this.$toasted.error('Passcode do not match')
                return;
            }
            const res = await this.$axios.post('/auth/reset-passcode',{
                mobile: this.mobile,
                otp: this.otp,
                new_passcode: this.new_passcode
            });
            console.log('pass reset res', res)
            this.$toasted.success('passcode updated')
            this.$router.push('/login') 
        }
    }

}
</script>

<style>

</style>