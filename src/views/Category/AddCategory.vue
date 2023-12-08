<template>
  <div
    class="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-300"
  >
    <div class="p-6">
      <h1 class="text-2xl text-indigo-900 dark:text-gray-200 font-medium mb-4">
        Add New Category
      </h1>

      <form @submit.prevent="addCategory">
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-indigo-900">
            Category Name
          </label>
          <input
            type="text"
            class="shadow-sm bg-gray-50 border border-indigo-700 text-blue-700 placeholder-indigo-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="categoryName"
            placeholder="Enter category name..."
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
      baseURL: "https://ecommerce.hyperzod.dev/api/admin/categories",
      categoryName: "",
      description: "",
    };
  },

  methods: {
    async addCategory() {
      try {
        const response = await axios.post(this.baseURL, {
          name: this.categoryName,
          description: this.description,
        });

        if (response.data.success) {
          // Assuming the API response contains the newly added category

          // Clear input fields after successfully adding a new category
          this.categoryName = "";
          this.description = "";

          // Optionally, you can navigate back to the main categories page
          this.$router.push("/admin/category/manage");
        } else {
          this.showAlert("Unable to add category");
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
