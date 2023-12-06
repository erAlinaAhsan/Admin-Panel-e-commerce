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
      MANAGE CATEGORIES
    </h1>
    <div class="flex justify-center items-center mb-5">
      <form class="max-w-sm mx-auto text-gray-900">
        <h3
          class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white"
        >
          ADD CATEGORY
        </h3>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Category Name</label
          >
          <input
            type="text"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            v-model="categoryName"
            placeholder="Enter category name..."
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
          <button
            type="button"
            class="mt-5 hover:bg-gray-600 text-black px-4 py-2 rounded bg-gray-400"
            @click="addCategory"
          >
            Add
          </button>
        </div>
      </form>
    </div>
    <!-- Edit Category Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="flex justify-center items-center">
        <form
          @submit.prevent="editCategory"
          class="max-w-sm mx-auto text-gray-900"
        >
          <h3
            class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white"
          >
            EDIT CATEGORY
          </h3>
          <div class="mb-5">
            <label
              for="edit-name"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Category Name</label
            >
            <input
              type="text"
              id="edit-name"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              v-model="editingCategory.name"
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
              v-model="editingCategory.description"
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

    <!-- <div class="row"> -->
    <!-- <div class="col-3"></div> -->
    <!-- <div class="col-md-6 px-5 px-md-0"> -->
    <div
      v-if="categories.length > 0"
      class="flex justify-center w-full relative overflow-x-auto"
    >
      <!-- <h5>Existing Categories:</h5> -->
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
            <th scope="col" class="px-6 py-3">Delete</th>
            <th scope="col" class="px-6 py-3">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="category in categories"
            :key="category.id"
          >
            <td class="px-6 py-4">
              <span class="id">{{ category.id }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="name">{{ category.name }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="description">{{ category.description }}</span>
            </td>
            <td class="px-6 py-4">
              <button @click="deleteCategory(category.id)">
                <i class="fa fa-trash cursor-pointer"></i>
              </button>
            </td>
            <td class="px-6 py-4">
              <button @click="openEditModal(category)">
                <i class="fa fa-pen pointer"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- </div> -->
  <!-- <div class="col-3"></div> -->
  <!-- </div> -->

  <!-- <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <div v-if="categories.length > 0" class="mt-3">
          <h5>Existing Categories:</h5>
          <ul>
            <li v-for="category in categories" :key="category.id">
              <p class="id">{{ category.id }} - {{ category.name }}</p>
              <p class="description">{{ category.description }}</p>
              <button @click="deleteCategory(category.id)">Delete</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-3"></div>
    </div> -->
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
          const newCategory = response.data.data;
          this.categories.push(newCategory);

          // Clear input fields after successfully adding a new category
          this.categoryName = "";
          this.description = "";
        } else {
          this.showAlert("Unable to add category");
        }
      } catch (error) {
        console.error("API Error:", error);
        this.showAlert("Can't connect to the server");
      }
    },

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
        console.log("Deleting category:", categoryId);

        const response = await axios.delete(`${this.baseURL}/${categoryId}`);

        console.log("API Response:", response);

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
/* h4,
h5 {
  font-family: "Magisho", sans-serif;
  color: #484848;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-shadow: 1px 1px 2px black;
  text-transform: uppercase;
  text-align: center;
}

.id,
.description,
.form-group,
.mt-3 {
  display: flex;
  justify-content: flex-start;
  font-size: 1rem;
  width: 30em;
  word-wrap: break-word;
  text-align: center;
  padding-bottom: 2em;
  border-bottom: 1px solid white;
  text-shadow: 1px 1px 2px black;
  font-family: "Valverde", sans-serif;
}
.description {
  text-align: left !important;
} */
</style>
