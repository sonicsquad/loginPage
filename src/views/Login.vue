<template>
    <div>
        <form @submit.prevent="onSubmit">
            <input type="text" v-model="email">
            <input type="password" v-model="password">
            <input type="submit">
        </form>
    </div>
</template>
<script>
import cookie from 'js-cookie';
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        onSubmit() {
            this.$axios.post("/auth/login", {
                email: this.email,
                password: this.password
            }).then(response => {
                // console.log(response);
                this.getDataUser(response.data)
            })
        },
        getDataUser(data){
            this.$axios.get("auth/profile",{
                headers: {
                    Authorization: 'Bearer ' + data.access_token
                }
            }). then(res => {
                let userdata =  Object.assign(res.data, data)
                let forcookie =  JSON.stringify(userdata)
                cookie.set("userdata", forcookie, {expires: 1});
                this.$store.commit("SET_LOGIN" , forcookie )
                this.$router.push( '/home')
            })
        }
    },
}
</script>