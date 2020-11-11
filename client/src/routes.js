import Vue from 'vue';
import VueRouter from 'vue-router';
import CollectionPage from './pages/CollectionPage'
import WishlistPage from './pages/WishlistPage'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'collection',
            component: CollectionPage,
            props: false,
            meta: {
                title: 'Collection',
            },
        },
        {
            path: '/wishlist',
            name: 'wishlist',
            component: WishlistPage,
            props: false,
            meta: {
                title: 'Wishlist',
            },
        },
    ]
});

export default router;
