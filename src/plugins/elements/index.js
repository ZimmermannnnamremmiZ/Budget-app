import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale'; // en locale
import 'element-ui/packages/theme-chalk/lib/index.css'; //style
import { // импортирование компонент из element-ui по отдельности
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Alert,
  Dialog
} from 'element-ui'

// объединение компонент в массив
const elements = [
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Alert,
  Dialog
];

// заставляем фреймворк работать на английском
locale.use(lang);

elements.forEach(El => Vue.use(El, { locale }));