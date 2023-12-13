<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha384-ez0X1PxrJzFXjDGlYPXu3Un5z1ZlKPNwF+iK9i8vjPrsICdB6admd/vIB7aUv3p3N"
    crossorigin="anonymous"
  />
  <div
    class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
  >
    <link rel="stylesheet" href="node_modules/sweetalert/dist/sweetalert.css" />

    <div class="flex justify-between">
      <h1
        class="text-2xl px-4 py-2 text-indigo-900 dark:text-gray-200 font-medium"
      >
        Manage Products
      </h1>
    </div>

    <div class="flex justify-end items-center mr-8 mb-5">
      <router-link to="/admin/product/add">
        <button
          class="hover:bg-indigo-400 text-white px-4 py-2 rounded bg-indigo-600"
        >
          <span class="text-xl">+</span>
          <span class="ml-2">Add New Product</span>
        </button>
      </router-link>
    </div>
  </div>
  <div
    class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12"
  >
    <div
      v-if="products && products.length > 0"
      class="flex justify-center w-full relative overflow-x-auto"
    >
      <div
        class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg"
      >
        <table class="min-w-full">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <!-- <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Cat_Id
              </th> -->
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Id
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Description
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Image
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Price
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Quantity
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              v-for="product in products"
              :key="product.id"
            >
              <!-- <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  product.category_id
                }}</span>
              </td> -->
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  product.id
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  product.name
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  product.description
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <img
                  v-if="product.image"
                  :src="product.image"
                  alt="Product Image"
                  class="max-w-full h-12"
                  @error="handleImageError"
                />
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  product.price
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  product.quantity_in_stock
                }}</span>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <button @click="deleteProduct(product.id)">
                  <i
                    aria-hidden
                    class="fa fa-trash cursor-pointer text-red-500"
                  ></i>
                </button>
              </td>
              <!-- <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
              <button @click="openEditModal(product)">
                <i class="fa fa-pen pointer text-green-500"></i>
              </button>
            </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
// Import Font Awesome CSS in your JavaScript or CSS file
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
export default {
  data() {
    return {
      baseURL: "https://ecommerce.hyperzod.dev/api/admin/products",
      products: [],
      category_id: null,
      id: null,
      productName: "",
      description: "",
      price: null,
      image: null,
      quantity_in_stock: null,
    };
  },
  methods: {
    handleImageError(event) {
      // Replace broken image with a placeholder
      event.target.src = require("@/assets/plc.png");
    },
    // async openEditModal(product) {
    //   await this.fetchProducts();
    //   this.showEditModal = true;
    //   this.editingProduct = { ...product };
    // },
    // closeEditModal() {
    //   this.showEditModal = false;
    //   this.editingProduct = {
    //     id: null,
    //     name: "",
    //     description: "",
    //     price: null,
    //     quantity_in_stock: null,
    //   };
    // },
    // async editProduct() {
    //   try {
    //     const response = await axios.put(
    //       `${this.baseURL}/${this.editingProduct.id}`,
    //       {
    //         name: this.editingProduct.name,
    //         description: this.editingProduct.description,
    //         price: this.editingProduct.price,
    //         quantity_in_stock: this.editingProduct.quantity_in_stock,
    //       }
    //     );
    //     if (response.data.success) {
    //       // Assuming the API response contains the updated category
    //       const updatedProduct = response.data.data;
    //       // Update the category in the list
    //       const index = this.products.findIndex(
    //         (product) => product.id === updatedProduct.id
    //       );
    //       if (index !== -1) {
    //         this.products.splice(index, 1, updatedProduct);
    //       }
    //       // Close the modal after editing
    //       this.closeEditModal();
    //     } else {
    //       this.showAlert("Unable to edit product");
    //     }
    //   } catch (error) {
    //     console.error("API Error:", error);
    //     this.showAlert("Can't connect to the server");
    //   }
    // },

    async deleteProduct(productId) {
      try {
        const confirmation = window.confirm(
          "Are you sure you want to delete this product?"
        );
        if (confirmation) {
          const response = await axios.delete(`${this.baseURL}/${productId}`);
          console.log("API Response:", response);
          if (response.status === 204) {
            // Remove the deleted category from the list
            this.products = this.products.filter(
              (product) => product.id !== productId
            );
            const token = response.data.token;
            if (token) {
              localStorage.setItem("authToken", token);
            }
          } else {
            this.showLErrorAlert("Unable to delete product");
          }
        }
      } catch (error) {
        console.error("API Error:", error);
        this.showLErrorAlert("Can't connect to the server");
      }
    },

    async fetchProducts() {
      try {
        const response = await axios.get(this.baseURL);
        console.log(response);
        this.products = response.data.data;
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
<style scoped>
</style>