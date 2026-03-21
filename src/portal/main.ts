import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'
import './style.css'
import App from './App.vue'

/* ── Font Awesome ─────────────────────────────────────────────── */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBook,
  faComments,
  faCircleCheck,
  faUserGraduate,
  faPeopleGroup,
  faHandshake,
  faGift,
  faBars,
  faXmark,
  faGamepad,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import {
  faDiscord,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faBook, faComments, faCircleCheck, faUserGraduate,
  faPeopleGroup, faHandshake, faGift, faBars, faXmark,
  faGamepad, faHeart, faDiscord, faGithub,
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(i18n)
app.mount('#app')
