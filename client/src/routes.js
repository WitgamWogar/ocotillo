import Vue from 'vue';
import VueRouter from 'vue-router';
import CollectionPage from './pages/CollectionPage';
import WishlistPage from './pages/WishlistPage';
import PlantDetailsPage from './pages/PlantDetailsPage';
import LoginPage from './pages/LoginPage';
import LocationsPage from './pages/LocationsPage';
import PropagationPage from './pages/PropagationPage';

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
    {
      path: '/propagation',
      name: 'propagation',
      component: PropagationPage,
      props: false,
      meta: {
        title: 'Propagation',
      },
    },
    {
      path: '/plants/:plantId',
      name: 'plant.details',
      component: PlantDetailsPage,
      props: false,
      meta: {
        title: 'Plant Details',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      props: false,
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/locations',
      name: 'locations',
      component: LocationsPage,
      props: false,
      meta: {
        title: 'Locations',
      },
    },
  ],
});

export default router;
