<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <table>
      <thead>
        <th>
        <td>no</td>
        </th>
        <th>
        <td>image</td>
        </th>
        <th>
        <td>description</td>
        </th>
        <th>
        <td>title</td>
        </th>
        <th>
        <td>category</td>
        </th>
        <th>
        <td>price</td>
        </th>
        <th>
        <td>action</td>
        </th>

      </thead>
      <tbody>
        <tr v-for="(item, index) in dataProduct" :key="index">
          <td>{{ index + 1 }}</td>
          <td> <img :src="item.images" style="width: 50px;" alt=""></td>
          <td>{{ item.description }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td><button @click="edited(item)">edit</button>&nbsp;<button @click="deletedProduct(item.id)">deleted</button>
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
// @ is an alias to /src 

export default {
  name: 'HomeView',
  data() {
    return {
      dataProduct: [],
      dataproductlimit: '30'
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.getListdataProduct();
  },
  methods: {
    getListdataProduct() {
      this.$axios.get('products?limit=100&offset=0')
        .then(res => {
          let productdata = res.data
          console.log('ini data asli ', productdata)
          let img = productdata[0]?.images[0]
          console.log('ini image', img)
          productdata.forEach(item => {
            // console.log(item);
            this.dataProduct.push(
              {
                'id': item.id,
                'categoryId': item.category?.id,
                'images': item.category?.image,
                'description': item.description,
                'category': item.category?.name,
                'name': item.title,
                'price': item.price
              }
            );
          });
          console.log('data olahan', this.dataProduct)
        });
    },
    edited(item) {
      this.$router.push('/table-edit/?categoryId=' + item.categoryId + '&id=' + item.id)
    },
    deletedProduct(val) {
      this.$swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
           this.$axios.delete('products/'+val)
            .then(res => {
              if(res){
                this.$swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
                this.dataProduct = [];
                this.getListdataProduct();
                // window.location.reload()
              }
            })
         
        }
      });

      // this.$axios.get('products'+val)
      // .then(res => {

      // })
    }
  },

}
</script>
