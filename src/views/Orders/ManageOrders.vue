<template>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SYw9Wd62D5uXWd5W5l9vx+R63PTKGXI8JQGNI"
      crossorigin="anonymous"
    />
  </head>
  <div
    class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
  >
    <div
      class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
    >
      <div class="flex justify-between">
        <h1
          class="text-2xl px-4 py-2 text-indigo-900 dark:text-gray-200 font-medium"
        >
          Manage Orders
        </h1>
      </div>
    </div>

    <div
      v-if="orders && orders.length > 0"
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
                Id
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Price
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider hidden md:table-cell"
              >
                Delivery_Address
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
              >
                Payment Status
              </th>
              <th
                class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider hidden md:table-cell"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              v-for="order in orders"
              :key="order.user_id"
            >
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  order.user_id
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <span class="text-sm leading-5 text-blue-900">{{
                  order.total_price
                }}</span>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap text-gray-400 border-b border-gray-300 hidden md:table-cell"
              >
                <span class="address">{{ order.delivery_address }}</span>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-300 text-sm leading-5"
              >
                <span
                  class="relative inline-block px-3 py-1 font-semibold leading-tight"
                  :class="{
                    'text-green-900': order.payment_status == 1,
                    'text-red-900': order.payment_status != 1,
                  }"
                >
                  <span
                    aria-hidden
                    class="absolute inset-0"
                    :class="{
                      'bg-green-200 opacity-50 rounded-full':
                        order.payment_status == 1,
                      'bg-red-200 opacity-50 rounded-full':
                        order.payment_status != 1,
                    }"
                  ></span>
                  <span class="relative text-xs">
                    {{ order.payment_status == 1 ? "Paid" : "Pending" }}
                  </span>
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-300 hidden md:table-cell"
              >
                <button @click="deleteOrder(order.id)">
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
      baseURL: "https://ecommerce.hyperzod.dev/api/admin/orders",
      orders: [],
      user_id: null,
      payment_status: null,
      delivery_address: "",
    };
  },

  methods: {
    async deleteOrder(orderId) {
      try {
        const confirmation = window.confirm(
          "Are you sure you want to delete this order?"
        );

        if (confirmation) {
          const response = await axios.delete(`${this.baseURL}/${orderId}`);
          if (response.status === 204) {
            // Remove the deleted category from the list
            this.orders = this.orders.filter((order) => order.id !== orderId);

            // const token = response.data.token;

            // if (token) {
            //   localStorage.setItem("authToken", token);
            // }
          } else {
            this.showLErrorAlert("Unable to delete order");
          }
        }
      } catch (error) {
        console.error("API Error:", error);
        this.showLErrorAlert("Can't connect to the server");
      }
    },

    async fetchOrders() {
      try {
        const response = await axios.get(this.baseURL);
        this.orders = response.data;
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  },

  mounted() {
    this.fetchOrders();
  },
};
</script>


<style scoped>
</style>
