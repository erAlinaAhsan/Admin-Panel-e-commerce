<template>
  <div
    class="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-300"
  >
    <div class="p-6">
      <h1 class="text-2xl text-indigo-900 dark:text-gray-200 font-medium mb-4">
        Add New Product
      </h1>

      <form @submit.prevent="addProduct">
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-indigo-900">
            Select Category
          </label>
          <select
            v-model="category_id"
            class="shadow-sm bg-gray-50 border border-indigo-700 text-blue-700 placeholder-indigo-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <!-- <input
            type="text"
            class="shadow-sm bg-gray-50 border border-indigo-700 text-blue-700 placeholder-indigo-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="category_id"
            placeholder="Select category..."
            required
          /> -->
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-indigo-900">
            Product Name
          </label>
          <input
            type="text"
            class="shadow-sm bg-gray-50 border border-indigo-700 text-blue-700 placeholder-indigo-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="productName"
            placeholder="Enter product name..."
            required
          />
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-indigo-900">
            Description
          </label>
          <input
            type="text"
            class="shadow-sm bg-gray-50 border border-indigo-700 text-blue-700 placeholder-indigo-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="description"
            placeholder="Enter description..."
            required
          />
        </div>
        <div class="mb-5">
          <button
            @click="openImageInput"
            type="submit"
            class="mb-5 hover:bg-indigo-400 text-white px-4 py-2 rounded bg-indigo-600"
          >
            Upload Image
          </button>
          <!-- <img
            v-if="product.image"
            :src="product.image"
            alt="Product Image"
            class="max-w-full h-12"
          /> -->
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            class="shadow-sm bg-gray-50 border border-indigo-700 text-blue-700 placeholder-indigo-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            ref="imageInput"
          />
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-indigo-900">
            Price
          </label>
          <input
            type="number"
            class="shadow-sm bg-gray-50 border border-indigo-700 text-blue-700 placeholder-indigo-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="price"
            placeholder="Enter price..."
            required
          />
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-indigo-900">
            Quantity
          </label>
          <input
            type="number"
            class="shadow-sm bg-gray-50 border border-indigo-700 text-blue-700 placeholder-indigo-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="quantity_in_stock"
            placeholder="Enter total quantity..."
            required
          />
        </div>
        <button
          type="submit"
          class="mt-5 hover:bg-indigo-400 text-white px-4 py-2 rounded bg-indigo-600"
        >
          Add
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      baseURL: "https://ecommerce.hyperzod.dev/api/admin/products",
      categories: [],
      category_id: null,
      productName: "",
      image: null,
      description: "",
      price: null,
      selectedImage: null,
      quantity_in_stock: null, // Corrected variable name
    };
  },
  async mounted() {
    // Fetch categories when the component is mounted
    try {
      await this.fetchCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  methods: {
    showAlert(message) {
      // You can implement your own alert logic here
      // For example, using a toast library or a modal
      console.error("Alert:", message);
    },
    async fetchCategories() {
      try {
        const response = await axios.get(
          "https://ecommerce.hyperzod.dev/api/categories"
        );
        this.categories = response.data.data;
      } catch (error) {
        console.error("API Error:", error);
        this.showAlert("Can't fetch categories");
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];

      if (file) {
        this.selectedImage = file;
      }
    },
    openImageInput() {
      this.$refs.imageInput.click();
    },
    async addProduct() {
      try {
        const formData = new FormData();
        formData.append("category_id", this.category_id);
        formData.append("name", this.productName);
        formData.append("description", this.description);
        formData.append("image", this.selectedImage);
        formData.append("price", this.price);
        formData.append("quantity_in_stock", this.quantity_in_stock);
        const response = await axios.post(this.baseURL, formData);

        if (response.data.success) {
          window.alert("New product added successfully");
          // Assuming the API response contains the newly added product

          // Clear input fields after successfully adding a new product
          this.productName = "";
          this.description = "";
          this.price = null;
          this.image = null;
          this.quantity_in_stock = null;
          this.$router.push("/admin/product/manage");
        } else {
          this.showAlert("Unable to add product");
        }
      } catch (error) {
        console.error("API Error:", error);
        this.showAlert("Can't connect to the server");
      }
    },
  },
};
</script>

<style scoped>
/* Your component styles... */
</style>
