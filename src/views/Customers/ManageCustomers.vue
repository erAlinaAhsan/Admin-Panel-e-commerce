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
      MANAGE CUSTOMERS
    </h1>

    <div
      v-if="customers && customers.length > 0"
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
            <th scope="col" class="px-6 py-3">email_Address</th>
            <th scope="col" class="px-6 py-3">Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="customer in customers"
            :key="customer.id"
          >
            <td class="px-6 py-4">
              <span class="id">{{ customer.id }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="name">{{ customer.name }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="email">{{ customer.email }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="phone">{{ customer.phone }}</span>
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
      baseURL: "https://ecommerce.hyperzod.dev/api/admin/user",
      customers: [],
      id: "",
      customerName: "",
      email: "",
      phone: "",
    };
  },

  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get(this.baseURL);
        this.customers = response.data;
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  },

  mounted() {
    this.fetchCustomers();
  },
};
</script>


<style scoped>
</style>
