<template>
  <div
    class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
  >
    <link rel="stylesheet" href="node_modules/sweetalert/dist/sweetalert.css" />
    <div
      class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
    >
      <div class="flex justify-between">
        <h1
          class="text-2xl px-4 py-2 text-indigo-900 dark:text-gray-200 font-medium"
        >
          Manage Customers
        </h1>
      </div>
    </div>

    <div
      v-if="customers && customers.length > 0"
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
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                ID
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider hidden md:table-cell"
              >
                Name
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider hidden md:table-cell"
              >
                Email
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider hidden md:table-cell"
              >
                Phone
              </th>

              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider hidden md:table-cell"
              >
                Role
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
              >
                Action
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              v-for="customer in customers"
              :key="customer.id"
            >
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  customer.id
                }}</span>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-300 hidden md:table-cell"
              >
                <span class="text-sm leading-5 text-blue-900">{{
                  customer.name
                }}</span>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b text-gray-400 border-gray-300 text-sm leading-5 hidden md:table-cell"
              >
                <span class="email">{{ customer.email }}</span>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-300 text-sm leading-5 hidden md:table-cell"
              >
                <span class="phone">{{ customer.phone }}</span>
              </td>

              <td
                class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-300 text-sm leading-5"
              >
                <span
                  class="relative inline-block px-3 py-1 font-semibold leading-tight"
                  :class="{
                    'text-green-900': customer.status === 1,
                    'text-red-900': customer.status !== 1,
                  }"
                >
                  <span
                    aria-hidden
                    class="absolute inset-0"
                    :class="{
                      'bg-green-200 opacity-50 rounded-full':
                        customer.status === 1,
                      'bg-red-200 opacity-50 rounded-full':
                        customer.status !== 1,
                    }"
                  ></span>
                  <span class="relative text-xs">
                    {{ customer.status === 1 ? "Active" : "Deactive" }}
                  </span>
                </span>
              </td>

              <td
                class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-300 text-sm leading-5 hidden md:table-cell"
              >
                <span v-if="customer.role === 0" class="role">User</span>
                <span v-else-if="customer.role === 1" class="role">Admin</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <button @click="deleteCustomer(customer.id)">
                  <i
                    aria-hidden
                    class="fa fa-trash cursor-pointer text-red-500"
                  ></i>
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
      baseURL: "https://ecommerce.hyperzod.dev/api/admin/user",
      customers: [],
      id: "",
      customerName: "",
      email: "",
      phone: "",
      role: "",
      status: "",
    };
  },

  methods: {
    async deleteCustomer(customerId) {
      try {
        const confirmation = window.confirm(
          "Are you sure you want to delete this customer?"
        );

        if (confirmation) {
          const response = await axios.delete(`${this.baseURL}/${customerId}`);
          if (response.status === 204) {
            // Remove the deleted category from the list
            this.customers = this.customers.filter(
              (customer) => customer.id !== customerId
            );

            // const token = response.data.token;

            // if (token) {
            //   localStorage.setItem("authToken", token);
            // }
          } else {
            this.showLErrorAlert("Unable to delete customer");
          }
        }
      } catch (error) {
        console.error("API Error:", error);
        this.showLErrorAlert("Can't connect to the server");
      }
    },

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
