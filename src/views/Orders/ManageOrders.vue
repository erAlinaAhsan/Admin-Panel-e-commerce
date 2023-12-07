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
      MANAGE ORDERS
    </h1>

    <div
      v-if="orders && orders.length > 0"
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
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Delivery_Address</th>
            <th scope="col" class="px-6 py-3">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="order in orders"
            :key="order.user_id"
          >
            <td class="px-6 py-4">
              <span class="id">{{ order.user_id }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="price">{{ order.total_price }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="address">{{ order.delivery_address }}</span>
            </td>
            <td class="px-6 py-4">
              <span class="payment">{{ order.payment_status }}</span>
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
      baseURL: "https://ecommerce.hyperzod.dev/api/admin/orders",
      orders: [],
      user_id: null,
      payment_status: null,
      delivery_address: "",
    };
  },

  methods: {
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
