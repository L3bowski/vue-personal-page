import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Projects from '@/components/Projects';
import Trips from '@/components/Trips';
import Blog from '@/components/Blog';
import AgilityRocks from '@/components/blog-entries/agility-rocks';
import LeakedApiKey from '@/components/blog-entries/leaked-api-key';
import MeaningOfLife from '@/components/blog-entries/meaning-of-life';

Vue.use(Router);

const router = new Router({
    base: process.env.baseUrl,
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/blog',
            name: 'Blog',
            component: Blog
        },
        {
            path: '/blog/agility-rocks',
            name: 'Agility rocks',
            component: AgilityRocks
        },
        {
            path: '/blog/leaked-api-key',
            name: 'The leaked API key',
            component: LeakedApiKey
        },
        {
            path: '/blog/meaning-of-life',
            name: 'Meaning of life',
            component: MeaningOfLife
        },
        {
            path: '/trips',
            name: 'Trips',
            component: Trips
        },
        {
            path: '/projects',
            name: 'Projects',
            component: Projects
        },
        // The following route is necessary to resolve the home component at carlescapellas.xyz/vue-personal-page
        {
            path: '/vue-personal-page',
            name: 'Home',
            component: Home
        }
    ]
});

router.afterEach((to, from) => {
    window.scrollTo({ top: 0 });
});

export default router;
