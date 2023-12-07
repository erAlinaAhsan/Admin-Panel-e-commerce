<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha384-ez0X1PxrJzFXjDGlYPXu3Un5z1ZlKPNwF+iK9i8vjPrsICdB6admd/vIB7aUv3p3N"
    crossorigin="anonymous"
  />

  <div class="container" style="max-width: 600px">
    <h1
      class="flex justify-center items-center mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-3xl dark:text-white"
    >
      MANAGE PRODUCTS
    </h1>
    <div class="flex justify-center items-center mb-5">
      <form class="max-w-sm mx-auto text-gray-900">
        <h3
          class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white"
        >
          ADD NEW PRODUCT
        </h3>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Product Name</label
          >
          <input
            type="text"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="productName"
            placeholder="Enter product name..."
            required
          />
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Description</label
          >
          <input
            type="text"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="description"
            placeholder="Enter description..."
            required
          />
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Price</label
          >
          <input
            type="text"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="price"
            placeholder="Enter product name..."
            required
          />
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Quantity</label
          >
          <input
            type="text"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="quantity"
            placeholder="Enter product name..."
            required
          />

          <button
            type="button"
            class="mt-5 hover:bg-gray-600 text-black px-4 py-2 rounded bg-gray-400"
            @click="addProduct"
          >
            Add
          </button>
        </div>
      </form>
    </div>
    <!-- Edit Product Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="flex justify-center items-center">
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
              class="block mb-2 text-sm font-medium text-gray-900"
              >Product Name</label
            >
            <input
              type="text"
              id="edit-name"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              v-model="editingProduct.name"
              required
            />
          </div>
          <div class="mb-5">
            <label
              for="edit-description"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Description</label
            >
            <input
              type="text"
              id="edit-description"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              v-model="editingProduct.description"
              required
            />
          </div>
          <div class="mb-5">
            <label
              for="edit-price"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Price</label
            >
            <input
              type="text"
              id="edit-name"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              v-model="editingProduct.price"
              required
            />
          </div>
          <div class="mb-5">
            <label
              for="edit-quantity"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Quantity</label
            >
            <input
              type="text"
              id="edit-name"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              v-model="editingProduct.quantity"
              required
            />
          </div>
          <button
            type="submit"
            class="mt-5 mb-5 mr-5 hover:bg-gray-600 text-black px-4 py-2 rounded bg-gray-400"
          >
            Save Changes
          </button>
          <button
            @click="closeEditModal"
            class="text-xl align-center cursor-pointer alert-del"
          >
            &times;
          </button>
        </form>
      </div>
    </div>
    <div
      v-if="products && products.length > 0"
      class="flex justify-center w-full relative overflow-x-auto"
    >
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Id</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3">Delete</th>
            <th scope="col" class="px-6 py-3">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="product in products"
            :key="product.id"
          >
            <td class="px-6 py-4">
              <span class="id">{{ product.id }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="name">{{ product.name }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="description">{{ product.description }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="description">{{ product.price }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="description">{{ product.quantity }}</span>
            </td>
            <td class="px-6 py-4">
              <button @click="deleteProduct(product.id)">
                <i class="fa fa-trash cursor-pointer"></i>
              </button>
            </td>
            <td class="px-6 py-4">
              <button @click="openEditModal(product)">
                <i class="fa fa-pen pointer"></i>
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
      editingProduct: { id: null, name: "", description: "" },
      productName: "",
      description: "",
      price: "",
      quantity: "",
    };
  },

  methods: {
    async addProduct() {
      try {
        const response = await axios.post(this.baseURL, {
          name: this.productName,
          description: this.description,
          price: this.price,
          quantity: this.quantity,
        });

        if (response.data.success) {
          // Assuming the API response contains the newly added category
          const newProduct = response.data.data;
          this.products.push(newProduct);

          // Clear input fields after successfully adding a new category
          this.productName = "";
          this.description = "";
          this.price = null;
          this.quantity = null;
        } else {
          this.showAlert("Unable to add product");
        }
      } catch (error) {
        console.error("API Error:", error);
        this.showAlert("Can't connect to the server");
      }
    },

    openEditModal(product) {
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
