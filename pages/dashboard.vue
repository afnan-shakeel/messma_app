<template>
<div data-app>
  <v-container>
    
    <!-- <v-btn @click="getConfigs()"></v-btn> -->
    <v-row v-if="days && selectedDay && meals && selectedMeal">
    <v-col cols="4">
        <p> DAY: {{this.days.filter(x=>x.id == selectedDay)[0].name}} </p>
    <!-- <v-select v-model="selectedDay" :items="days" item-text="name" item-value="id"  label="day" outlined dense></v-select>     -->
    </v-col>
    <v-col cols="4">
        <p> Meal: {{this.meals.filter(x=>x.id == selectedMeal)[0].name}} </p>
    <!-- <v-select v-model="selectedMeal" :items="meals" item-text="name" item-value="id" label="meal" outlined dense></v-select>     -->
    </v-col>
    </v-row>
    <form>
    <p v-if="hide">No Meals Now..</p>
    <v-row v-if="hogg_val">
        <v-col cols="auto"><v-select v-model="currentHogg" :items="hogg_val" item-text="name" item-value="name" label="current meal" outlined dense clearable :disabled="hide===true"></v-select></v-col>
        <v-col cols="auto"><v-select v-model="nextHogg" :items="hogg_val.filter(x=>!['NF','ALLOWED'].includes(x.name))" item-text="name" item-value="name" label="next meal" outlined dense clearable :disabled="hide===true"></v-select></v-col>
        <v-col v-if="nextHogg === 'EXTRA'" cols="auto"><v-text-field v-model="extraCount" type="number" label="count" dense outlined :rules="['Required']"></v-text-field></v-col>
    </v-row>
    <v-btn v-if="currentHogg && nextHogg && (nextHogg === 'EXTRA' ? extraCount : true ) " @click="markHogg()">submit</v-btn>
</form>
</v-container>
</div>
</template>

<script>
export default {
    name:'dashboard',
    layout:'session',
    data(){
        return{
            form:null,
            mess_id: this.$storage.getUniversal('user').data.mess_id,
            days: null,
            meals: null,
            hogg_val:null,
            selectedConfig: null, 
            selectedDay: null,
            selectedMeal: null,
            currentHogg: null,
            nextHogg: null,
            extraCount: null,
            hide: true
        }
    },
    mounted(){
        this.getDayMeals();
        this.getHoggVal();
    },
    methods:{
        async getDayMeals(){
            const dayRes = await this.$axios.get('/ext/days')
            const mealsRes = await this.$axios.get('/ext/meals')
            this.days = dayRes.data.data
            this.meals = mealsRes.data.data

            var today = new Date().getDay()
            if(today == 0) today = 7
            console.log('today',today)
            // this.selectedDay = today
            
            const configs = await this.getConfigs()
            const todaysConfigs = configs.filter(x => x.day == today)

            const currentTime = new Date().toTimeString().split(' ')[0]
            console.log(currentTime)
            const currentConfigs = todaysConfigs.filter(x=> currentTime >= x.start_time && currentTime <= x.end_time )
            console.log('currentConfigs',currentConfigs)
            if(currentConfigs.length !== 0){
                this.selectedConfig  =  currentConfigs[0]
                this.selectedMeal = currentConfigs[0].meal_id
                this.selectedDay = currentConfigs[0].day
                this.hide = false
            }
        },
        async getConfigs(){
            console.log('this.mess_id',this.mess_id)
            const res = await this.$axios.get(`/menu-config/${this.mess_id}`,{
                headers:{
                    Authorization: this.$storage.getUniversal('token')
                }
            });
            console.log('get configs',res.data)
            if (res.data && res.data.message !== 'Success') return false
            return res.data.data
        },
        getconfig(day,meal_id){
            console.log('mark',day,meal_id)
        },
        async getHoggVal(){
            const res = await this.$axios.get('/ext/hogg_values')
            if(res.data && res.data.message !== 'Success') return
            this.hogg_val = res.data.data
            console.log('x',this.hogg_val)
        },
        async markHogg(){
            console.log('mark hogg')
            const payload = [{
                user_id: this.$storage.getUniversal('user').data.user_id,
                mess_id: this.mess_id,
                config_id:this.selectedConfig.id,
                status: this.currentHogg,
                next: this.nextHogg,
                remark: this.extraCount,
            }]
            console.log('hogg payload', payload)
            const res = await this.$axios.post('/hogg', payload,{
                headers: {
                    Authorization: this.$storage.getUniversal('token')
                }
            });
            console.log('hogg res', res)
        }
    }
}
</script>

<style>

</style>