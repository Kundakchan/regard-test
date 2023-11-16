<template>
  <div id="app">
    <h2>Задача: 2</h2>
    <TTable :columns="columns" :resource="resource">
      <template #mane="{ data }"> <!-- Можно также вызвать свойства #name="{ data, record, field }" -->
        <p>{{ data }}</p>
      </template>
      <template #email="{ data }">
        <input type="text" :value="data">
      </template>
      <template #role="{ data }">
        <select :value="data">
          <option v-for="(role) in roles" :key="role.value" :value="role.value">{{ role.label }}</option>
        </select>
      </template>
    </TTable>

    <h2>Задача: 3</h2>
    <pre>{{ getDataMock }}</pre>

  </div>
</template>

<script>
import { booleanToInt, copy } from './utils'
import TTable from '@/components/TTable.vue'

const columns = [
  {
    dataIndex: 'name',
    label: 'Имя'
  },
  {
    dataIndex: 'email',
    label: 'Почта'
  },
  {
    dataIndex: 'role',
    label: 'Роль'
  }
]

const resource = [
  {
    id: '1',
    name: 'Ваня',
    email: 'ivan@yandex.ru',
    role: 'user'
  },
  {
    id: '2',
    name: 'Мария',
    email: 'maria@yandex.ru',
    role: 'user'
  },
  {
    id: '3',
    name: 'Артём',
    email: 'artem@yandex.ru',
    role: 'admin'
  }
]

const roles = [
  { value: 'admin', label: 'Администратор' },
  { value: 'user', label: 'Пользователь' }
]


const dataMock = {
  date1: {
    date1_1: 1,
    date1_2: [
      {
        date2_1: false,
        date2_2: 'str1',
      },
      {
        date2_3: true,
        date2_4: 'str2',
      },
      {
        date2_5: false,
        date2_6: 'str1',
      },
    ],
    date1_3: false,
    date1_4: {
      date3_1: true,
      date3_2: false,
      date3_3: 'str1',
      date3_4: 123,
    },
    date1_5: 'true',
  }
}
const copyDataMock = { b: { c: 3, d: [3, 4] }, a: 12 }

export default {
  name: 'App',
  data () {
    return {
      dataMock,
      copyDataMock,
      columns,
      resource,
      roles
    }
  },
  components: {
    TTable
  },
  computed: {
    getDataMock () {
      return  booleanToInt(this.dataMock)
    }
  },
  mounted () {
    const result = copy(this.copyDataMock, ['a.a', 'b.c', 'b.d.0', 'b.c.e'])
    console.log(result)
    // { b: { c: 3, d: [3] } }
  }
}
</script>

