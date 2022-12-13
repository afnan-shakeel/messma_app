<template>
  <v-container>
    hoggs
    <form>
        <p v-if="days && selectedDay">Day: {{ days.filter(x=> x.id === selectedDay)[0].name}}</p>
        <div v-if="configs && meals && hogg_val" data-app>
        
        <p v-for="item in configs" :key="item.id">{{meals.filter(x => x.id === item.meal_id)[0].name}}: 
            <v-row>
            <v-col>
            <v-select :rules="rules.select" v-model="item.currentStatus" :items="hogg_val" item-text="name" item-value="name" label="current meal" dense outlined clearable></v-select>
            </v-col>
            <v-col>
            <v-select :rules="rules.select" v-model="item.nextStatus" :items="hogg_val" item-text="name" item-value="name" label="next meal" dense outlined clearable></v-select>
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
            rules: {
                select: [(v) => !!v || "Item is required"],
                }
        }
    },
    mounted(){
        this.getDayConfig();
        this.getHoggVal();
    },
    methods:{
        async getDayConfig(){
            console.log()
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

            var today = new Date().getDay()
            if(today == 0) today = 7
            console.log('today', today)
            this.selectedDay = today

                        
            const configs = await this.getConfigs()
            const todaysConfigs = configs.filter(x => x.day == today)
            console.log('hogg today config',todaysConfigs)
            this.configs = todaysConfigs
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
        async getHoggVal(){
            const res = await this.$axios.get('/ext/hogg_values')
            if(res.data && res.data.message !== 'Success') return
            this.hogg_val = res.data.data
            console.log('x',this.hogg_val)
        },
        async submitHogg(){
            const payload = this.hoggPayload();
            console.log('xxx',payload)
            const res = await this.$axios.post('/hogg',payload,{
                headers:{
                    Authorization: this.$storage.getUniversal('token')
                }
            });
            console.log('submit hogg res ',res)
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