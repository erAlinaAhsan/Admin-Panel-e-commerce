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
        Manage Categories
      </h1>
    </div>
    <div class="flex justify-end items-center mr-8 mb-5">
      <router-link to="/admin/category/add">
        <button
          class="hover:bg-indigo-400 text-white px-4 py-2 rounded bg-indigo-600"
        >
          <span class="text-xl">+</span>
          <span class="ml-2">Add New Category</span>
        </button>
      </router-link>
    </div>

    <!-- Edit Category Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="flex justify-center items-center">
        <div
          class="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-md p-8 shadow-md border border-gray-300"
        >
          <form @submit.prevent="editCategory" class="text-gray-900">
            <h3
              class="mb-4 text-xl font-extrabold leading-none tracking-tight text-indigo-900 md:text-xl lg:text-2xl dark:text-white"
            >
              EDIT CATEGORY
            </h3>
            <div class="mb-5">
              <label
                for="edit-name"
                class="block mb-2 text-sm font-medium text-indigo-900"
                >Category Name</label
              >
              <input
                type="text"
                id="edit-name"
                class="shadow-sm bg-gray-50 border border-gray-300 text-indigo-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                v-model="editingCategory.name"
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
                v-model="editingCategory.description"
                required
              />
            </div>
            <div class="flex justify-between">
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

    <div v-if="!showEditModal">
      <div
        class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12"
      ></div>
      <div
        v-if="categories && categories.length > 0"
        class="flex justify-center w-full relative overflow-x-auto"
      >
        <!-- <h5>Existing Categories:</h5> -->
        <table class="min-w-full">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-indigo-600 tracking-wider"
              >
                Id
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-indigo-600 tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-indigo-600 tracking-wider"
              >
                Description
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-indigo-600 tracking-wider"
              >
                Delete
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-indigo-600 tracking-wider"
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              v-for="category in categories"
              :key="category.id"
            >
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  category.id
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  category.name
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  category.description
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <button @click="deleteCategory(category.id)">
                  <i class="fa fa-trash cursor-pointer text-red-500"></i>
                </button>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <button @click="openEditModal(category)">
                  <i class="fa fa-pen pointer text-green-500"></i>
                </button>
              </td>
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
      baseURL: "https://ecommerce.hyperzod.dev/api/admin/categories",
      categories: [],
      showEditModal: false,
      editingCategory: { id: null, name: "", description: "" },
    };
  },

  methods: {
    openEditModal(category) {
      this.showEditModal = true;
      this.editingCategory = { ...category };
    },

    closeEditModal() {
      this.showEditModal = false;
      this.editingCategory = { id: null, name: "", description: "" };
    },

    async editCategory() {
      try {
        const response = await axios.put(
          `${this.baseURL}/${this.editingCategory.id}`,
          {
            name: this.editingCategory.name,
            description: this.editingCategory.description,
          }
        );

        if (response.data.success) {
          // Assuming the API response contains the updated category
          const updatedCategory = response.data.data;

          // Update the category in the list
          const index = this.categories.findIndex(
            (category) => category.id === updatedCategory.id
          );
          if (index !== -1) {
            this.categories.splice(index, 1, updatedCategory);
          }

          // Close the modal after editing
          this.closeEditModal();
        } else {
          this.showAlert("Unable to edit category");
        }
      } catch (error) {
        console.error("API Error:", error);
        this.showAlert("Can't connect to the server");
      }
    },

    async deleteCategory(categoryId) {
      try {
        const confirmation = window.confirm(
          "Are you sure you want to delete this category?"
        );

        if (confirmation) {
          const response = await axios.delete(`${this.baseURL}/${categoryId}`);

          if (response.status === 204) {
            // Remove the deleted category from the list
            this.categories = this.categories.filter(
              (category) => category.id !== categoryId
            );

            const token = response.data.token;

            if (token) {
              localStorage.setItem("authToken", token);
            }
          } else {
            this.showLErrorAlert("Unable to delete category");
          }
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

    async fetchCategories() {
      try {
        const response = await axios.get(this.baseURL);
        this.categories = response.data.data;
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  },

  mounted() {
    this.fetchCategories();
  },
};
</script>


<style scoped>
</style>
