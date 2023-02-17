<template>
  <v-container>
    <form>
        <p v-if="days && selectedDay">Day: {{ days.filter(x=> x.id === selectedDay)[0].name}}</p>
        <div v-if="configs && meals && hogg_val" data-app>
        
        <p v-for="item in configs" :key="item.id">{{meals.filter(x => x.id === item.meal_id)[0].name}}: 
            <v-row>
            <v-col>
            <v-select :hint="item.dish_name" v-model="item.currentStatus" :items="hogg_val.filter(x=>!['EXTRA'].includes(x.name))" item-text="name" item-value="name" label="current meal" dense outlined clearable></v-select>
            </v-col>
            <!-- <v-icon v-tooltip.auto="{ content: item.dish_name }" size="medium">mdi-information-outline</v-icon> -->
            <v-col>
            <v-select :hint="item.next_dish_name" v-model="item.nextStatus" :items="hogg_val.filter(x=>!['NF','ALLOWED'].includes(x.name))" item-text="name" item-value="name" label="next meal" dense outlined clearable></v-select>
            </v-col>
            <v-col v-if="item.nextStatus && item.nextStatus === 'EXTRA'">
                <v-text-field v-model="item.remark" type="number" label="count" outlined dense></v-text-field>
            </v-col>
        </v-row>
        </p>
        </div>
        <v-btn @click="submitHogg()">submit</v-btn>
</form>
  </v-container>
</template>

<script>
export default {
    name:'hoggs',
    layout:'session',
    data(){
        return{
            mess_id: this.$storage.getUniversal('user').data.mess_id,
            configs: null,
            days: null,
            selectedDay: null,
            currentStatus: null,
            nextStatus: null,
            meals: null,
            hogg_val: null,
            payload: null,
        }
    },
    mounted(){
        this.getDayConfig();
        this.getHoggVal();
    },
    methods:{
        async getDayConfig(){
            const dayRes = await this.$axios.get('/ext/days')
            const mealsRes = await this.$axios.get('/ext/meals')
            const messConfigRes = await this.$axios.get(`/mess/${this.mess_id}/config`,{
                headers:{
                    Authorization: this.$storage.getUniversal('token')
                }
            });
            if(messConfigRes.data && messConfigRes.data.message !== 'Success') return
            const config_list = messConfigRes.data.data.meal_config.split(',')
            const configMeals = mealsRes.data.data.filter(x=>config_list.includes(x.name))
            this.days = dayRes.data.data
            this.meals = configMeals
            const configs = await this.getConfigs()

            var todayDate = new Date()
            var today = todayDate.getDay()
            if(today == 0) today = 7
            this.selectedDay = today
            const todaysConfigs = configs.filter(x => x.day == today)
            console.log('todaysConfigs',todaysConfigs)

            var nextDate = new Date(new Date().setDate(todayDate.getDate()+1))
            var nextDay = nextDate.getDay()
            if(nextDay == 0) nextDay = 7
            const nextConfigs = configs.filter(x => x.day == nextDay)
            
            for(let today of todaysConfigs){
                today.next_dish_name = null
                for(let nextDay of nextConfigs ){
                    if(today.day === (nextDay.day -1) && today.meal_id === nextDay.meal_id){
                        today.next_dish_name = nextDay.dish_name
                    }
                }
            }
            this.configs = todaysConfigs            
            console.log('finale', this.configs)
        },
        async getConfigs(){
            const res = await this.$axios.get(`/menu-config/${this.mess_id}`,{
                headers:{
                    Authorization: this.$storage.getUniversal('token')
                }
            });
            console.log('get configs',res.data)
            if (res.data && res.data.message !== 'Success') {
                this.$toasted.error('failed to get configs')
                return false
            }
            return res.data.data
        },
        async getHoggVal(){
            const res = await this.$axios.get('/ext/hogg_values')
            if(res.data && res.data.message !== 'Success') {
                this.$toasted.error('failed to fetch hogg value')
                return;
            }
            this.hogg_val = res.data.data
        },
        async submitHogg(){
            const payload = this.hoggPayload();
            this.payload = payload
            const res = await this.$axios.post('/hogg',payload,{
                headers:{
                    Authorization: this.$storage.getUniversal('token')
                }
            });
            console.log('submit hogg res ',res)
            if(res.data && res.data.message === 'Success'){
                this.$toasted.success('submitted')
            }else{
                console.log(res.data.content)
                this.$toasted.error(res.data.message === 'Fail' ? res.data.content : 'Fail' )
            }
        },
        hoggPayload(){
            const payloadList = []
            const mess_id = this.$storage.getUniversal('user').data.mess_id
            const user_id = this.$storage.getUniversal('user').data.user_id
            for (let item of this.configs){
                const data = {}
                data.user_id = user_id
                data.mess_id = mess_id
                data.config_id = item.id
                data.status = item.currentStatus
                data.next = item.nextStatus
                data.remark = item.remark
                payloadList.push(data)
            }
            return payloadList
            // console.log(payloadList)
        }

    }
}
</script>

<style>

</style>