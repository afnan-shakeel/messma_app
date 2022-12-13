<template>
    <v-container>

        <nuxt/>

      <v-bottom-navigation
      color="primary"
    >
      <v-btn>
        <span>Home</span>
  
        <v-icon @click="toDashboard()">mdi-home</v-icon>
      </v-btn>
  
      <v-btn>
        <span>O</span>
  
        <v-icon @click="toHoggs()">mdi-heart</v-icon>
      </v-btn>
  
      <v-btn>
        <span>Account</span>
  
        <v-icon @click="toProfile()" >mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
    </v-container>
  </template>
  
  <script>
  export default {
    name:'SessionLayout',
    methods:{
        toDashboard(){
            this.$router.push('/dashboard')
        },
        toProfile(){
            this.$router.push('/profile')
        },
        toHoggs(){
            this.$router.push('/hoggs')
        },
    }
  }
  </script>
  
  <style>
  
  </style>