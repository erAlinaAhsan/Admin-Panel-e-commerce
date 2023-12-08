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

    <!-- Edit Product Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="flex justify-center items-center">
        <div
          class="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-md p-8 shadow-md"
        >
          <form
            @submit.prevent="editProduct"
            class="max-w-sm mx-auto text-gray-900"
          >
            <h3
              class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white"
            >
              EDIT PRODUCT
            </h3>
            <div class="mb-5">
              <label
                for="edit-name"
                class="block mb-2 text-sm font-medium text-indigo-900"
                >Product Name</label
              >
              <input
                type="text"
                id="edit-name"
                class="shadow-sm bg-gray-50 border border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                v-model="editingProduct.name"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="edit-description"
                class="block mb-2 text-sm font-medium text-indigo-900"
                >Description</label
              >
              <input
                type="text"
                id="edit-description"
                class="shadow-sm bg-gray-50 border border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                v-model="editingProduct.description"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="edit-price"
                class="block mb-2 text-sm font-medium text-indigo-900"
                >Price</label
              >
              <input
                type="text"
                id="edit-name"
                class="shadow-sm bg-gray-50 border border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                v-model="editingProduct.price"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="edit-quantity"
                class="block mb-2 text-sm font-medium text-indigo-900"
                >Quantity</label
              >
              <input
                type="text"
                id="edit-name"
                class="shadow-sm bg-gray-50 border border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                v-model="editingProduct.quantity"
                required
              />
            </div>
            <div class="mb-5">
              <button
                type="submit"
                class="hover:bg-indigo-300 text-white px-4 py-2 rounded bg-indigo-600"
              >
                Save Changes
              </button>
              <button
                @click="closeEditModal"
                class="text-xl align-center cursor-pointer alert-del"
              >
                &times;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12"
    ></div>

    <div
      v-if="products && products.length > 0"
      class="flex justify-center w-full relative overflow-x-auto"
    >
      <table class="min-w-full">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
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
              Delete
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="product in products"
            :key="product.id"
          >
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
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
              <button @click="openEditModal(product)">
                <i class="fa fa-pen pointer text-green-500"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
      showEditModal: false,
      editingProduct: {
        id: null,
        name: "",
        description: "",
        price: "",
        quantity: "",
      },
    };
  },

  methods: {
    async openEditModal(product) {
      await this.fetchProducts();
      this.showEditModal = true;
      this.editingProduct = { ...product };
    },

    closeEditModal() {
      this.showEditModal = false;
      this.editingProduct = {
        id: null,
        name: "",
        description: "",
        price: null,
        quantity: null,
      };
    },

    async editProduct() {
      try {
        const response = await axios.put(
          `${this.baseURL}/${this.editingProduct.id}`,
          {
            name: this.editingProduct.name,
            description: this.editingProduct.description,
            price: this.editingProduct.price,
            quantity: this.editingProduct.quantity,
          }
        );

        if (response.data.success) {
          // Assuming the API response contains the updated category
          const updatedProduct = response.data.data;

          // Update the category in the list
          const index = this.products.findIndex(
            (product) => product.id === updatedProduct.id
          );
          if (index !== -1) {
            this.products.splice(index, 1, updatedProduct);
          }

          // Close the modal after editing
          this.closeEditModal();
        } else {
          this.showAlert("Unable to edit product");
        }
      } catch (error) {
        console.error("API Error:", error);
        this.showAlert("Can't connect to the server");
      }
    },

    async deleteProduct(productId) {
      try {
        console.log("Deleting product:", productId);

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
      } catch (error) {
        console.error("API Error:", error);
        this.showLErrorAlert("Can't connect to the server");
      }
    },

    showLErrorAlert(message) {
      this.$swal.fire({
        text: message,
        icon: "error",
      });
    },

    async fetchProducts() {
      try {
        const response = await axios.get(this.baseURL);
        console.log(response);
        this.products = response.data;
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
