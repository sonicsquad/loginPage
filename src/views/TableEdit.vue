<template>
    <div style="display: flex; ">
        <div>
            <img class="img-change" :src="this.images" alt="images" style="width: 50px; height: 50px" />
            <input class="masking-img" type="file" @change="previewFiles">
        </div>

        <input style="width: 500px;" type="text" v-model="title">
        <input type="number" v-model="price">
        <textarea name="description" v-model="description"></textarea>
        <button type="button" @click.prevent="putData">Submit Edit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            price: 0,
            description: '',
            categoryId: '',
            images: ''
        }
    },

    mounted() {
        // this.putData()
        console.log('ini query', this.$route.query)
        this.getDataProduct();
    },
    methods: {
        editImage() {
            this.previewFiles()
        },
        // previewFiles(event) {
        //     let img = event.target.files

        //     this.$axios.post('files/upload',{
        //         images : img
        //     })
        //         .then(res => {
        //             console.log(res)
        //         }) 
        // },
        getDataProduct() {
            this.$axios.get('products/' + this.$route.query.id)
                .then(res => {
                    let data = res.data
                    this.title = data.title
                    this.price = data.price
                    this.description = data.description
                    this.images = data.images[0]
                })
        },
        putData() {
            this.$axios.put('products/' + this.$route.query.id, {
                "title": this.title,
                "price": this.price,
                "description": this.description,
                "categoryId": this.$route.query.categoryId,
                "images": ['https://akornas.ac.id/wp-content/uploads/2021/12/placeholder.jpg']
            }).then(res => {
                // console.log('res', res)
                  if(res.statusText == "OK"){ 
                        this.$router.push('/home')  
                  }
                })
        }
    },
}
</script>
<style>
.img-change {
    width: 50px;
    height: 50px;
    position: absolute;
}

.masking-img {
    height: 50px;
    left: 0;
    position: relative;
    overflow: hidden;
    opacity: 0;
    width: 50px;
}
</style>