import Home from './Home.vue';
import About from './About.vue';
import Device from './status/Device.vue';
import System from './status/System.vue';

import TR069 from './support/TR069.vue';
import WanStatus from './support/wan/WanStatus.vue';

const routes = [{
    name: 'Home',
    path: '/',
    icon: 'fa-home',
    component: Home
}, {
    name: 'Status',
    path: '/status',
    icon: 'fa-tachometer-alt',
    children: [{
        name: 'System',
        path: '/status/system',
        component: System
    }, {
        name: 'Connection',
        path: '/status/connection'
    }, {
        name: 'Device',
        path: '/status/device',
        component: Device
    }]
}, {
    name: 'Support',
    path: '/support',
    icon: 'fa-cloud',
    children: [{
        name: 'TR069',
        path: '/support/tr069',
        component: TR069
    }, {
        name: 'Wan',
        path: '/support/wan',
        children: [{
            name: 'Wan Status',
            path: '/support/wan/status',
            component: WanStatus
        }]
    }]
}, {
    name: 'About',
    path: '/about',
    icon: 'fa-question-circle',
    component: About
}];

export default routes;