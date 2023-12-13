import { createStore } from 'vuex'

export default createStore({
    state: {
        adminDetails: null,
    },
    getters: {
        getAdminDetails(state) {
            return state.adminDetails;
        },
    },
    mutations: {
        updateAdminDetails(state, payload) {
            state.adminDetails = payload;
        },
    },
    actions: {
        setAdminDetails(context, payload) {
            context.commit('updateAdminDetails', payload);
        },
    },
    modules: {},
});







// export default createStore({
//     state: {
//         count: 89
//     },
//     getters: {
//         getCount(state) {
//             return state.count;
//         }
//     },
//     mutations: {
//         update(state, payload) {
//             state.count = payload;
//         }
//     },
//     actions: {
//         updateCount(context, payload) {
//             context.commit("update", payload);
//         }
//     },
//     modules: {
//     }
// })
