/**
 * Install Vuetify and create nuxt.config.ts like in link above.
 * Dont need to install @mdi/font. We will use @iconify/vue
 * https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
 * 
 * yarn add -D vuetify vite-plugin-vuetify
 * yarn add @iconify/vue -D
 * 
 */

// Iconify
import { h } from 'vue';
import { Icon } from '@iconify/vue';

// Vuetify
// https://next.vuetifyjs.com/en/
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labsComponents from 'vuetify/labs/components';

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.use(createVuetify({
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
    icons: {
      defaultSet: 'iconify',
      sets: {
        iconify: {
          component: (props) => {
            return h(Icon, { icon: props.icon, size: props.size });
          },
        },
      },
    },
  }));
});